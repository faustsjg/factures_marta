let currentView="table";

let currentDate=new Date();

let classes=[];

let issuers=[];

let courses=[];

let clients=[];

let selectedClasses=[];

let searchTerm="";

let openModuleCourses=new Set();

let dirty=false;

const STORAGE_KEY="facturesMartaData";

const DEFAULT_ISSUER={
id:1,
isDefault:true,
name:"Marta San José Gispert",
nif:"45933185T",
address:"Canal del Estret, 5",
postalCode:"08230",
city:"Matadepera",
phone:"+34 629329341",
email:"martasanjoseg@gmail.com",
iban:"ES6600810016120003035216",
swift:"BSABESBBXXX",
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
localStorage.setItem(STORAGE_KEY,JSON.stringify({classes,courses,clients,issuers}));
}catch(e){}
if(typeof window.cloudSave==="function" && !window.__suspendCloudSave){
window.cloudSave({classes,courses,clients,issuers});
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
normalizeData();
if(typeof renderAll==="function"){renderAll();}
if(typeof renderIssuers==="function"){renderIssuers();}
window.__suspendCloudSave=false;
dirty=false;
};

window.getAppData=function(){
return {classes,courses,clients,issuers};
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
 issuers
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
window.addEventListener("resize",()=>{positionNavPill();positionSubnavPill();});

function setView(view){

const prevView=currentView;
currentView=view;

document.body.dataset.view=view;

const configViews=["courses","clients","issuers"];
const isConfig=configViews.includes(view);

document.getElementById("nav-table").classList.toggle("active",view==="table");
document.getElementById("nav-calendar").classList.toggle("active",view==="calendar");
document.getElementById("nav-settings").classList.toggle("active",isConfig);
positionNavPill();

const dataCard=document.getElementById("dataCard");
const configView=document.getElementById("configView");
const tableControls=document.getElementById("tableControls");
const calendarControls=document.getElementById("calendarControls");
const tableView=document.getElementById("tableView");
const calendarView=document.getElementById("calendarView");

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

if(view==="table"){
tableView.classList.remove("hidden");
calendarView.classList.add("hidden");
tableControls.classList.remove("hidden");
tableControls.style.display="flex";
calendarControls.classList.add("hidden");
document.getElementById("dataCard").classList.remove("cal-mode");
document.getElementById("todayBtn").classList.add("hidden");
document.getElementById("invoiceBtn").classList.remove("hidden");
document.getElementById("totalWrap").classList.remove("hidden");
animateClassRows=true;
renderClasses();
}else{
tableView.classList.add("hidden");
calendarView.classList.remove("hidden");
tableControls.classList.remove("hidden");
tableControls.style.display="flex";
calendarControls.classList.remove("hidden");
document.getElementById("dataCard").classList.add("cal-mode");
document.getElementById("todayBtn").classList.remove("hidden");
document.getElementById("invoiceBtn").classList.add("hidden");
document.getElementById("totalWrap").classList.add("hidden");
renderCalendar();
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

function hintPopup(view){
const popup=document.getElementById("popup-"+view);
if(!popup)return;
setTimeout(()=>{
popup.classList.add("open");
setTimeout(()=>popup.classList.remove("open"),2000);
},100);
}

function togglePopup(view){
const popup=document.getElementById("popup-"+view);
if(!popup)return;
const isOpen=popup.classList.contains("open");
closeAllPopups();
if(!isOpen)popup.classList.add("open");
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

function openInvoiceFromNav(){
closeAllPopups();
openInvoiceModal();
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
const btn=document.getElementById("importConfirmBtn");
if(btn)btn.disabled=true;
openModalEl("importModal");
}

function closeImportModal(){
closeModalEl("importModal");
}

function parseImportDates(raw){
// "20-21-27/04/2026" or "25-26/03, 22-23-27/04/2026"
const out=[];
const groups=raw.split(",").map(s=>s.trim()).filter(Boolean);
// find a fallback year from any group
let fallbackYear=null;
groups.forEach(g=>{
const m=g.match(/\/(\d{4})\s*$/);
if(m)fallbackYear=m[1];
});
if(!fallbackYear)fallbackYear=String(new Date().getFullYear());

groups.forEach(g=>{
// split into day-part / month / [year]
const parts=g.split("/").map(s=>s.trim());
if(parts.length<2)return;
const dayPart=parts[0];
const month=parts[1].padStart(2,"0");
const year=(parts[2]||fallbackYear).trim();
dayPart.split("-").forEach(d=>{
d=d.trim();
if(!d)return;
const dd=d.padStart(2,"0");
out.push(`${year}-${month}-${dd}`);
});
});
return out;
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

const pushMod=()=>{
if(cur&&curMod&&curMod.dates.length){
cur.modules.push(curMod);
}
curMod=null;
};

for(const line of lines){
if(!line)continue;

// New course
const imp=line.match(/^Impartici[óo]\s+(.*)$/i);
if(imp){
pushMod();
cur={name:cleanCourseName(line),price:null,modules:[]};
parsedCourses.push(cur);
continue;
}
if(!cur)continue;

// Price
const price=line.match(/Preu\s*hora\s*:\s*([\d.,]+)/i);
if(price){
cur.price=parseFloat(price[1].replace(",","."));
continue;
}

// Module start: MFxxxx ...
const mf=line.match(/^(MF\d[\w_]*\s*\d*)\s*[:\-]?\s*(.+)?$/i);
if(mf&&/^MF\d/i.test(line)){
pushMod();
curMod={name:line.replace(/\s+/g," ").trim(),dates:[],hours:null,start:null,end:null};
continue;
}

// Dates
const dates=line.match(/Dates?\s*impartici[óo]\s*:\s*(.+)$/i);
if(dates&&curMod){
curMod.dates=parseImportDates(dates[1]);
continue;
}

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
document.getElementById("importConfirmBtn").disabled=true;
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

const btn=document.getElementById("importConfirmBtn");
btn.disabled=(totalClasses===0);
btn.textContent=`Importar (${totalClasses} ${totalClasses===1?"classe":"classes"})`;
}

function confirmImport(){
if(!importParsed||!importParsed.length)return;

let colorIdx=courses.length;

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
});
});
});

importParsed=null;
closeImportModal();
renderAll();
renderCourses();
renderIssuers();
alert("Dades importades correctament.");
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

document.getElementById("calendarTitle").innerText=
MONTH_NAMES[month]+" "+year;

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
${item.course}${item.module?`<br><span class="ci-mod">${item.module}</span>`:""}<br>
${item.hours}h
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

function toggleSearch(){
searchOpen=!searchOpen;
const row=document.getElementById("searchRow");
if(row)row.classList.toggle("hidden",!searchOpen);
document.querySelectorAll(".tool-search").forEach(b=>b.classList.toggle("active",searchOpen));
if(searchOpen){
const inp=document.getElementById("searchInput");
if(inp)setTimeout(()=>inp.focus(),60);
}else{
clearSearch();
}
}

function setSearch(v){
searchTerm=(v||"").trim().toLowerCase();
const inp=document.getElementById("searchInput");
if(inp && inp.value!==v)inp.value=v;
const clr=document.getElementById("searchClear");
if(clr)clr.classList.toggle("hidden",!searchTerm);
applyFilters();
}

function clearSearch(){
const inp=document.getElementById("searchInput");
if(inp)inp.value="";
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

function toggleFilter(btn){
const pop=document.getElementById("filterPopup");
if(!pop)return;
if(!pop.classList.contains("hidden")){
pop.classList.add("hidden");
return;
}
renderFilters();
const r=btn.getBoundingClientRect();
pop.style.top=(r.bottom+8)+"px";
pop.style.right=Math.max(12,(window.innerWidth-r.right))+"px";
pop.classList.remove("hidden");
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
}
});

/* ===== Total ===== */

function updateTotal(){

const src=filtersActive()?classes.filter(classMatches):classes;

const total=src.reduce((acc,item)=>{

return acc+(item.hours*item.price);

},0);

document.getElementById("totalAmount").innerText=
total.toFixed(2);

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

closeClassModal();

renderAll();

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
<div class="course-name">${course.name}</div>
<div class="small">${course.price} €/h</div>
</div>

<button class="module-toggle ${openModuleCourses.has(course.id)?"open":""}" id="moduleToggle-${course.id}" onclick="toggleModules(${course.id})">
Mòduls${(course.modules&&course.modules.length)?` · ${course.modules.length}`:""}
<svg class="module-chevron" width="16" height="16" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l5 5 5-5"></path></svg>
</button>

<div class="course-actions">
<button class="btn gray" onclick="openEditCourseModal(${course.id})">${ICONS.edit}</button>
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

<div style="font-weight:700;">
${client.name}
</div>

</div>

<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">

<button
class="btn gray"
onclick="openEditClientModal(${index})"
>
${ICONS.edit}
</button>

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

const now=new Date();

const yyyy=now.getFullYear();

const mm=String(now.getMonth()+1).padStart(2,"0");

const dd=String(now.getDate()).padStart(2,"0");

const hh=String(now.getHours()).padStart(2,"0");

const mi=String(now.getMinutes()).padStart(2,"0");

return `${yyyy}${mm}${dd}${hh}${mi}`;

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

doc.save(`factura_${invoiceNumber}.pdf`);

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
<strong>${issuer.name}</strong>
${issuer.nif?`<span class="issuer-nif">${issuer.nif}</span>`:""}
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
class="btn gray"
onclick="editIssuer(${issuer.id})"
>
${ICONS.edit}
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
classModal:closeClassModal
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
});
})();
