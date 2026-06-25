/* ============================================================
   Firebase sync + login gating for Factures Marta
   ------------------------------------------------------------
   - Si Firebase NO està configurat -> mode local (com sempre).
   - Si SÍ -> demana login i sincronitza les dades al núvol.
   Depèn de: firebase-app/auth/firestore-compat (carregats a app.html),
   firebase-config.js, i de window.bootApp / applyCloudData / getAppData
   definits a app.js.
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.FIREBASE_CONFIG || {};
  var configured = cfg.apiKey && cfg.apiKey.indexOf("PEGA_") !== 0;

  var loginScreen = document.getElementById("loginScreen");
  var booted = false;

  function boot() {
    if (booted) return;
    booted = true;
    if (typeof window.bootApp === "function") window.bootApp();
  }

  function hideLogin() {
    if (loginScreen) loginScreen.classList.add("hidden");
  }
  function showLogin() {
    if (loginScreen) loginScreen.classList.remove("hidden");
  }

  /* ---------- MODE LOCAL (Firebase sense configurar) ---------- */
  if (!configured || typeof firebase === "undefined") {
    window.cloudSave = function () {}; // no-op
    var note = document.getElementById("loginLocalNote");
    if (note) note.classList.remove("hidden");
    hideLogin();
    boot();
    return;
  }

  /* ---------- MODE NÚVOL ---------- */
  firebase.initializeApp(cfg);
  var auth = firebase.auth();
  var db = firebase.firestore();

  // Cache offline (perquè funcioni sense connexió)
  db.enablePersistence({ synchronizeTabs: true }).catch(function () {});

  var uid = null;
  var docRef = null;
  var saveTimer = null;
  var lastSynced = null; // últim JSON aplicat/escrit, per evitar bucles

  // Desa al núvol (amb debounce)
  window.cloudSave = function (data) {
    if (!docRef) return;
    var json = JSON.stringify(data || (window.getAppData && window.getAppData()) || {});
    lastSynced = json;
    setSaving(true);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      docRef
        .set({ json: json, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
        .then(function () { setSaving(false); })
        .catch(function () { setSaving(false); });
    }, 700);
  };

  function setSaving(on) {
    var el = document.getElementById("syncDot");
    if (!el) return;
    el.classList.toggle("syncing", !!on);
  }

  // Escolta canvis del núvol en temps real (sync entre PC i mòbil)
  function listen() {
    docRef.onSnapshot(
      function (snap) {
        if (snap.metadata.hasPendingWrites) return; // ignora els nostres propis canvis
        if (!snap.exists) {
          // Primer ús: puja el que hi hagi localment
          if (window.getAppData) window.cloudSave(window.getAppData());
          return;
        }
        var json = (snap.data() || {}).json;
        if (!json || json === lastSynced) return;
        lastSynced = json;
        try {
          var data = JSON.parse(json);
          if (window.applyCloudData) window.applyCloudData(data);
        } catch (e) {}
      },
      function () {}
    );
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
      docRef = db.collection("users").doc(uid);
      hideLogin();
      boot(); // arrenca l'app (mostra dades locals al moment)
      // carrega del núvol i després escolta canvis
      docRef
        .get()
        .then(function (snap) {
          if (snap.exists) {
            var json = (snap.data() || {}).json;
            if (json) {
              lastSynced = json;
              try {
                var data = JSON.parse(json);
                if (window.applyCloudData) window.applyCloudData(data);
              } catch (e) {}
            }
          } else if (window.getAppData) {
            window.cloudSave(window.getAppData()); // crea el document amb les dades actuals
          }
          listen();
        })
        .catch(function () { listen(); });
      var em = document.getElementById("sessionEmail");
      if (em) em.textContent = user.email || "";
    } else {
      uid = null;
      docRef = null;
      showLogin();
    }
  });

  // ---------- Handlers del formulari de login ----------
  window.doLogin = function () {
    var email = (document.getElementById("loginEmail") || {}).value || "";
    var pass = (document.getElementById("loginPass") || {}).value || "";
    var err = document.getElementById("loginError");
    var btn = document.getElementById("loginBtn");
    if (err) err.textContent = "";
    if (!email || !pass) {
      if (err) err.textContent = "Introdueix el correu i la contrasenya.";
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "Entrant…"; }
    auth
      .signInWithEmailAndPassword(email.trim(), pass)
      .catch(function (e) {
        var msg = "No s'ha pogut iniciar la sessió.";
        if (e && e.code === "auth/invalid-email") msg = "El correu no és vàlid.";
        else if (e && (e.code === "auth/wrong-password" || e.code === "auth/invalid-credential")) msg = "Contrasenya incorrecta.";
        else if (e && e.code === "auth/user-not-found") msg = "Aquest usuari no existeix.";
        else if (e && e.code === "auth/too-many-requests") msg = "Massa intents. Torna-ho a provar més tard.";
        if (err) err.textContent = msg;
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = "Entrar"; }
      });
  };

  window.doLogout = function () {
    if (typeof closeBackupModal === "function") closeBackupModal();
    auth.signOut();
  };

  // Enter al camp de contrasenya = entrar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && loginScreen && !loginScreen.classList.contains("hidden")) {
      window.doLogin();
    }
  });
})();
