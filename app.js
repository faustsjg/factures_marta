let currentView="table";

let lastClassView="table";

let currentDate=new Date();

let classes=[];

let issuers=[];

let courses=[];

let clients=[];

let invoices=[];

let expenses=[];

let selectedClasses=[];

let searchTerm="";

let openModuleCourses=new Set();

let dirty=false;

const STORAGE_KEY="facturesMartaData";

const DEFAULT_ISSUER={
id:1,
isDefault:true,
name:"",
nif:"",
address:"",
postalCode:"",
city:"",
phone:"",
email:"",
iban:"",
swift:"",
paymentMethod:"Transferència bancària"
};

const ICONS={
edit:'<svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3.7a2.05 2.05 0 0 1 2.9 2.9L7.5 17.5l-4 1.1 1.1-4Z"></path></svg>',
trash:'<svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 5.5h15"></path><path d="M8.5 5.5V4.2a1.7 1.7 0 0 1 1.7-1.7h1.6a1.7 1.7 0 0 1 1.7 1.7v1.3"></path><path d="M5.5 5.5l.9 12.9a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.9-12.9"></path></svg>',
star:'<svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 3.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L11 15.5l-4.8 2.6.9-5.4L3.2 8.9l5.4-.8Z"></path></svg>',
starFill:'<svg width="18" height="18" viewBox="0 0 22 22" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 3.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L11 15.5l-4.8 2.6.9-5.4L3.2 8.9l5.4-.8Z"></path></svg>',
plus:'<svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M11 4v14"></path><path d="M4 11h14"></path></svg>',
close:'<svg width="14" height="14" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5.5 5.5l11 11"></path><path d="M16.5 5.5l-11 11"></path></svg>'
};

const MONTH_NAMES=[
"Gener","Febrer","Març","Abril","Maig","Juny",
"Juliol","Agost","Setembre","Octubre","Novembre","Desembre"
];

/* ===== Persistence ===== */

function saveLocal(){
try{
localStorage.setItem(STORAGE_KEY,JSON.stringify({classes,courses,clients,issuers,invoices,expenses}));
}catch(e){}
if(typeof window.cloudSave==="function" && !window.__suspendCloudSave){
window.cloudSave({classes,courses,clients,issuers,invoices,expenses});
}
}

/* Aplica dades vingudes del núvol sense reescriure-les (evita bucles) */
window.applyCloudData=function(data){
if(!data)return;
window.__suspendCloudSave=true;
classes=data.classes||[];
courses=data.courses||[];
clients=data.clients||[];
issuers=data.issuers||[];
invoices=data.invoices||[];
expenses=data.expenses||[];
normalizeData();
if(typeof renderAll==="function"){renderAll();}
if(typeof renderIssuers==="function"){renderIssuers();}
window.__suspendCloudSave=false;
dirty=false;
};

window.getAppData=function(){
return {classes,courses,clients,issuers,invoices,expenses};
};

function loadLocal(){
try{
const raw=localStorage.getItem(STORAGE_KEY);
if(!raw)return false;
const data=JSON.parse(raw);
classes=data.classes||[];
courses=data.courses||[];
clients=data.clients||[];
issuers=data.issuers||[];
invoices=data.invoices||[];
expenses=data.expenses||[];
return true;
}catch(e){
return false;
}
}

function normalizeData(){
courses.forEach(c=>{
if(!Array.isArray(c.modules))c.modules=[];
});
classes.forEach(c=>{
if(typeof c.module!=="string")c.module="";
});
if(!Array.isArray(invoices))invoices=[];
if(!Array.isArray(expenses))expenses=[];
if(!issuers.length){
issuers=[Object.assign({},DEFAULT_ISSUER)];
}
if(!issuers.some(i=>i.isDefault)){
issuers[0].isDefault=true;
}
}

function saveData(){

const data={
 classes,
 courses,
 clients,
 issuers,
 invoices,
 expenses
};

const blob=new Blob(
[JSON.stringify(data,null,2)],
{type:"text/plain"}
);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="app.txt";

a.click();

dirty=false;

}

function exportTXT(){
saveData();
closeBackupModal();
}

function importTXT(event){

const file=event.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(e){

const data=JSON.parse(e.target.result);

classes=data.classes || [];
courses=data.courses || [];
clients=data.clients || [];
issuers=data.issuers || [];
invoices=data.invoices || [];
expenses=data.expenses || [];

normalizeData();

renderAll();

dirty=false;

closeBackupModal();

};

reader.readAsText(file);

event.target.value="";

}

/* ===== View / navigation ===== */

let animateClassRows=true;
let animateLedgerRows=false;

/* Snackbar de confirmació (desar, etc.) */
let _snackTimer=null;
function showSnack(msg){
const bar=document.getElementById("snackbar");
if(!bar)return;
const txt=document.getElementById("snackText");
if(txt)txt.textContent=msg;
bar.classList.add("show");
clearTimeout(_snackTimer);
_snackTimer=setTimeout(()=>bar.classList.remove("show"),2200);
}

function positionNavPill(){
const nav=document.getElementById("bottomNav");
const pill=document.getElementById("navPill");
if(!nav||!pill)return;
const active=nav.querySelector(".nav-item.active");
if(!active)return;
const move=()=>{
const navRect=nav.getBoundingClientRect();
const r=active.getBoundingClientRect();
if(!pill.dataset.ready){
pill.style.transition="none";
}
pill.style.width=r.width+"px";
pill.style.transform="translateX("+(r.left-navRect.left)+"px)";
pill.style.opacity="1";
if(!pill.dataset.ready){
// force reflow then restore transition so subsequent moves animate
void pill.offsetWidth;
pill.style.transition="";
pill.dataset.ready="1";
}
};
// wait for layout (label reflow) to settle before measuring
requestAnimationFrame(()=>requestAnimationFrame(move));
}

// Config tabs (Cursos / Clients / Emissors): an inline segmented control
// that lives in the active page's card header, left of the add button.
function positionSubnavPill(){
const sub=document.getElementById("configSubnav");
const pill=document.getElementById("subnavPill");
if(!sub||!pill)return;
const active=sub.querySelector("button.active");
if(!active)return;
// Position synchronously (offsets are valid once the tabs are visible);
// suppress the transition the first time so it doesn't slide in from 0.
if(!pill.dataset.ready)pill.style.transition="none";
pill.style.width=active.offsetWidth+"px";
pill.style.transform="translateX("+active.offsetLeft+"px)";
pill.style.opacity="1";
if(!pill.dataset.ready){
void pill.offsetWidth;
pill.style.transition="";
pill.dataset.ready="1";
}
}

function updateSecondNav(){
const configSub=document.getElementById("configSubnav");
const configViews=["courses","clients","issuers"];
if(!configSub)return;
if(!configViews.includes(currentView)){
configSub.classList.add("hidden");
return;
}
configViews.forEach(v=>{
const b=document.getElementById("subnav-"+v);
if(b)b.classList.toggle("active",v===currentView);
});
// Relocate the tabs into the currently visible page header.
const head=document.querySelector("#"+currentView+"Page .config-head-row");
if(head&&configSub.parentElement!==head){
head.insertBefore(configSub,head.firstChild);
}
configSub.classList.remove("hidden");
positionSubnavPill();
// Subtle fade-up of the freshly shown list content (header stays put).
const list=document.getElementById(currentView+"List")||document.getElementById(currentView+"Page");
if(list&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
list.style.animation="none";
void list.offsetWidth;
list.style.animation="cfgPageIn .26s cubic-bezier(.16,.84,.44,1) both";
}
}
window.addEventListener("resize",()=>{positionNavPill();positionSubnavPill();positionClassesPill();positionLedgerPill();});

function setView(view){

const prevView=currentView;
currentView=view;

document.body.dataset.view=view;

const configViews=["courses","clients","issuers"];
const isConfig=configViews.includes(view);

const navClasses=document.getElementById("nav-classes");
if(navClasses)navClasses.classList.toggle("active",view==="table"||view==="calendar");
const navLedger=document.getElementById("nav-ledger");
if(navLedger)navLedger.classList.toggle("active",view==="ledger");
document.getElementById("nav-settings").classList.toggle("active",isConfig);
positionNavPill();

const dataCard=document.getElementById("dataCard");
const configView=document.getElementById("configView");
const ledgerView=document.getElementById("ledgerView");
const tableControls=document.getElementById("tableControls");
const calendarControls=document.getElementById("calendarControls");
const tableView=document.getElementById("tableView");
const calendarView=document.getElementById("calendarView");

if(view==="ledger"){
dataCard.classList.add("hidden");
configView.classList.add("hidden");
if(ledgerView)ledgerView.classList.remove("hidden");
updateSecondNav();
animateLedgerRows=true;
renderLedger();
positionLedgerPill();
return;
}
if(ledgerView)ledgerView.classList.add("hidden");

if(isConfig){
dataCard.classList.add("hidden");
configView.classList.remove("hidden");
configViews.forEach(v=>{
const page=document.getElementById(v+"Page");
if(page)page.classList.toggle("hidden",v!==view);
});
if(view==="courses")renderCourses();
if(view==="clients")renderClients();
if(view==="issuers"){clearIssuerForm();renderIssuers();}
updateSecondNav();
return;
}

dataCard.classList.remove("hidden");
configView.classList.add("hidden");
updateSecondNav();
updateClassesSubnav(view);

if(view==="table"){
tableView.classList.remove("hidden");
calendarView.classList.add("hidden");
tableControls.classList.remove("hidden");
tableControls.style.display="flex";
calendarControls.classList.add("hidden");
document.getElementById("dataCard").classList.remove("cal-mode");
document.getElementById("invoiceBtn").classList.remove("hidden");
animateClassRows=true;
renderClasses();
}else{
tableView.classList.add("hidden");
calendarView.classList.remove("hidden");
tableControls.classList.remove("hidden");
tableControls.style.display="flex";
calendarControls.classList.remove("hidden");
document.getElementById("dataCard").classList.add("cal-mode");
document.getElementById("invoiceBtn").classList.add("hidden");
renderCalendar();
}

}

// Segmented Taula/Calendari control inside the card header
function updateClassesSubnav(view){
const sub=document.getElementById("classesSubnav");
if(!sub)return;
const isClasses=(view==="table"||view==="calendar");
if(isClasses)lastClassView=view;
sub.classList.toggle("hidden",!isClasses);
if(!isClasses)return;
const t=document.getElementById("csub-table");
const c=document.getElementById("csub-calendar");
if(t)t.classList.toggle("active",view==="table");
if(c)c.classList.toggle("active",view==="calendar");
positionClassesPill();
requestAnimationFrame(positionClassesPill);
}

function positionClassesPill(){
const sub=document.getElementById("classesSubnav");
const pill=document.getElementById("classesSubnavPill");
if(!sub||!pill)return;
const active=sub.querySelector("button.active");
if(!active)return;
if(!pill.dataset.ready)pill.style.transition="none";
pill.style.width=active.offsetWidth+"px";
pill.style.transform="translateX("+active.offsetLeft+"px)";
pill.style.opacity="1";
if(!pill.dataset.ready){
void pill.offsetWidth;
pill.style.transition="";
pill.dataset.ready="1";
}
}

function setClassView(view){
if(currentView===view)return;
closeAllPopups();
setView(view);
}

function positionLedgerPill(){
const sub=document.getElementById("ledgerTabs");
const pill=document.getElementById("ledgerTabsPill");
if(!sub||!pill)return;
const active=sub.querySelector("button.active");
if(!active)return;
if(!pill.dataset.ready)pill.style.transition="none";
pill.style.width=active.offsetWidth+"px";
pill.style.transform="translateX("+active.offsetLeft+"px)";
pill.style.opacity="1";
if(!pill.dataset.ready){
void pill.offsetWidth;
pill.style.transition="";
pill.dataset.ready="1";
}
}

function navClick(view){
if(view==="settings"){
if(["courses","clients","issuers"].includes(currentView)){
// Already in config — the second nav bar is already shown.
return;
}
closeAllPopups();
setView("courses");
return;
}
if(view==="classes"){
if(currentView==="table"||currentView==="calendar")return;
closeAllPopups();
setView(lastClassView||"table");
return;
}
if(currentView===view){
return;
}
closeAllPopups();
setView(view);
}

function goConfig(view){
closeAllPopups();
setView(view);
}

function closeAllPopups(){
document.querySelectorAll(".nav-popup.open").forEach(p=>p.classList.remove("open"));
}

document.addEventListener("click",function(e){
if(!e.target.closest(".nav-cell")){
closeAllPopups();
}
});

/* ===== Modal animation (fade + grow from the trigger button) ===== */
let lastTrigger=null;
document.addEventListener("click",function(e){
const t=e.target.closest("button, .day, .backup-cta, .month-cell, .setting-link, .course-card, [onclick]");
lastTrigger=t||e.target;
},true);

function openModalEl(id){
const m=document.getElementById(id);
if(!m)return;
const content=m.querySelector(".modal-content");
m.classList.remove("open");
m.style.display="flex";
// origin: grow out of the button that was just pressed
if(content){
let ox="50%",oy="50%";
if(lastTrigger && document.contains(lastTrigger)){
const cr=content.getBoundingClientRect();
const tr=lastTrigger.getBoundingClientRect();
ox=Math.max(0,Math.min(cr.width,(tr.left+tr.width/2)-cr.left))+"px";
oy=Math.max(0,Math.min(cr.height,(tr.top+tr.height/2)-cr.top))+"px";
}
content.style.transformOrigin=ox+" "+oy;
}
// force reflow so the transition runs from the hidden base state
void m.offsetWidth;
m.classList.add("open");
}

function closeModalEl(id){
const m=document.getElementById(id);
if(!m || m.style.display==="none")return;
const content=m.querySelector(".modal-content");
m.classList.remove("open");
let done=false;
const finish=()=>{
if(done)return;
done=true;
m.style.display="none";
};
if(content){
const onEnd=e=>{
if(e.target===content && e.propertyName==="transform"){
content.removeEventListener("transitionend",onEnd);
finish();
}
};
content.addEventListener("transitionend",onEnd);
}
// fallback in case transitionend doesn't fire
setTimeout(finish,260);
}

/* ===== Backup modal ===== */

function openBackupModal(){
openModalEl("backupModal");
}

function closeBackupModal(){
closeModalEl("backupModal");
}

/* ===== Importar dades des de correu ===== */

const IMPORT_COLORS=["#2563eb","#db2777","#16a34a","#d97706","#7c3aed","#0891b2","#dc2626","#65a30d","#9333ea","#0d9488"];

let importParsed=null;

function openImportModal(){
closeAllPopups();
importParsed=null;
const ta=document.getElementById("importText");
if(ta)ta.value="";
const pv=document.getElementById("importPreview");
if(pv){pv.classList.add("hidden");pv.innerHTML="";}
setImportStep("analyze");
openModalEl("importModal");
}

// Alterna entre el botó "Analitzar" i "Importar"
function setImportStep(step){
const ab=document.getElementById("importAnalyzeBtn");
const cb=document.getElementById("importConfirmBtn");
const bb=document.getElementById("importBackBtn");
const ia=document.getElementById("importInputArea");
if(step==="import"){
if(ab)ab.classList.add("hidden");
if(cb)cb.classList.remove("hidden");
if(bb)bb.classList.remove("hidden");
if(ia)ia.classList.add("hidden");
}else{
if(ab)ab.classList.remove("hidden");
if(cb){cb.classList.add("hidden");cb.textContent="Importar";}
if(bb)bb.classList.add("hidden");
if(ia)ia.classList.remove("hidden");
}
}

// Quan es modifica el text cal tornar a analitzar abans d'importar
function resetImportAnalysis(){
importParsed=null;
const pv=document.getElementById("importPreview");
if(pv){pv.classList.add("hidden");pv.innerHTML="";}
setImportStep("analyze");
}

// Una classe és duplicada si coincideix data + mòdul (el mòdul, amb el seu codi
// MF, identifica la classe de forma fiable encara que el curs s'hagi anomenat
// diferent en una importació anterior). Sense mòdul, cal coincidir per curs+horari.
function classExists(date,course,module,start,end){
const mod=(module||"").trim().toLowerCase();
return classes.some(c=>{
if(c.date!==date)return false;
if(mod)return (c.module||"").trim().toLowerCase()===mod;
return (c.course||"").trim().toLowerCase()===(course||"").trim().toLowerCase() &&
 (c.start||"")===(start||"") && (c.end||"")===(end||"");
});
}

function closeImportModal(){
closeModalEl("importModal");
}

function parseImportDates(raw){
// "20-21-27/04/2026", "25-26/03, 22-23-27/04/2026", "20-21-27/04/2026 i 04-13-15/05/2026",
// "10, 12/06/2026" (bare day groups inherit month/year from a neighboring group)
const out=[];
const normalized=raw.replace(/\s+i\s+/gi,",");
const groups=normalized.split(",").map(s=>s.trim()).filter(Boolean);

// pass 1 (right to left): resolve month/year for every group, letting bare-day
// groups (no "/") borrow from the nearest group to their right
const resolved=new Array(groups.length);
let lastMonth=null,lastYear=String(new Date().getFullYear());
for(let i=groups.length-1;i>=0;i--){
const g=groups[i];
if(g.includes("/")){
const parts=g.split("/").map(s=>s.trim());
const month=(parts[1]||lastMonth||"").padStart(2,"0");
const year=(parts[2]||lastYear||String(new Date().getFullYear())).trim();
resolved[i]={dayPart:parts[0],month,year};
lastMonth=month;lastYear=year;
}else{
resolved[i]={dayPart:g,month:lastMonth,year:lastYear};
}
}

// pass 2 (left to right): emit dates in original order
groups.forEach((g,i)=>{
const r=resolved[i];
if(!r||!r.month)return;
r.dayPart.split("-").forEach(d=>{
d=d.trim();
if(!d)return;
out.push(`${r.year}-${r.month}-${d.padStart(2,"0")}`);
});
});
return out;
}

// Codi curt d'un mòdul ("MF0034_2" o "MF0307 2"), sense la descripció llarga.
function moduleCode(name){
const m=(name||"").match(/^(MF\d+(?:[_ ]\d+)?)/i);
return m?m[1]:(name||"");
}

function cleanCourseName(raw){
// strip leading "Impartició"
let t=raw.replace(/^Impartici[óo]\s*/i,"").trim();
// cut at first code token (INAF / FP / token containing a digit or slash)
const tokens=t.split(/\s+/);
const keep=[];
for(const tok of tokens){
if(/^(INAF|FP)\b/i.test(tok)||/\d/.test(tok)||tok.includes("/")){
break;
}
keep.push(tok);
}
const name=keep.join(" ").trim();
return name||t;
}

function fmtTime(h){
const hh=Math.floor(h);
const mm=Math.round((h-hh)*60);
return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}`;
}

// Molts correus també inclouen una taula dia-a-dia (dia de la setmana opcional,
// data sola en una línia, hores en una línia, nom del curs/lloc, [nom professora],
// [Facturat]) — típic quan el format de taula de Gmail es converteix en línies
// planes en enganxar-lo. La detectem a banda dels blocs "Impartició".
function parseTableClasses(nonBlankLines){
const byPlace={};
let i=0;
while(i<nonBlankLines.length){
const dm=nonBlankLines[i].match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
if(dm){
const hoursLine=nonBlankLines[i+1];
const hm=hoursLine&&hoursLine.match(/^\d+([.,]\d+)?$/);
const place=nonBlankLines[i+2];
if(hm&&place&&!/^total$/i.test(place)){
const date=`${dm[3]}-${dm[2].padStart(2,"0")}-${dm[1].padStart(2,"0")}`;
const hours=parseFloat(hoursLine.replace(",","."));
const name=place.trim();
// Consume the trailing lines of this row (teacher name, "Facturat"…) up to
// the next date/total. If any says facturat/facturada, the class is JA
// facturada i NO s'ha d'importar.
let j=i+3, billed=false;
while(nonBlankLines[j]&&!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(nonBlankLines[j])&&!/^total$/i.test(nonBlankLines[j])){
if(/^facturad[ao]$|^facturat$/i.test(nonBlankLines[j].trim()))billed=true;
j++;
}
if(!billed)(byPlace[name]=byPlace[name]||[]).push({date,hours});
i=j;
continue;
}
}
i++;
}
// Keep raw {date,hours} records; module grouping happens after we know each
// date's module (from the description blocks below the table).
return Object.entries(byPlace).map(([name,records])=>({name,price:null,records,_fromTable:true}));
}

function analyzeImport(){
const text=(document.getElementById("importText").value||"").trim();
if(!text){
alert("Enganxa el text del correu primer.");
return;
}

const lines=text.split(/\r?\n/).map(l=>l.trim());

const parsedCourses=[];
let cur=null;
let curMod=null;
let lastHeader=null;
const headerLike=l=>/^[A-Z0-9À-ÜÑÇ][A-Z0-9À-ÜÑÇ\s\/]{5,}$/.test(l);

const pushMod=()=>{
if(cur&&curMod&&curMod.dates.length){
cur.modules.push(curMod);
}
curMod=null;
};

for(const line of lines){
if(!line)continue;

// New course ("Impartició <nom>" or a lone "Impartició" whose name sits
// on a preceding header-like line, as sometimes happens in pasted emails)
const imp=line.match(/^Impartici[óo]\s*(.*)$/i);
if(imp){
pushMod();
const nameSource=(imp[1]&&imp[1].trim())?imp[1]:(lastHeader||"");
cur={name:cleanCourseName(nameSource)||"Curs importat",price:null,modules:[]};
parsedCourses.push(cur);
lastHeader=null;
continue;
}

// Price
const price=line.match(/Preu\s*hora\s*:\s*([\d.,]+)/i);
if(price){
if(cur)cur.price=parseFloat(price[1].replace(",","."));
continue;
}

// Module start: MFxxxx ...
const mf=line.match(/^(MF\d[\w_]*\s*\d*)\s*[:\-]?\s*(.+)?$/i);
if(mf&&/^MF\d/i.test(line)){
pushMod();
curMod={name:line.replace(/\s+/g," ").trim(),dates:[],hours:null,start:null,end:null};
continue;
}

// Dates (accepts "Dates impartició:", "Dates d'impartició:", "Dates impartides:", ...)
const dates=line.match(/Dates?\s*(?:d['’]\s*)?imparti\S*\s*:\s*(.+)$/i);
if(dates&&curMod){
curMod.dates=parseImportDates(dates[1]);
continue;
}

if(headerLike(line))lastHeader=line;
if(!cur)continue;

// Horari
const hor=line.match(/Horari\s*:\s*.*?(\d{1,2})[:.h](\d{2})?h?\s*a\s*(\d{1,2})[:.h](\d{2})?/i);
if(hor&&curMod){
curMod.start=`${hor[1].padStart(2,"0")}:${(hor[2]||"00")}`;
curMod.end=`${hor[3].padStart(2,"0")}:${(hor[4]||"00")}`;
continue;
}

// Module hours
const mh=line.match(/Hores?\s*impartides\s*:\s*([\d.,]+)/i);
if(mh&&curMod){
curMod.hours=parseFloat(mh[1].replace(",","."));
continue;
}
}
pushMod();

const tableCourses=parseTableClasses(lines.filter(l=>l));

// La TAULA sempre mana: són exactament els dies i classes a importar, ni un de
// més ni un de menys. Els blocs "Impartició" de sota NO afegeixen classes —
// només descriuen a quin mòdul pertany cada classe de la taula. Construïm un
// mapa data→mòdul a partir de les descripcions i l'apliquem a la taula.
if(tableCourses.length){
const dateToModule={};
parsedCourses.forEach(c=>{
c.modules.forEach(m=>{
if(!m.name)return;
m.dates.forEach(d=>{if(!dateToModule[d])dateToModule[d]=m.name;});
});
});
const built=tableCourses.map(tc=>{
const groups={};
tc.records.forEach(r=>{
const modName=dateToModule[r.date]||"";
const key=modName+"|"+r.hours;
(groups[key]=groups[key]||{name:modName,hours:r.hours,dates:[]}).dates.push(r.date);
});
const modules=Object.values(groups).map(g=>({
name:g.name,dates:g.dates,hours:null,start:"08:00",end:fmtTime(8+g.hours)
}));
return {name:tc.name,price:null,modules,_fromTable:true};
});
parsedCourses.length=0;
built.forEach(c=>parsedCourses.push(c));
}
// Si el correu NO porta cap taula, es mantenen els blocs "Impartició" com abans
// (l'única font de classes en aquest cas).
for(let i=parsedCourses.length-1;i>=0;i--){
if(!parsedCourses[i].modules.length)parsedCourses.splice(i,1);
}

// Build class plan
let totalClasses=0;
parsedCourses.forEach(c=>{
c.classCount=0;
c.modules.forEach(m=>{
const n=m.dates.length||1;
let start=m.start, end=m.end;
if(!start||!end){
const perDay=(m.hours&&n)?m.hours/n:6;
start="08:00";
end=fmtTime(8+perDay);
}
m.start=start;
m.end=end;
c.classCount+=m.dates.length;
totalClasses+=m.dates.length;
});
});

importParsed=parsedCourses;

// Render preview
const pv=document.getElementById("importPreview");
if(!parsedCourses.length){
pv.innerHTML=`<div class="import-empty">No s'ha detectat cap curs. Revisa el format del text.</div>`;
pv.classList.remove("hidden");
setImportStep("analyze");
return;
}

pv.innerHTML=parsedCourses.map(c=>`
<div class="import-course">
<div class="import-course-head">
<span class="import-course-name">${c.name||"(sense nom)"}</span>
<span class="import-course-price">${c.price!=null?c.price+" €/h":"preu?"}</span>
</div>
${c.modules.map(m=>`
<div class="import-mod">
<div class="import-mod-name">${m.name}</div>
<div class="import-mod-meta">${m.dates.length} ${m.dates.length===1?"classe":"classes"} · ${m.start}–${m.end}${m.hours!=null?` · ${m.hours}h`:""}</div>
</div>
`).join("")}
</div>
`).join("");
pv.classList.remove("hidden");

if(totalClasses===0){
setImportStep("analyze");
return;
}
setImportStep("import");
const btn=document.getElementById("importConfirmBtn");
btn.textContent=`Importar (${totalClasses} ${totalClasses===1?"classe":"classes"})`;
}

function confirmImport(){
if(!importParsed||!importParsed.length)return;

let colorIdx=courses.length;
let added=0, skipped=0;

importParsed.forEach(pc=>{
// find or create course
let course=courses.find(c=>c.name.toLowerCase()===(pc.name||"").toLowerCase());
if(!course){
course={
id:Date.now()+Math.floor(Math.random()*100000),
name:pc.name||"Curs importat",
price:pc.price!=null?pc.price:0,
color:IMPORT_COLORS[colorIdx%IMPORT_COLORS.length],
modules:[]
};
courses.push(course);
colorIdx++;
}else if(pc.price!=null){
course.price=pc.price;
}

pc.modules.forEach(m=>{
if(m.name&&!course.modules.includes(m.name)){
course.modules.push(m.name);
}
m.dates.forEach(date=>{
if(classExists(date,course.name,m.name||"",m.start,m.end)){skipped++;return;}
classes.push({
id:Date.now()+Math.floor(Math.random()*1000000),
date,
course:course.name,
module:m.name||"",
price:course.price,
hours:computeHours(m.start,m.end),
color:course.color,
start:m.start,
end:m.end
});
added++;
});
});
});

importParsed=null;
setImportStep("analyze");
closeImportModal();
renderAll();
renderCourses();
renderIssuers();

let msg;
if(added===0){
msg = skipped>0 ? `Cap classe nova: ${skipped} ja ${skipped===1?"existia":"existien"}.` : "No s'ha afegit cap classe.";
}else{
msg = `${added} ${added===1?"classe importada":"classes importades"}.`;
if(skipped>0) msg += ` ${skipped} ja ${skipped===1?"existia":"existien"} i s'${skipped===1?"ha omès":"han omès"}.`;
}
alert(msg);
}

/* ===== Classes ===== */

function renderAll(){

dirty=true;

renderCoursesSelect();
renderClasses();
renderCalendar();
renderCourses();
renderClients();
updateTotal();

saveLocal();

}

function renderCoursesSelect(){

const select=document.getElementById("modalClassCourse");

if(select){

const prev=select.value;

select.innerHTML="<option value=''>Selecciona curs</option>";

courses.forEach(course=>{

select.innerHTML+=`
<option value="${course.id}">
${course.name} (${course.price} €/h)
</option>
`;

});

if(prev)select.value=prev;

}

const invoice=document.getElementById("invoiceClient");

invoice.innerHTML="";

clients.forEach((client,index)=>{

invoice.innerHTML+=`
<option value="${index}">
${client.name}
</option>
`;

});

const issuerSelect =
document.getElementById("invoiceIssuer");

if(issuerSelect){

issuerSelect.innerHTML="";

issuers.forEach((issuer)=>{

issuerSelect.innerHTML += `
<option value="${issuer.id}">
${issuer.name}${issuer.isDefault?" (per defecte)":""}
</option>
`;

});

const def=issuers.find(i=>i.isDefault);
if(def)issuerSelect.value=def.id;

}

}

/* Display dates consistently as DD/MM/YYYY from an ISO YYYY-MM-DD string */
function fmtDate(iso){
const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(iso||"");
if(!m)return iso||"";
return `${m[3]}/${m[2]}/${m[1]}`;
}

function renderClasses(){

const tbody=document.getElementById("classesTable");

tbody.innerHTML="";

const list=classes.filter(classMatches);

if(list.length===0){
tbody.innerHTML=`<tr><td colspan="7" class="table-empty">${filtersActive()?"Cap classe coincideix amb la cerca o el filtre":"Encara no hi ha classes"}</td></tr>`;
animateClassRows=false;
syncSelectAll();
return;
}

list.forEach((item,i)=>{

const total=(item.hours*item.price).toFixed(2);

const animClass=animateClassRows?" row-in":"";
const animStyle=animateClassRows?` style="animation-delay:${Math.min(i,14)*22}ms"`:"";
const selClass=selectedClasses.includes(item.id)?" selected":"";

tbody.innerHTML+=`

<tr class="${animClass}${selClass}" data-class-id="${item.id}"${animStyle}>

<td>
<input
type="checkbox"
${selectedClasses.includes(item.id)?"checked":""}
onchange="toggleClass(${item.id})"
>
</td>

<td class="date-cell">${fmtDate(item.date)}</td>

<td>
<div class="course-cell">
<div
class="course-tag"
style="background:${item.color};"
>
${item.course}
</div>
${item.module?`<div class="module-tag">${item.module}</div>`:""}
</div>
</td>

<td>${item.hours} h</td>

<td>${item.price} €/h</td>

<td><span class="amount">${total} €</span></td>

<td>

<div class="row-actions">

<button
class="btn gray icon"
onclick="editClass(${item.id})"
>
${ICONS.edit}
</button>

<button
class="btn red icon"
onclick="deleteClass(${item.id})"
>
${ICONS.trash}
</button>

</div>

</td>

</tr>

`;

});

animateClassRows=false;
syncSelectAll();

}

/* ===== Calendar ===== */

function renderCalendar(){

const grid=document.getElementById("calendarGrid");

if(!grid)return;

grid.innerHTML="";

const year=currentDate.getFullYear();
const month=currentDate.getMonth();

document.getElementById("calendarTitle").innerHTML=
MONTH_NAMES[month]+' <span class="cal-yr-full">'+year+'</span><span class="cal-yr-short">\''+String(year).slice(-2)+'</span>';

const weekdays=["Dl","Dt","Dc","Dj","Dv","Ds","Dg"];

weekdays.forEach(w=>{
const h=document.createElement("div");
h.className="cal-head";
h.innerText=w;
grid.appendChild(h);
});

const now=new Date();
const todayStr=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

const firstDay=new Date(year,month,1).getDay();

const daysInMonth=
new Date(year,month+1,0).getDate();

for(let i=0;i<42;i++){

const dayNum=i-(firstDay===0?6:firstDay-1)+1;

const cell=document.createElement("div");

cell.className="day";

if(dayNum>0 && dayNum<=daysInMonth){

const date=
`${year}-${String(month+1).padStart(2,"0")}-${String(dayNum).padStart(2,"0")}`;

if(date===todayStr)cell.classList.add("today");

cell.title="Veure el dia";
cell.addEventListener("click",()=>openDayModal(date));

cell.innerHTML=`
<div class="num">
${dayNum}
</div>
`;

const dayClasses=classes.filter(c=>c.date===date);
let dayHasMatch=false;

dayClasses.forEach(item=>{

const matched=classMatches(item);
if(matched)dayHasMatch=true;

cell.innerHTML+=`
<div
class="course-item${(searchTerm&&!matched)?" ci-dim":""}"
style="background:${item.color};"
>
${item.course}${item.module?`<br><span class="ci-mod">${moduleCode(item.module)} · ${item.hours}h</span>`:`<br>${item.hours}h`}
</div>
`;

});

if(filtersActive()){
cell.classList.add(dayHasMatch?"day-match":"day-dim");
}

}else{

cell.classList.add("empty");

}

grid.appendChild(cell);

}

initCalendarSwipe();
maybeShowSwipeHint();

}

function prevMonth(){
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
}

function nextMonth(){
currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();
}

function goToday(){
currentDate=new Date();
renderCalendar();
closeModalEl("monthPickerModal");
}

/* ===== Month / year picker ===== */

let pickerYear=new Date().getFullYear();

function openMonthPicker(){
pickerYear=currentDate.getFullYear();
renderMonthPicker();
openModalEl("monthPickerModal");
}

function closeMonthPicker(){
closeModalEl("monthPickerModal");
}

function pickerYearStep(delta){
pickerYear+=delta;
renderMonthPicker();
}

function renderMonthPicker(){
document.getElementById("pickerYearValue").innerText=pickerYear;
const grid=document.getElementById("monthGrid");
const curM=currentDate.getMonth();
const curY=currentDate.getFullYear();
const today=new Date();
grid.innerHTML=MONTH_NAMES.map((name,i)=>{
const isSel=(i===curM && pickerYear===curY);
const isToday=(i===today.getMonth() && pickerYear===today.getFullYear());
return `<button class="month-cell${isSel?" sel":""}${isToday&&!isSel?" today":""}" onclick="selectMonth(${i})">${name.slice(0,3)}</button>`;
}).join("");
}

function selectMonth(m){
currentDate=new Date(pickerYear,m,1);
closeMonthPicker();
renderCalendar();
}

/* ===== Calendar swipe (prev/next month) ===== */

function initCalendarSwipe(){
const grid=document.getElementById("calendarGrid");
if(!grid || grid.dataset.swipeBound)return;
grid.dataset.swipeBound="1";

let startX=0, startY=0, tracking=false;

grid.addEventListener("touchstart",e=>{
if(e.touches.length!==1)return;
startX=e.touches[0].clientX;
startY=e.touches[0].clientY;
tracking=true;
},{passive:true});

grid.addEventListener("touchend",e=>{
if(!tracking)return;
tracking=false;
const t=e.changedTouches[0];
const dx=t.clientX-startX;
const dy=t.clientY-startY;
if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.4){
if(dx<0){nextMonth();}else{prevMonth();}
animateCalendar(dx<0?"left":"right");
}
},{passive:true});
}

function animateCalendar(dir){
const grid=document.getElementById("calendarGrid");
if(!grid)return;
grid.style.animation="none";
void grid.offsetWidth;
grid.style.animation=`calSlide-${dir} .22s ease`;
}

function maybeShowSwipeHint(){
try{
if(localStorage.getItem("facturesSwipeHint"))return;
localStorage.setItem("facturesSwipeHint","1");
}catch(e){}
const hint=document.getElementById("swipeHint");
if(!hint)return;
hint.classList.add("show");
setTimeout(()=>hint.classList.remove("show"),2600);
}

/* ===== Day popup ===== */

let currentDayDate=null;

function formatDayTitle(date){
const [y,m,d]=date.split("-").map(Number);
return `${d} de ${MONTH_NAMES[m-1]} ${y}`;
}

function openDayModal(date){
currentDayDate=date;
document.getElementById("dayModalTitle").innerText=formatDayTitle(date);
renderDayList();
openModalEl("dayModal");
}

function closeDayModal(){
closeModalEl("dayModal");
currentDayDate=null;
}

function renderDayList(){

const list=document.getElementById("dayList");

if(!list)return;

const items=classes.filter(c=>c.date===currentDayDate);

if(!items.length){
list.innerHTML=`<div class="day-empty">Cap curs en aquest dia.</div>`;
return;
}

list.innerHTML="";

items.forEach(item=>{

const total=(item.hours*item.price).toFixed(2);
const timeRange=(item.start&&item.end)?`${item.start} – ${item.end} · `:"";

list.innerHTML+=`

<div class="day-item">

<div class="di-bar" style="background:${item.color};"></div>

<div class="di-main">
<div class="di-course">${item.course}</div>
${item.module?`<div class="di-mod">${item.module}</div>`:""}
<div class="di-meta">${timeRange}${item.hours} h · ${total} €</div>
</div>

<div class="di-actions">
<button class="btn gray icon" onclick="editClassFromDay(${item.id})">${ICONS.edit}</button>
<button class="btn red icon" onclick="deleteClassFromDay(${item.id})">${ICONS.trash}</button>
</div>

</div>

`;

});

}

function addCourseFromDay(){
const date=currentDayDate;
closeDayModal();
openClassModal(date);
}

function editClassFromDay(id){
closeDayModal();
openClassModal(null,id);
}

function deleteClassFromDay(id){
classes=classes.filter(c=>c.id!==id);
selectedClasses=selectedClasses.filter(i=>i!==id);
renderAll();
renderDayList();
}

/* ===== Search & filter ===== */

let searchOpen=false;
let filterCourses=new Set();
let filterModules=new Set();
let filterDateFrom="";
let filterDateTo="";
let filterAmtMin="";
let filterAmtMax="";
let filterHrsMin="";
let filterHrsMax="";

function classMatches(item){
if(filterCourses.size>0 && !filterCourses.has(item.course))return false;
if(filterModules.size>0 && !filterModules.has(item.module))return false;
if(filterDateFrom && (item.date||"")<filterDateFrom)return false;
if(filterDateTo && (item.date||"")>filterDateTo)return false;
const amt=(item.hours||0)*(item.price||0);
if(filterAmtMin!=="" && amt<parseFloat(filterAmtMin))return false;
if(filterAmtMax!=="" && amt>parseFloat(filterAmtMax))return false;
const hrs=item.hours||0;
if(filterHrsMin!=="" && hrs<parseFloat(filterHrsMin))return false;
if(filterHrsMax!=="" && hrs>parseFloat(filterHrsMax))return false;
if(searchTerm){
const hay=((item.course||"")+" "+(item.module||"")+" "+(item.date||"")).toLowerCase();
if(!hay.includes(searchTerm))return false;
}
return true;
}

function structuralFiltersActive(){
return filterCourses.size>0 || filterModules.size>0 ||
!!filterDateFrom || !!filterDateTo ||
filterAmtMin!=="" || filterAmtMax!=="" ||
filterHrsMin!=="" || filterHrsMax!=="";
}

function filtersActive(){
return !!searchTerm || structuralFiltersActive();
}

function updateFilterButton(){
document.querySelectorAll(".tool-filter").forEach(b=>b.classList.toggle("active",structuralFiltersActive()));
}

function applyFilters(){
if(currentView==="calendar"){
renderCalendar();
}else{
renderClasses();
}
updateTotal();
}

function isMobileView(){return window.matchMedia("(max-width:560px)").matches;}

function toggleSearch(){
searchOpen=!searchOpen;
document.querySelectorAll(".tool-search").forEach(b=>b.classList.toggle("active",searchOpen));
const inline=document.getElementById("toolSearchInline");
const row=document.getElementById("searchRow");
if(isMobileView()){
// Mòbil: fila completa que llisca cap avall
if(inline)inline.classList.remove("open");
if(row)row.classList.toggle("hidden",!searchOpen);
if(searchOpen){const inp=document.getElementById("searchInput");if(inp)setTimeout(()=>inp.focus(),80);}
else clearSearch();
}else{
// PC: camp que s'expandeix cap a l'esquerra des de la icona
if(row)row.classList.add("hidden");
if(inline)inline.classList.toggle("open",searchOpen);
if(searchOpen){const inp=document.getElementById("searchInputTop");if(inp)setTimeout(()=>inp.focus(),120);}
else clearSearch();
}
}

function setSearch(v){
searchTerm=(v||"").trim().toLowerCase();
["searchInput","searchInputTop"].forEach(id=>{
const inp=document.getElementById(id);
if(inp && inp.value!==v)inp.value=v;
});
const clr=document.getElementById("searchClear");
if(clr)clr.classList.toggle("hidden",!searchTerm);
applyFilters();
}

function clearSearch(){
["searchInput","searchInputTop"].forEach(id=>{
const inp=document.getElementById(id);
if(inp)inp.value="";
});
setSearch("");
}

function renderFilterChips(){
const wrap=document.getElementById("filterChips");
if(!wrap)return;
if(!courses.length){
wrap.innerHTML='<div class="filter-empty">Encara no hi ha cursos</div>';
return;
}
wrap.innerHTML=courses.map(c=>{
const on=filterCourses.has(c.name);
const style=on?`style="background:${c.color};border-color:${c.color};color:#fff;"`:"";
const safe=String(c.name).replace(/"/g,"&quot;");
return `<button class="filter-chip${on?" on":""}" ${style} onclick="toggleFilterCourse(this)" data-course="${safe}">${c.name}</button>`;
}).join("");
}

function renderFilterModuleChips(){
const wrap=document.getElementById("filterModuleChips");
if(!wrap)return;
const mods=[...new Set(classes.map(c=>c.module).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ca"));
if(!mods.length){
wrap.innerHTML='<div class="filter-empty">Cap mòdul a les classes</div>';
return;
}
wrap.innerHTML=mods.map(m=>{
const on=filterModules.has(m);
const safe=String(m).replace(/"/g,"&quot;");
return `<button class="filter-chip${on?" on":""}" onclick="toggleFilterModule(this)" data-module="${safe}">${m}</button>`;
}).join("");
}

function syncFilterInputs(){
const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v;};
set("filterDateFrom",filterDateFrom);
set("filterDateTo",filterDateTo);
set("filterAmtMin",filterAmtMin);
set("filterAmtMax",filterAmtMax);
set("filterHrsMin",filterHrsMin);
set("filterHrsMax",filterHrsMax);
}

function renderFilters(){
renderFilterChips();
renderFilterModuleChips();
syncFilterInputs();
}

function showFilterScrim(pop){
let scrim=document.getElementById("filterScrim");
if(!scrim){
scrim=document.createElement("div");
scrim.id="filterScrim";
scrim.className="filter-scrim";
document.body.appendChild(scrim);
}
scrim.classList.remove("hidden");
scrim.onclick=()=>{pop.classList.add("hidden");hideFilterScrim();};
scrim._pop=pop;
}
function hideFilterScrim(){
const scrim=document.getElementById("filterScrim");
if(scrim)scrim.classList.add("hidden");
}

function attachSheetDrag(pop){
if(pop._dragBound)return;
pop._dragBound=true;
let startY=0,dy=0,dragging=false;
const scrim=()=>document.getElementById("filterScrim");
pop.addEventListener("touchstart",e=>{
if(!isMobileView())return;
if(pop.scrollTop>0)return; // deixa fer scroll intern primer
startY=e.touches[0].clientY;dy=0;dragging=true;
pop.style.transition="none";
},{passive:true});
pop.addEventListener("touchmove",e=>{
if(!dragging)return;
dy=e.touches[0].clientY-startY;
if(dy<=0){pop.style.transform="";return;}
if(pop.scrollTop>0){dragging=false;pop.style.transform="";return;}
pop.style.transform="translateY("+dy+"px)";
const s=scrim();if(s)s.style.opacity=String(Math.max(0,1-dy/300));
if(e.cancelable)e.preventDefault();
},{passive:false});
const end=()=>{
if(!dragging)return;
dragging=false;
pop.style.transition="transform .28s cubic-bezier(0.22,1,0.36,1)";
if(dy>110){
pop.style.transform="translateY(100%)";
const s=scrim();if(s)s.style.opacity="0";
setTimeout(()=>{
pop.classList.add("hidden");
hideFilterScrim();
pop.style.transform="";pop.style.transition="";
const s2=scrim();if(s2)s2.style.opacity="";
},260);
}else{
pop.style.transform="translateY(0)";
const s=scrim();if(s)s.style.opacity="";
setTimeout(()=>{pop.style.transition="";pop.style.transform="";},280);
}
};
pop.addEventListener("touchend",end);
pop.addEventListener("touchcancel",end);
}

function positionFilterPopup(pop,btn){
pop.classList.remove("hidden");
if(isMobileView()){
// Full de baix: la posició la controla el CSS; només cal l'enfosquiment.
pop.style.top=pop.style.right=pop.style.maxHeight="";
pop.style.transform="";pop.style.transition="";
attachSheetDrag(pop);
showFilterScrim(pop);
return;
}
hideFilterScrim();
// Ancorat sota el botó, alineat a la dreta; després es limita perquè mai
// surti de la pantalla (ni per baix ni pels costats).
pop.style.maxHeight="";
pop.style.top="0px";
pop.style.right="12px";
const r=btn.getBoundingClientRect();
const vw=window.innerWidth, vh=window.innerHeight;
const margin=12, gap=8;
const pw=pop.offsetWidth;
let right=Math.max(margin,vw-r.right);
if(vw-right-pw<margin)right=Math.max(margin,vw-pw-margin);
pop.style.right=right+"px";
const below=vh-r.bottom-gap-margin;
const above=r.top-gap-margin;
if(below>=Math.min(pop.offsetHeight,220)||below>=above){
pop.style.top=(r.bottom+gap)+"px";
pop.style.maxHeight=Math.max(160,below)+"px";
}else{
pop.style.maxHeight=Math.max(160,above)+"px";
pop.style.top=Math.max(margin,r.top-gap-Math.min(pop.offsetHeight,above))+"px";
}
}

function toggleFilter(btn){
const pop=document.getElementById("filterPopup");
if(!pop)return;
if(!pop.classList.contains("hidden")){
pop.classList.add("hidden");
hideFilterScrim();
return;
}
renderFilters();
positionFilterPopup(pop,btn);
}

function toggleFilterCourse(btn){
const name=btn.getAttribute("data-course");
if(filterCourses.has(name)){filterCourses.delete(name);}else{filterCourses.add(name);}
updateFilterButton();
renderFilterChips();
applyFilters();
}

function toggleFilterModule(btn){
const name=btn.getAttribute("data-module");
if(filterModules.has(name)){filterModules.delete(name);}else{filterModules.add(name);}
updateFilterButton();
renderFilterModuleChips();
applyFilters();
}

function setDateFilter(){
filterDateFrom=(document.getElementById("filterDateFrom")||{}).value||"";
filterDateTo=(document.getElementById("filterDateTo")||{}).value||"";
updateFilterButton();
applyFilters();
}

function setRangeFilter(){
const v=id=>{const el=document.getElementById(id);return el?el.value:"";};
filterAmtMin=v("filterAmtMin");
filterAmtMax=v("filterAmtMax");
filterHrsMin=v("filterHrsMin");
filterHrsMax=v("filterHrsMax");
updateFilterButton();
applyFilters();
}

function clearFilter(){
filterCourses.clear();
filterModules.clear();
filterDateFrom="";filterDateTo="";
filterAmtMin="";filterAmtMax="";
filterHrsMin="";filterHrsMax="";
updateFilterButton();
renderFilters();
applyFilters();
}

/* Close the filter popover when clicking outside it */
document.addEventListener("click",function(e){
const pop=document.getElementById("filterPopup");
if(!pop || pop.classList.contains("hidden"))return;
if(!e.target.closest("#filterPopup") && !e.target.closest(".tool-filter")){
pop.classList.add("hidden");
hideFilterScrim();
}
});

/* ===== Total ===== */

function updateTotal(){

const src=filtersActive()?classes.filter(classMatches):classes;

const total=src.reduce((acc,item)=>{

return acc+(item.hours*item.price);

},0);

const totalEl=document.getElementById("totalAmount");
if(totalEl)totalEl.innerText=total.toFixed(2);

}

function toggleClass(id){

if(selectedClasses.includes(id)){

selectedClasses=
selectedClasses.filter(i=>i!==id);

}else{

selectedClasses.push(id);

}

syncSelectAll();

}

function toggleSelectAll(){

const cb=document.getElementById("selectAllClasses");

if(cb && cb.checked){
selectedClasses=classes.map(c=>c.id);
}else{
selectedClasses=[];
}

renderClasses();

}

function syncSelectAll(){

const cb=document.getElementById("selectAllClasses");
if(!cb)return;

if(classes.length===0){
cb.checked=false;
cb.indeterminate=false;
cb.disabled=true;
return;
}

cb.disabled=false;
const selectedCount=classes.filter(c=>selectedClasses.includes(c.id)).length;
cb.checked=selectedCount===classes.length;
cb.indeterminate=selectedCount>0 && selectedCount<classes.length;

}

/* Press-and-hold selection for mobile (checkbox column is hidden ≤560px).
   Hold a row ~450ms to toggle it; once anything is selected, a plain tap
   toggles too, so the user can multi-select naturally. */
function setupRowSelection(){
const tbody=document.getElementById("classesTable");
if(!tbody || tbody.dataset.lpBound)return;
tbody.dataset.lpBound="1";

let timer=null,fired=false,startX=0,startY=0,heldRow=null;

const clearHold=()=>{
if(timer){clearTimeout(timer);timer=null;}
if(heldRow)heldRow.classList.remove("lp-holding");
heldRow=null;
};

tbody.addEventListener("pointerdown",e=>{
if(window.innerWidth>560)return;
if(e.target.closest(".row-actions"))return;
const tr=e.target.closest("tr[data-class-id]");
if(!tr)return;
fired=false;
startX=e.clientX;startY=e.clientY;
heldRow=tr;
tr.classList.add("lp-holding");
const id=parseInt(tr.dataset.classId,10);
timer=setTimeout(()=>{
fired=true;
clearHold();
toggleClass(id);
renderClasses();
updateTotal();
if(navigator.vibrate)navigator.vibrate(18);
},450);
});

tbody.addEventListener("pointermove",e=>{
if(!timer)return;
if(Math.abs(e.clientX-startX)>10||Math.abs(e.clientY-startY)>10)clearHold();
});

tbody.addEventListener("pointerup",e=>{
if(window.innerWidth>560){clearHold();return;}
const tr=e.target.closest("tr[data-class-id]");
const wasHeld=!!timer;
clearHold();
if(fired)return;
if(e.target.closest(".row-actions"))return;
// In selection mode (something already selected) a tap toggles.
if(wasHeld && tr && selectedClasses.length>0){
toggleClass(parseInt(tr.dataset.classId,10));
renderClasses();
updateTotal();
}
});

tbody.addEventListener("pointercancel",clearHold);
tbody.addEventListener("pointerleave",clearHold);
}

function deleteClass(id){

classes=
classes.filter(c=>c.id!==id);

selectedClasses=
selectedClasses.filter(i=>i!==id);

renderAll();

}

let editingClassId=null;

function computeHours(start,end){

const startHour=parseInt(start.split(":")[0]);
const startMin=parseInt(start.split(":")[1]);

const endHour=parseInt(end.split(":")[0]);
const endMin=parseInt(end.split(":")[1]);

return ((endHour*60+endMin)-(startHour*60+startMin))/60;

}

/* ===== Class modal + module select ===== */

function populateModuleSelect(preselect){

const courseSelect=document.getElementById("modalClassCourse");
const field=document.getElementById("moduleField");
const moduleSelect=document.getElementById("modalClassModule");

if(!courseSelect||!field||!moduleSelect)return;

const courseId=Number(courseSelect.value);
const course=courses.find(c=>c.id===courseId);

if(!course || !course.modules || !course.modules.length){
field.classList.add("hidden");
moduleSelect.innerHTML="";
return;
}

field.classList.remove("hidden");

moduleSelect.innerHTML="<option value=''>— Sense mòdul —</option>";

course.modules.forEach(m=>{
moduleSelect.innerHTML+=`<option value="${m}">${m}</option>`;
});

if(preselect)moduleSelect.value=preselect;

}

function openClassModal(date,classId){

editingClassId=classId || null;

const select=document.getElementById("modalClassCourse");

select.innerHTML="<option value=''>Selecciona curs</option>";

courses.forEach(course=>{

select.innerHTML+=`
<option value="${course.id}">
${course.name} (${course.price} €/h)
</option>
`;

});

if(classId){

const cls=classes.find(c=>c.id===classId);

document.getElementById("classModalTitle").innerText="Editar classe";

document.getElementById("modalClassDate").value=cls.date || "";

const course=courses.find(c=>c.name===cls.course);

document.getElementById("modalClassCourse").value=course ? course.id : "";

populateModuleSelect(cls.module || "");

document.getElementById("modalStartTime").value=cls.start || "";
document.getElementById("modalEndTime").value=cls.end || "";

}else{

document.getElementById("classModalTitle").innerText="Afegir classe";

const today=new Date();
const iso=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

document.getElementById("modalClassDate").value=date || iso;
document.getElementById("modalClassCourse").value="";
populateModuleSelect();
document.getElementById("modalStartTime").value="";
document.getElementById("modalEndTime").value="";

}

openModalEl("classModal");

}

function closeClassModal(){

editingClassId=null;

closeModalEl("classModal");

}

function addClassFromModal(){

const date=document.getElementById("modalClassDate").value;
const courseId=Number(document.getElementById("modalClassCourse").value);
const start=document.getElementById("modalStartTime").value;
const end=document.getElementById("modalEndTime").value;

if(!date || !courseId || !start || !end){
alert("Omple tots els camps");
return;
}

const course=courses.find(c=>c.id===courseId);

const moduleEl=document.getElementById("modalClassModule");
const moduleVal=(moduleEl && !document.getElementById("moduleField").classList.contains("hidden"))?moduleEl.value:"";

const hours=computeHours(start,end);

if(editingClassId){

const cls=classes.find(c=>c.id===editingClassId);

cls.date=date;
cls.course=course.name;
cls.module=moduleVal;
cls.price=course.price;
cls.hours=hours;
cls.color=course.color;
cls.start=start;
cls.end=end;

}else{

if(classExists(date,course.name,moduleVal,start,end)){
if(!confirm("Ja existeix una classe idèntica en aquesta data. Vols afegir-la igualment?"))return;
}

classes.push({
id:Date.now(),
date,
course:course.name,
module:moduleVal,
price:course.price,
hours,
color:course.color,
start,
end
});

}

const _clsEdit=!!editingClassId;
closeClassModal();

renderAll();

showSnack(_clsEdit?"Classe actualitzada":"Classe desada");

}

function editClass(id){

openClassModal(null,id);

}

/* ===== Courses ===== */

let editingCourseId=null;

function openAddCourseModal(){
editingCourseId=null;
document.getElementById("courseModalTitle").innerText="Afegir curs";
document.getElementById("courseName").value="";
document.getElementById("coursePrice").value="";
document.getElementById("courseColor").value="#111114";
openModalEl("courseModal");
}

function openEditCourseModal(id){
const course=courses.find(c=>c.id===id);
if(!course)return;
editingCourseId=id;
document.getElementById("courseModalTitle").innerText="Editar curs";
document.getElementById("courseName").value=course.name||"";
document.getElementById("coursePrice").value=course.price;
document.getElementById("courseColor").value=course.color||"#111114";
openModalEl("courseModal");
}

function closeCourseModal(){
editingCourseId=null;
closeModalEl("courseModal");
}

function saveCourse(){

const name=document.getElementById("courseName").value.trim();
const priceRaw=document.getElementById("coursePrice").value;
const color=document.getElementById("courseColor").value;

if(!name || priceRaw===""){
alert("Omple el nom i el preu.");
return;
}

const price=Number(priceRaw);

if(editingCourseId){

const course=courses.find(c=>c.id===editingCourseId);
if(!course)return;

const oldName=course.name;

course.name=name;
course.price=price;
course.color=color;

classes.forEach(c=>{
if(c.course===oldName){
c.course=name;
c.price=price;
c.color=color;
}
});

}else{

courses.push({
id:Date.now(),
name,
price,
color,
modules:[]
});

}

closeCourseModal();

renderAll();

}

function renderCourses(){

const container=document.getElementById("coursesList");

if(!container)return;

container.innerHTML="";

courses.forEach(course=>{

const modulesHTML=
(course.modules && course.modules.length)
? `<ul class="module-list">${course.modules.map((m,idx)=>`
<li class="module-item">
<span class="module-item-name" id="moduleName-${course.id}-${idx}">${m}</span>
<div class="module-item-actions">
<button class="btn gray" onclick="editModule(${course.id},${idx})" title="Editar mòdul">${ICONS.edit}</button>
<button class="btn red" onclick="deleteModule(${course.id},${idx})" title="Eliminar mòdul">${ICONS.trash}</button>
</div>
</li>
`).join("")}</ul>`
: `<div class="module-empty">Encara no hi ha mòduls.</div>`;

container.innerHTML+=`

<div class="card" style="padding:16px;margin-bottom:12px;">

<div class="course-row">

<span class="course-dot" style="background:${course.color};"></span>

<div class="course-meta">
<div class="course-name editable-name" onclick="openEditCourseModal(${course.id})" title="Editar curs">${course.name}</div>
<div class="small">${course.price} €/h</div>
</div>

<button class="module-toggle ${openModuleCourses.has(course.id)?"open":""}" id="moduleToggle-${course.id}" onclick="toggleModules(${course.id})">
Mòduls${(course.modules&&course.modules.length)?` · ${course.modules.length}`:""}
<svg class="module-chevron" width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l5 5 5-5"></path></svg>
</button>

<div class="course-actions">
<button class="btn red" onclick="deleteCourse(${course.id})">${ICONS.trash}</button>
</div>

</div>

<div class="module-body ${openModuleCourses.has(course.id)?"":"hidden"}" id="moduleBody-${course.id}">

${modulesHTML}

<div class="module-add">
<input type="text" id="moduleInput-${course.id}" placeholder="Nou mòdul" onkeydown="if(event.key==='Enter'){addModule(${course.id});}">
<button class="btn green" onclick="addModule(${course.id})">
${ICONS.plus} Afegir
</button>
</div>

</div>

</div>

`;

});

}

function toggleModules(id){
const body=document.getElementById("moduleBody-"+id);
const btn=document.getElementById("moduleToggle-"+id);
if(!body)return;
const willOpen=body.classList.contains("hidden");
body.classList.toggle("hidden",!willOpen);
if(btn)btn.classList.toggle("open",willOpen);
if(willOpen)openModuleCourses.add(id);
else openModuleCourses.delete(id);
}

function addModule(courseId){

const input=document.getElementById("moduleInput-"+courseId);

if(!input)return;

const name=input.value.trim();

if(!name)return;

const course=courses.find(c=>c.id===courseId);

if(!course)return;

if(!Array.isArray(course.modules))course.modules=[];

if(course.modules.includes(name))return;

course.modules.push(name);

openModuleCourses.add(courseId);

renderAll();

}

function deleteModule(courseId,idx){

const course=courses.find(c=>c.id===courseId);

if(!course || !course.modules)return;

const removed=course.modules[idx];

course.modules.splice(idx,1);

classes.forEach(c=>{
if(c.course===course.name && c.module===removed)c.module="";
});

renderAll();

}

function editModule(courseId,idx){

const course=courses.find(c=>c.id===courseId);

if(!course || !course.modules)return;

const oldName=course.modules[idx];

const newName=(prompt("Edita el mòdul:",oldName)||"").trim();

if(!newName || newName===oldName)return;

if(course.modules.some((m,i)=>i!==idx && m===newName)){
alert("Ja existeix un mòdul amb aquest nom.");
return;
}

course.modules[idx]=newName;

classes.forEach(c=>{
if(c.course===course.name && c.module===oldName)c.module=newName;
});

openModuleCourses.add(courseId);

renderAll();

}

function deleteCourse(id){

courses=
courses.filter(c=>c.id!==id);

renderAll();

}

/* ===== Clients ===== */

let editingClientIndex=null;

function openAddClientModal(){
editingClientIndex=null;
document.getElementById("clientModalTitle").innerText="Afegir client";
["clientName","clientNif","clientAddress","clientCity"].forEach(id=>{
document.getElementById(id).value="";
});
openModalEl("clientModal");
}

function openEditClientModal(index){
const client=clients[index];
if(!client)return;
editingClientIndex=index;
document.getElementById("clientModalTitle").innerText="Editar client";
document.getElementById("clientName").value=client.name||"";
document.getElementById("clientNif").value=client.nif||"";
document.getElementById("clientAddress").value=client.address||"";
document.getElementById("clientCity").value=client.city||"";
openModalEl("clientModal");
}

function closeClientModal(){
editingClientIndex=null;
closeModalEl("clientModal");
}

function saveClient(){

const name=document.getElementById("clientName").value.trim();
const nif=document.getElementById("clientNif").value;
const address=document.getElementById("clientAddress").value;
const city=document.getElementById("clientCity").value;

if(!name){
alert("El nom del client és obligatori.");
return;
}

if(editingClientIndex!==null){
Object.assign(clients[editingClientIndex],{name,nif,address,city});
}else{
clients.push({name,nif,address,city});
}

closeClientModal();

renderAll();

}

function renderClients(){

const container=document.getElementById("clientsList");

if(!container)return;

container.innerHTML="";

clients.forEach((client,index)=>{

container.innerHTML+=`

<div class="card" style="padding:16px;margin-bottom:12px;">

<div style="
display:flex;
justify-content:space-between;
align-items:center;
gap:12px;
flex-wrap:wrap;
">

<div>

<div class="editable-name" style="font-weight:700;" onclick="openEditClientModal(${index})" title="Editar client">
${client.name}
</div>

</div>

<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">

<button
class="btn red"
onclick="deleteClient(${index})"
>
${ICONS.trash}
</button>

</div>

</div>

</div>

`;

});

}

function deleteClient(index){

clients.splice(index,1);

renderAll();

}

/* ===== Invoice ===== */

function openInvoiceModal(){

if(selectedClasses.length===0){
alert("Selecciona almenys una classe a la taula.");
setView("table");
return;
}

openModalEl("invoiceModal");

}

function closeInvoiceModal(){
closeModalEl("invoiceModal");
}

function generateInvoiceNumber(){

const year=new Date().getFullYear();

let max=0;
(invoices||[]).forEach(inv=>{
const m=String(inv.number||"").match(/(\d+)\s*\/\s*(\d{4})/);
if(m && Number(m[2])===year){
const n=Number(m[1]);
if(n>max)max=n;
}
});

return (max+1)+"/"+year;

}

async function generateInvoicePDF(){

const items=
classes.filter(c=>selectedClasses.includes(c.id));

const client=
clients[document.getElementById("invoiceClient").value];

const issuerId =
document.getElementById("invoiceIssuer").value;

const issuer =
issuers.find(i => i.id == issuerId);

if(!issuer){
alert("Selecciona emissor.");
return;
}

if(!client){
alert("Selecciona client.");
return;
}

const language=
document.getElementById("invoiceLanguage").value;

const iva=
Number(document.getElementById("invoiceIVA").value);

const irpf=
Number(document.getElementById("invoiceIRPF").value);

const subtotal=
items.reduce((acc,item)=>{

return acc+(item.hours*item.price);

},0);

const ivaAmount=subtotal*(iva/100);

const irpfAmount=subtotal*(irpf/100);

const total=subtotal+ivaAmount-irpfAmount;

const invoiceNumber=generateInvoiceNumber();

const { jsPDF } = window.jspdf;

const doc=new jsPDF();

let y=20;

const fmtDMY=d=>String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear();
const issueDate=new Date();
const dueDate=new Date(Date.now()+30*86400000);

const INK=[34,38,46];
const GRAY=[120,128,140];
const LINE=[223,226,232];

const L={
ca:{titleWord:"Factura",billTo:"FACTURAR A",issueDate:"Data emissió:",dueDate:"Venciment:",reference:"Referència:",description:"Descripció",quantity:"Hores",unitPrice:"Preu/h (€)",amount:"Import (€)",subtotal:"Subtotal",iva:"IVA",irpf:"IRPF",total:"Total (EUR):",payment:"DADES DE PAGAMENT"},
es:{titleWord:"Factura",billTo:"FACTURAR A",issueDate:"Fecha emisión:",dueDate:"Vencimiento:",reference:"Referencia:",description:"Descripción",quantity:"Horas",unitPrice:"Precio/h (€)",amount:"Importe (€)",subtotal:"Subtotal",iva:"IVA",irpf:"IRPF",total:"Total (EUR):",payment:"DATOS DE PAGO"}
}[language];

const money=n=>n.toLocaleString(language==="es"?"es-ES":"ca-ES",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";

const LX=20, RX=190;

/* ---- Header: logo badge + name (left) ---- */
const badgeSize=20;
const badgeTop=13;
if(window.LOGO_BADGE_DATA_URL){
try{
doc.addImage(window.LOGO_BADGE_DATA_URL,"PNG",LX,badgeTop,badgeSize,badgeSize);
}catch(e){}
}
const fullName=(issuer.name||"Marta San José Gispert").trim();
const nameParts=fullName.split(/\s+/);
const firstName=nameParts[0]||"";
const surnames=nameParts.slice(1).join(" ");
const nameX=LX+badgeSize+6;
doc.setTextColor(107,176,173);
doc.setFont("helvetica","bold");
doc.setFontSize(28);
doc.text(firstName,nameX,badgeTop+8);
if(surnames){
doc.setFont("helvetica","bold");
doc.setFontSize(18);
doc.setTextColor(32,46,66);
doc.text(surnames,nameX,badgeTop+16);
}

/* ---- Header: invoice number (right) ---- */
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.setFont("helvetica","bold");
doc.setFontSize(16);
doc.text(L.titleWord+" "+invoiceNumber,RX,22,{align:"right"});
doc.setFont("helvetica","normal");
doc.setFontSize(9);
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
if(issuer.nif)doc.text("NIF "+issuer.nif,RX,28,{align:"right"});

y=64;

/* ---- Bill to (left) ---- */
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
doc.setFont("helvetica","bold");
doc.setFontSize(9);
doc.text(L.billTo,LX,y);
doc.setFont("helvetica","normal");
doc.setFontSize(10);
doc.setTextColor(60,66,76);
const clientLines=[client.name,client.nif,client.address,client.city].filter(Boolean);
doc.text(clientLines,LX,y+7);

/* ---- Meta (right) ---- */
const metaLabelX=138, metaValX=RX;
doc.setFontSize(10);
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
doc.setFont("helvetica","normal");
doc.text(L.issueDate,metaLabelX,y);
doc.text(L.dueDate,metaLabelX,y+6);
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.setFont("helvetica","bold");
doc.text(fmtDMY(issueDate),metaValX,y,{align:"right"});
doc.text(fmtDMY(dueDate),metaValX,y+6,{align:"right"});
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
doc.setFont("helvetica","normal");
doc.text(L.reference,metaLabelX,y+16);
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.setFont("helvetica","bold");
doc.text(String(invoiceNumber),metaValX,y+16,{align:"right"});

/* ---- Table ---- */
y+=42;
const colDesc=LX, colQty=130, colUnit=160, colAmt=RX;
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
doc.setFont("helvetica","bold");
doc.setFontSize(9.5);
doc.text(L.description,colDesc,y);
doc.text(L.quantity,colQty,y,{align:"right"});
doc.text(L.unitPrice,colUnit,y,{align:"right"});
doc.text(L.amount,colAmt,y,{align:"right"});
y+=3;
doc.setDrawColor(INK[0],INK[1],INK[2]);
doc.setLineWidth(0.4);
doc.line(LX,y,RX,y);
y+=6;

doc.setFont("helvetica","normal");
doc.setFontSize(10);
items.forEach(item=>{
const label=item.module?item.course+" — "+item.module:item.course;
const lines=doc.splitTextToSize(label,colQty-colDesc-8);
const amt=item.hours*item.price;
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.text(lines,colDesc,y);
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.text(item.hours.toFixed(2),colQty,y,{align:"right"});
doc.text(item.price.toFixed(2),colUnit,y,{align:"right"});
doc.text(amt.toFixed(2),colAmt,y,{align:"right"});
const rh=Math.max(9,lines.length*5+4);
y+=rh;
doc.setDrawColor(LINE[0],LINE[1],LINE[2]);
doc.setLineWidth(0.2);
doc.line(LX,y-4,RX,y-4);
});

/* ---- Payment (left) + Totals (right) ---- */
y+=4;
const payTop=y;

const totLabelX=120;
const totalsRow=(label,value,opts={})=>{
doc.setFont("helvetica",opts.bold?"bold":"normal");
doc.setFontSize(opts.size||10);
doc.setTextColor(INK[0],INK[1],INK[2]);
doc.text(label,totLabelX,y);
doc.text(value,RX,y,{align:"right"});
y+=opts.gap||7;
};
totalsRow(L.subtotal+":",money(subtotal));
totalsRow(L.iva+" "+iva+"%:",money(ivaAmount));
if(irpf>0)totalsRow(L.irpf+" "+irpf+"%:","-"+money(irpfAmount));
y+=1;
doc.setDrawColor(INK[0],INK[1],INK[2]);
doc.setLineWidth(0.4);
doc.line(totLabelX,y-3,RX,y-3);
y+=4;
totalsRow(L.total,money(total),{bold:true,size:13,gap:8});

/* payment block on the left */
if(issuer.iban||issuer.paymentMethod){
let py=payTop;
doc.setFont("helvetica","bold");
doc.setFontSize(8.5);
doc.setTextColor(GRAY[0],GRAY[1],GRAY[2]);
doc.text(L.payment,LX,py);
py+=6;
doc.setFont("helvetica","normal");
doc.setFontSize(9.5);
doc.setTextColor(60,66,76);
const payLines=[issuer.paymentMethod,issuer.iban?"IBAN: "+issuer.iban:"",issuer.swift?"SWIFT: "+issuer.swift:""].filter(Boolean);
doc.text(payLines,LX,py);
}

/* ---- Footer ---- */
const fy=282;
doc.setDrawColor(LINE[0],LINE[1],LINE[2]);
doc.setLineWidth(0.3);
doc.line(LX,fy-7,RX,fy-7);
doc.setFont("helvetica","normal");
doc.setFontSize(9);
doc.setTextColor(90,96,106);
if(issuer.phone)doc.text(issuer.phone,LX,fy-1);
if(issuer.email)doc.text(issuer.email,RX,fy-1,{align:"right"});
doc.setFontSize(8.5);
doc.setTextColor(120,128,140);
const footAddr=[issuer.name,issuer.address,[issuer.postalCode,issuer.city].filter(Boolean).join(" ")].filter(Boolean).join("  ·  ");
if(footAddr)doc.text(footAddr,LX,fy+5);

/* ---- Registra la factura al llibre d'ingressos ---- */
const isoDate=`${issueDate.getFullYear()}-${String(issueDate.getMonth()+1).padStart(2,"0")}-${String(issueDate.getDate()).padStart(2,"0")}`;
invoices.push({
id:Date.now(),
date:isoDate,
number:invoiceNumber,
clientName:client.name||"",
clientNif:client.nif||"",
base:subtotal,
ivaPct:iva,
ivaAmount:ivaAmount,
irpfPct:irpf,
irpfAmount:irpfAmount,
total:total,
issuer:issuer.name||""
});
saveLocal();
if(typeof renderLedger==="function")renderLedger();

doc.save(`factura_${String(invoiceNumber).replace(/[^\w-]/g,"-")}.pdf`);

closeInvoiceModal();

}

/* ===== Issuers ===== */

function openAddIssuerModal(){
clearIssuerForm();
document.getElementById("issuerModalTitle").innerText="Afegir emissor";
openModalEl("issuerModal");
}

function closeIssuerModal(){
closeModalEl("issuerModal");
clearIssuerForm();
}

let editingIssuerId=null;
let justSetDefaultId=null;

function getIssuerForm(){
return {
name:document.getElementById("issuerName").value,
nif:document.getElementById("issuerNif").value,
address:document.getElementById("issuerAddress").value,
city:document.getElementById("issuerCity").value,
postalCode:document.getElementById("issuerPostal").value,
phone:document.getElementById("issuerPhone").value,
email:document.getElementById("issuerEmail").value,
iban:document.getElementById("issuerIBAN").value,
swift:document.getElementById("issuerSWIFT").value
};
}

function clearIssuerForm(){
["issuerName","issuerNif","issuerAddress","issuerCity","issuerPostal","issuerPhone","issuerEmail","issuerIBAN","issuerSWIFT"].forEach(id=>{
const el=document.getElementById(id);
if(el)el.value="";
});
editingIssuerId=null;
const btn=document.getElementById("issuerSubmitBtn");
if(btn)btn.innerText="Afegir emissor";
}

function addIssuer(){

const data=getIssuerForm();

if(!data.name){
alert("El nom de l'emissor és obligatori.");
return;
}

if(editingIssuerId){

const issuer=issuers.find(i=>i.id===editingIssuerId);

Object.assign(issuer,data);

}else{

issuers.push(Object.assign({
id:Date.now(),
paymentMethod:"Transferència bancària"
},data));

if(!issuers.some(i=>i.isDefault)){
issuers[issuers.length-1].isDefault=true;
}

}

clearIssuerForm();

renderAll();
renderIssuers();

closeModalEl("issuerModal");

}

function editIssuer(id){

const issuer=issuers.find(i=>i.id===id);

if(!issuer)return;

editingIssuerId=id;

document.getElementById("issuerModalTitle").innerText="Editar emissor";

document.getElementById("issuerName").value=issuer.name||"";
document.getElementById("issuerNif").value=issuer.nif||"";
document.getElementById("issuerAddress").value=issuer.address||"";
document.getElementById("issuerCity").value=issuer.city||"";
document.getElementById("issuerPostal").value=issuer.postalCode||"";
document.getElementById("issuerPhone").value=issuer.phone||"";
document.getElementById("issuerEmail").value=issuer.email||"";
document.getElementById("issuerIBAN").value=issuer.iban||"";
document.getElementById("issuerSWIFT").value=issuer.swift||"";

const btn=document.getElementById("issuerSubmitBtn");
if(btn)btn.innerText="Desar canvis";

openModalEl("issuerModal");

}

function deleteIssuer(id){

const wasDefault=(issuers.find(i=>i.id===id)||{}).isDefault;

issuers=issuers.filter(i=>i.id!==id);

if(wasDefault && issuers.length && !issuers.some(i=>i.isDefault)){
issuers[0].isDefault=true;
}

renderAll();
renderIssuers();

}

function setDefaultIssuer(id){

issuers.forEach(i=>{
i.isDefault=(i.id===id);
});

justSetDefaultId=id;

renderAll();
renderIssuers();

}

function renderIssuers(){

const container=
document.getElementById("issuersList");

if(!container)return;

container.innerHTML="";

issuers.forEach(issuer=>{

container.innerHTML+=`

<div class="card issuer-card">

<div class="issuer-row">

<div class="issuer-info">
<strong class="editable-name" onclick="editIssuer(${issuer.id})" title="Editar emissor">${issuer.name}</strong>
</div>

<div class="issuer-actions">

<button
class="btn ${issuer.isDefault?"green":"gray"} btn-default"
onclick="setDefaultIssuer(${issuer.id})"
title="${issuer.isDefault?"Emissor per defecte":"Marcar com a emissor per defecte"}"
>
${issuer.isDefault?`<span class="dflt-label${justSetDefaultId===issuer.id?" anim":""}">Per defecte</span>${ICONS.starFill}`:ICONS.star}
</button>

<button
class="btn red"
onclick="deleteIssuer(${issuer.id})"
>
${ICONS.trash}
</button>

</div>

</div>

</div>

`;

});

justSetDefaultId=null;

}

/* ===== Llibre de registre: ingressos + despeses ===== */

const EXPENSE_CATEGORIES=[
{key:"consumos",label:"Consums d'explotació",es:"CONSUMOS EXPLOTACIÓN",color:"#2563eb"},
{key:"suministros",label:"Subministraments",es:"SUBMINISTROS",color:"#0891b2"},
{key:"personal",label:"Altres despeses de personal",es:"OTROS GASTOS PERSONAL",color:"#db2777"},
{key:"ss",label:"Seguretat Social",es:"SEGURIDAD SOCIAL",color:"#16a34a"},
{key:"arrendam",label:"Arrendaments i cànons",es:"ARRENDAM. CÁNONES",color:"#d97706"},
{key:"reparacion",label:"Reparacions i conservació",es:"REPARACIONES CONSERVACIÓN",color:"#7c3aed"},
{key:"profesional",label:"Serveis professionals independents",es:"SERVICIOS PROFESIONALES INDEPENDIENTES",color:"#0d9488"},
{key:"otros_serv",label:"Altres serveis",es:"OTROS SERVICIOS.",color:"#dc2626"},
{key:"tributos",label:"Tributs deduïbles",es:"TRIBUTOS DEDUCIBLES",color:"#65a30d"},
{key:"financieros",label:"Despeses financeres",es:"GASTOS FINANCIEROS",color:"#9333ea"},
{key:"otros",label:"Altres despeses",es:"OTROS GASTOS",color:"#64748b"}
];

const LEDGER_ICONS={
edit:`<svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 4.5l4 4"></path><path d="M4 18l1-4 9.5-9.5 3 3L8 17z"></path></svg>`,
trash:`<svg width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h14"></path><path d="M8 6V4h6v2"></path><path d="M6 6l1 12h8l1-12"></path></svg>`
};

let ledgerTab="income";

function eur(n){return Number(n||0).toLocaleString("ca-ES",{minimumFractionDigits:2,maximumFractionDigits:2})+" €";}
function round2(n){return Math.round((Number(n)||0)*100)/100;}
function fmtDateLabel(iso){if(!iso)return"";const[y,m,d]=iso.split("-");return `${d}/${m}/${y}`;}
function ledgerEsc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function quarterOf(iso){const m=Number((iso||"").split("-")[1]||0);return Math.floor((m-1)/3)+1;}
function catInfo(key){return EXPENSE_CATEGORIES.find(c=>c.key===key)||EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length-1];}

function ledgerPeriod(){
const ys=document.getElementById("ledgerYear");
const qs=document.getElementById("ledgerQuarter");
return {year:ys&&ys.value?Number(ys.value):null, quarter:qs&&qs.value?Number(qs.value):null};
}
function inPeriod(iso,p){
if(!iso)return false;
const parts=iso.split("-");
const Y=Number(parts[0]), M=Number(parts[1]);
if(p.year && Y!==p.year)return false;
if(p.quarter && (Math.floor((M-1)/3)+1)!==p.quarter)return false;
return true;
}

function populateLedgerYears(){
const sel=document.getElementById("ledgerYear");
if(!sel)return;
const years=new Set();
(invoices||[]).forEach(i=>{if(i.date)years.add(i.date.slice(0,4));});
(expenses||[]).forEach(e=>{if(e.date)years.add(e.date.slice(0,4));});
years.add(String(new Date().getFullYear()));
const sorted=[...years].sort().reverse();
const cur=sel.value;
sel.innerHTML=sorted.map(y=>`<option value="${y}">${y}</option>`).join("");
if(cur&&sorted.includes(cur))sel.value=cur;
}

function populateExpenseCategorySelect(){
const sel=document.getElementById("expCategory");
if(!sel||sel.dataset.filled)return;
sel.innerHTML=EXPENSE_CATEGORIES.map(c=>`<option value="${c.key}">${c.label}</option>`).join("");
sel.dataset.filled="1";
}

function setLedgerTab(tab){
ledgerTab=tab;
document.getElementById("ledgerTab-income").classList.toggle("active",tab==="income");
document.getElementById("ledgerTab-expense").classList.toggle("active",tab==="expense");
positionLedgerPill();
document.getElementById("ledgerIncome").classList.toggle("hidden",tab!=="income");
document.getElementById("ledgerExpense").classList.toggle("hidden",tab!=="expense");
const addBtn=document.getElementById("ledgerAddBtn");
const addLbl=document.getElementById("ledgerAddLabel");
if(addBtn&&addLbl){
if(tab==="expense"){
addLbl.textContent="Afegir despesa";
addBtn.onclick=openExpenseModal;
}else{
addLbl.textContent="Afegir factura";
addBtn.onclick=openInvoiceRecordModal;
}
}
renderLedger();
}

function renderLedger(){
populateLedgerYears();
populateExpenseCategorySelect();
updateLedgerFilterLabel();
renderIncomeRows();
renderExpenseRows();
animateLedgerRows=false;
}

function updateLedgerFilterLabel(){
const btn=document.getElementById("ledgerFilterBtn");
if(!btn)return;
const p=ledgerPeriod();
// mark active when narrowed to a quarter (year alone is the default view)
btn.classList.toggle("active",!!p.quarter);
}

function clearLedgerFilter(){
const q=document.getElementById("ledgerQuarter");
const y=document.getElementById("ledgerYear");
if(q)q.value="";
if(y)y.value=String(new Date().getFullYear());
renderLedger();
}

function toggleLedgerFilter(btn){
const pop=document.getElementById("ledgerFilterPop");
if(!pop)return;
if(!pop.classList.contains("hidden")){
pop.classList.add("hidden");
hideFilterScrim();
return;
}
renderLedger();
positionFilterPopup(pop,(btn||document.getElementById("ledgerFilterBtn")));
}

/* Tanca el filtre del llibre en clicar fora */
document.addEventListener("click",function(e){
const pop=document.getElementById("ledgerFilterPop");
if(!pop || pop.classList.contains("hidden"))return;
if(!e.target.closest("#ledgerFilterPop") && !e.target.closest("#ledgerFilterBtn")){
pop.classList.add("hidden");
hideFilterScrim();
}
});

function renderIncomeRows(){
const tb=document.getElementById("incomeRows");
if(!tb)return;
const p=ledgerPeriod();
const rows=(invoices||[]).filter(i=>inPeriod(i.date,p)).sort((a,b)=>(a.date||"").localeCompare(b.date||""));
if(!rows.length){
tb.innerHTML=`<tr><td colspan="9" class="ledger-empty">Cap factura en aquest període. Genera factures des de la taula o afegeix-ne manualment.</td></tr>`;
}else{
tb.innerHTML=rows.map((inv,i)=>`
<tr${animateLedgerRows&&ledgerTab==="income"?` class="row-in" style="animation-delay:${Math.min(i,14)*22}ms"`:""}>
<td>${fmtDateLabel(inv.date)}</td>
<td class="lg-strong">${ledgerEsc(inv.number)}</td>
<td>${ledgerEsc(inv.clientName)}</td>
<td>${ledgerEsc(inv.clientNif)}</td>
<td class="num">${eur(inv.base)}</td>
<td class="num">${eur(inv.ivaAmount)}</td>
<td class="num">${inv.irpfAmount?"−"+eur(inv.irpfAmount):"—"}</td>
<td class="num lg-strong">${eur(inv.total)}</td>
<td><div class="lg-actions"><button class="lg-icon" onclick="editInvoiceRecord(${inv.id})" title="Editar">${LEDGER_ICONS.edit}</button><button class="lg-icon danger" onclick="deleteInvoiceRecord(${inv.id})" title="Eliminar">${LEDGER_ICONS.trash}</button></div></td>
</tr>`).join("");
}
const base=rows.reduce((a,i)=>a+(+i.base||0),0);
const iva=rows.reduce((a,i)=>a+(+i.ivaAmount||0),0);
const irpf=rows.reduce((a,i)=>a+(+i.irpfAmount||0),0);
const total=rows.reduce((a,i)=>a+(+i.total||0),0);
const s=document.getElementById("incomeSummary");
if(s)s.innerHTML=`<span>${rows.length} ${rows.length===1?"factura":"factures"}</span><span>Base <b>${eur(base)}</b></span><span>IVA <b>${eur(iva)}</b></span><span>IRPF <b>${eur(irpf)}</b></span><span>Total <b class="sum-num">${eur(total)}</b></span>`;
}

function renderExpenseRows(){
const tb=document.getElementById("expenseRows");
if(!tb)return;
const p=ledgerPeriod();
const rows=(expenses||[]).filter(e=>inPeriod(e.date,p)).sort((a,b)=>(a.date||"").localeCompare(b.date||""));
if(!rows.length){
tb.innerHTML=`<tr><td colspan="9" class="ledger-empty">Cap despesa en aquest període. Afegeix-ne amb el botó de dalt.</td></tr>`;
}else{
tb.innerHTML=rows.map((e,i)=>{
const ci=catInfo(e.category);
return `
<tr${animateLedgerRows&&ledgerTab==="expense"?` class="row-in" style="animation-delay:${Math.min(i,14)*22}ms"`:""}>
<td>${fmtDateLabel(e.date)}</td>
<td class="lg-strong">${ledgerEsc(e.supplier)}</td>
<td>${ledgerEsc(e.nif)}</td>
<td><span class="ledger-cat-dot" style="background:${ci.color}"></span>${ledgerEsc(ci.label)}</td>
<td class="num">${eur(e.base)}</td>
<td class="num">${e.ivaPct||0}%</td>
<td class="num">${eur(e.ivaAmount)}</td>
<td class="num lg-strong">${eur(e.total)}</td>
<td><div class="lg-actions"><button class="lg-icon" onclick="editExpense(${e.id})" title="Editar">${LEDGER_ICONS.edit}</button><button class="lg-icon danger" onclick="deleteExpense(${e.id})" title="Eliminar">${LEDGER_ICONS.trash}</button></div></td>
</tr>`;
}).join("");
}
const base=rows.reduce((a,e)=>a+(+e.base||0),0);
const iva=rows.reduce((a,e)=>a+(+e.ivaAmount||0),0);
const total=rows.reduce((a,e)=>a+(+e.total||0),0);
const s=document.getElementById("expenseSummary");
if(s)s.innerHTML=`<span>${rows.length} ${rows.length===1?"despesa":"despeses"}</span><span>Base <b>${eur(base)}</b></span><span>IVA <b>${eur(iva)}</b></span><span>Total <b class="sum-num">${eur(total)}</b></span>`;
}

/* ---- Modal despesa ---- */
let editingExpenseId=null;
function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}

function openExpenseModal(){
editingExpenseId=null;
populateExpenseCategorySelect();
document.getElementById("expenseModalTitle").innerText="Afegir despesa";
document.getElementById("expDate").value=todayISO();
document.getElementById("expNumber").value="";
document.getElementById("expSupplier").value="";
document.getElementById("expNif").value="";
document.getElementById("expCategory").selectedIndex=0;
document.getElementById("expBase").value="";
document.getElementById("expIva").value="21";
updateExpensePreview();
openModalEl("expenseModal");
}
function closeExpenseModal(){editingExpenseId=null;closeModalEl("expenseModal");}
function updateExpensePreview(){
const base=parseFloat(document.getElementById("expBase").value)||0;
const iva=parseFloat(document.getElementById("expIva").value)||0;
document.getElementById("expTotalView").value=eur(base+base*iva/100);
}
function saveExpense(){
const date=document.getElementById("expDate").value;
const base=parseFloat(document.getElementById("expBase").value);
if(!date||isNaN(base)){alert("Indica com a mínim la data i la base imposable.");return;}
const iva=parseFloat(document.getElementById("expIva").value)||0;
const data={
date,
number:document.getElementById("expNumber").value.trim(),
supplier:document.getElementById("expSupplier").value.trim(),
nif:document.getElementById("expNif").value.trim(),
category:document.getElementById("expCategory").value,
base:round2(base),
ivaPct:iva,
ivaAmount:round2(base*iva/100),
total:round2(base+base*iva/100)
};
if(editingExpenseId){
const e=expenses.find(x=>x.id===editingExpenseId);
if(e)Object.assign(e,data);
}else{
data.id=Date.now();
expenses.push(data);
}
saveLocal();
const _expEdit=!!editingExpenseId;
closeExpenseModal();
renderLedger();
showSnack(_expEdit?"Despesa actualitzada":"Despesa desada");
}
function editExpense(id){
const e=expenses.find(x=>x.id===id);
if(!e)return;
editingExpenseId=id;
populateExpenseCategorySelect();
document.getElementById("expenseModalTitle").innerText="Editar despesa";
document.getElementById("expDate").value=e.date||"";
document.getElementById("expNumber").value=e.number||"";
document.getElementById("expSupplier").value=e.supplier||"";
document.getElementById("expNif").value=e.nif||"";
document.getElementById("expCategory").value=e.category||EXPENSE_CATEGORIES[0].key;
document.getElementById("expBase").value=e.base!=null?e.base:"";
document.getElementById("expIva").value=e.ivaPct!=null?e.ivaPct:21;
updateExpensePreview();
openModalEl("expenseModal");
}
function deleteExpense(id){
if(!confirm("Eliminar aquesta despesa?"))return;
expenses=expenses.filter(x=>x.id!==id);
saveLocal();
renderLedger();
}

/* ---- Modal factura manual (ingressos) ---- */
let editingInvoiceId=null;
function openInvoiceRecordModal(){
editingInvoiceId=null;
document.getElementById("invoiceRecordTitle").innerText="Afegir factura";
document.getElementById("invRecDate").value=todayISO();
document.getElementById("invRecNumber").value=generateInvoiceNumber();
document.getElementById("invRecClient").value="";
document.getElementById("invRecNif").value="";
document.getElementById("invRecBase").value="";
document.getElementById("invRecIva").value="0";
document.getElementById("invRecIrpf").value="15";
updateInvoiceRecordPreview();
openModalEl("invoiceRecordModal");
}
function closeInvoiceRecordModal(){editingInvoiceId=null;closeModalEl("invoiceRecordModal");}
function updateInvoiceRecordPreview(){
const base=parseFloat(document.getElementById("invRecBase").value)||0;
const iva=parseFloat(document.getElementById("invRecIva").value)||0;
const irpf=parseFloat(document.getElementById("invRecIrpf").value)||0;
document.getElementById("invRecTotalView").value=eur(base+base*iva/100-base*irpf/100);
}
function saveInvoiceRecord(){
const date=document.getElementById("invRecDate").value;
const base=parseFloat(document.getElementById("invRecBase").value);
if(!date||isNaN(base)){alert("Indica com a mínim la data i la base.");return;}
const iva=parseFloat(document.getElementById("invRecIva").value)||0;
const irpf=parseFloat(document.getElementById("invRecIrpf").value)||0;
const data={
date,
number:document.getElementById("invRecNumber").value.trim(),
clientName:document.getElementById("invRecClient").value.trim(),
clientNif:document.getElementById("invRecNif").value.trim(),
base:round2(base),
ivaPct:iva,
ivaAmount:round2(base*iva/100),
irpfPct:irpf,
irpfAmount:round2(base*irpf/100),
total:round2(base+base*iva/100-base*irpf/100)
};
if(editingInvoiceId){
const inv=invoices.find(x=>x.id===editingInvoiceId);
if(inv)Object.assign(inv,data);
}else{
data.id=Date.now();
invoices.push(data);
}
saveLocal();
const _invEdit=!!editingInvoiceId;
closeInvoiceRecordModal();
renderLedger();
showSnack(_invEdit?"Factura actualitzada":"Factura desada");
}
function editInvoiceRecord(id){
const inv=invoices.find(x=>x.id===id);
if(!inv)return;
editingInvoiceId=id;
document.getElementById("invoiceRecordTitle").innerText="Editar factura";
document.getElementById("invRecDate").value=inv.date||"";
document.getElementById("invRecNumber").value=inv.number||"";
document.getElementById("invRecClient").value=inv.clientName||"";
document.getElementById("invRecNif").value=inv.clientNif||"";
document.getElementById("invRecBase").value=inv.base!=null?inv.base:"";
document.getElementById("invRecIva").value=inv.ivaPct!=null?inv.ivaPct:0;
document.getElementById("invRecIrpf").value=inv.irpfPct!=null?inv.irpfPct:0;
updateInvoiceRecordPreview();
openModalEl("invoiceRecordModal");
}
function deleteInvoiceRecord(id){
if(!confirm("Eliminar aquesta factura del registre?"))return;
invoices=invoices.filter(x=>x.id!==id);
saveLocal();
renderLedger();
}

/* ---- Exportació XLSX (llibre del gestor) ---- */
function colLetter(i){let s="";i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26);}return s;}
function xmlEsc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

function sheetXML(rows){
// rows: array of arrays; each cell is null | {n:number} | {t:string} | {h:string}(header)
let body="";
rows.forEach((row,ri)=>{
let cells="";
row.forEach((cell,ci)=>{
if(cell==null)return;
const ref=colLetter(ci)+(ri+1);
if(cell.h!=null){
cells+=`<c r="${ref}" s="1" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(cell.h)}</t></is></c>`;
}else if(cell.n!=null&&cell.n!==""){
cells+=`<c r="${ref}"><v>${Number(cell.n)}</v></c>`;
}else if(cell.t!=null&&cell.t!==""){
cells+=`<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(cell.t)}</t></is></c>`;
}
});
body+=`<row r="${ri+1}">${cells}</row>`;
});
return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${body}</sheetData></worksheet>`;
}

function crc32(bytes){
let c=~0>>>0;
for(let i=0;i<bytes.length;i++){
c^=bytes[i];
for(let k=0;k<8;k++)c=(c>>>1)^(0xEDB88320&-(c&1));
}
return (~c)>>>0;
}
function zipStore(files){
const enc=new TextEncoder();
const parts=[];const central=[];let offset=0;
files.forEach(f=>{
const nameBytes=enc.encode(f.name);
const data=typeof f.data==="string"?enc.encode(f.data):f.data;
const crc=crc32(data);const size=data.length;
const lh=new DataView(new ArrayBuffer(30));
lh.setUint32(0,0x04034b50,true);lh.setUint16(4,20,true);lh.setUint16(6,0,true);lh.setUint16(8,0,true);
lh.setUint16(10,0,true);lh.setUint16(12,0x21,true);lh.setUint32(14,crc,true);lh.setUint32(18,size,true);
lh.setUint32(22,size,true);lh.setUint16(26,nameBytes.length,true);lh.setUint16(28,0,true);
parts.push(new Uint8Array(lh.buffer),nameBytes,data);
const ch=new DataView(new ArrayBuffer(46));
ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint16(8,0,true);
ch.setUint16(10,0,true);ch.setUint16(12,0,true);ch.setUint16(14,0x21,true);ch.setUint32(16,crc,true);
ch.setUint32(20,size,true);ch.setUint32(24,size,true);ch.setUint16(28,nameBytes.length,true);
ch.setUint32(42,offset,true);
central.push({rec:new Uint8Array(ch.buffer),name:nameBytes});
offset+=30+nameBytes.length+size;
});
const cdStart=offset;const cdParts=[];
central.forEach(c=>{cdParts.push(c.rec,c.name);offset+=46+c.name.length;});
const cdSize=offset-cdStart;
const eocd=new DataView(new ArrayBuffer(22));
eocd.setUint32(0,0x06054b50,true);eocd.setUint16(8,files.length,true);eocd.setUint16(10,files.length,true);
eocd.setUint32(12,cdSize,true);eocd.setUint32(16,cdStart,true);
return new Blob([...parts,...cdParts,new Uint8Array(eocd.buffer)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}

function exportLedgerXLSX(){
const p=ledgerPeriod();
const inRows=(invoices||[]).filter(i=>inPeriod(i.date,p)).sort((a,b)=>(a.date||"").localeCompare(b.date||""));
const exRows=(expenses||[]).filter(e=>inPeriod(e.date,p)).sort((a,b)=>(a.date||"").localeCompare(b.date||""));

// --- FULL INGRESSOS (income) ---
const incHead=["ANY","TRIMESTRE","MES","DATA FACTURA","Nº FACTURA","CIF / NIF","COGNOMS I NOM O RAÓ SOCIAL","BASE IMPOSABLE EUROS","QUOTA IVA","QUOTA RETENCIÓ IRPF","TOTAL FACTURA"];
const incSheet=[incHead.map(h=>({h}))];
inRows.forEach(inv=>{
const parts=(inv.date||"").split("-");
incSheet.push([
{n:Number(parts[0])||""},
{n:quarterOf(inv.date)},
{n:Number(parts[1])||""},
{t:fmtDateLabel(inv.date)},
{t:inv.number||""},
{t:inv.clientNif||""},
{t:inv.clientName||""},
{n:round2(inv.base)},
{n:round2(inv.ivaAmount)},
{n:round2(inv.irpfAmount)},
{n:round2(inv.total)}
]);
});

// --- FULL DESPESES (expenses) ---
const expHead=["ANY","TRIMESTRE","MES","DATA FACTURA","Nº FACTURA","CIF / NIF","COGNOMS I NOM O RAÓ SOCIAL"]
.concat(EXPENSE_CATEGORIES.map(c=>c.label))
.concat(["BASE IMPOSABLE","% IVA","QUOTA IVA SUPORTAT","TOTAL FACTURA"]);
const expSheet=[expHead.map(h=>({h}))];
exRows.forEach(e=>{
const parts=(e.date||"").split("-");
const row=[
{n:Number(parts[0])||""},
{n:quarterOf(e.date)},
{n:Number(parts[1])||""},
{t:fmtDateLabel(e.date)},
{t:e.number||""},
{t:e.nif||""},
{t:e.supplier||""}
];
EXPENSE_CATEGORIES.forEach(c=>{row.push(c.key===e.category?{n:round2(e.base)}:null);});
row.push({n:round2(e.base)},{n:e.ivaPct||0},{n:round2(e.ivaAmount)},{n:round2(e.total)});
expSheet.push(row);
});

const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;
const rootRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
const workbook=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="FULL INGRESSOS" sheetId="1" r:id="rId1"/><sheet name="FULL DESPESES" sheetId="2" r:id="rId2"/></sheets></workbook>`;
const wbRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs></styleSheet>`;

const files=[
{name:"[Content_Types].xml",data:contentTypes},
{name:"_rels/.rels",data:rootRels},
{name:"xl/workbook.xml",data:workbook},
{name:"xl/_rels/workbook.xml.rels",data:wbRels},
{name:"xl/styles.xml",data:styles},
{name:"xl/worksheets/sheet1.xml",data:sheetXML(incSheet)},
{name:"xl/worksheets/sheet2.xml",data:sheetXML(expSheet)}
];
const blob=zipStore(files);
const yr=p.year||new Date().getFullYear();
const qLabel=p.quarter?`_T${p.quarter}`:"";
const a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=`Llibre registre ${yr}${qLabel}.xlsx`;
a.click();
setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}

/* ===== Init ===== */

window.bootApp=function(){
if(window.__booted)return;
window.__booted=true;

loadLocal();
normalizeData();

renderAll();
renderIssuers();
setView("table");
setupRowSelection();

dirty=false;
};

/* Close any modal by clicking its backdrop (outside the content) */
(function bindModalBackdrop(){
const closers={
backupModal:closeBackupModal,
importModal:closeImportModal,
monthPickerModal:closeMonthPicker,
dayModal:closeDayModal,
invoiceModal:closeInvoiceModal,
courseModal:closeCourseModal,
clientModal:closeClientModal,
issuerModal:closeIssuerModal,
classModal:closeClassModal,
expenseModal:closeExpenseModal,
invoiceRecordModal:closeInvoiceRecordModal
};
document.querySelectorAll(".modal").forEach(m=>{
// guard: only close if the press STARTED on the backdrop, so a
// drag/selection that ends on the backdrop doesn't dismiss the modal
m.addEventListener("mousedown",e=>{
m.dataset.downOutside=(e.target===m)?"1":"";
});
m.addEventListener("click",e=>{
if(e.target===m && m.dataset.downOutside==="1"){
const fn=closers[m.id];
if(fn){fn();}else{m.style.display="none";}
}
m.dataset.downOutside="";
});
// Full de baix en mòbil: tancar arrossegant cap avall
const content=m.querySelector(".modal-content");
if(content)attachModalDrag(m,content,()=>{
const fn=closers[m.id];
if(fn){fn();}else{closeModalEl(m.id);}
});
});
})();

function attachModalDrag(m,content,closeFn){
let startY=0,dy=0,dragging=false;
content.addEventListener("touchstart",e=>{
if(!isMobileView())return;
if(content.scrollTop>0)return; // primer scroll intern
startY=e.touches[0].clientY;dy=0;dragging=true;
content.style.transition="none";
},{passive:true});
content.addEventListener("touchmove",e=>{
if(!dragging)return;
dy=e.touches[0].clientY-startY;
if(dy<=0){content.style.transform="translateY(0)";return;}
if(content.scrollTop>0){dragging=false;content.style.transform="translateY(0)";return;}
content.style.transform="translateY("+dy+"px)";
if(e.cancelable)e.preventDefault();
},{passive:false});
const end=()=>{
if(!dragging)return;
dragging=false;
if(dy>120){
// deixa que l'animació normal de tancament (llisca avall) prengui el relleu
content.style.transition="";
content.style.transform="";
closeFn();
}else{
content.style.transition="transform .28s cubic-bezier(0.22,1,0.36,1)";
content.style.transform="translateY(0)";
setTimeout(()=>{content.style.transition="";content.style.transform="";},300);
}
};
content.addEventListener("touchend",end);
content.addEventListener("touchcancel",end);
}
