// load saved documents
let docs = JSON.parse(localStorage.getItem("budgetDocs")) || {};
let currentDoc = null;


// create 31 rows in the table
const table = document.getElementById("budgetTable");

for (let i = 1; i <= 31; i++) {

let row = table.insertRow();

row.innerHTML = `
<td class="day">${i}</td>
<td><input class="essential" oninput="calculate()"></td>
<td><input class="nonessential" oninput="calculate()"></td>
<td><input class="savings" oninput="calculate()"></td>
`;

}


// load documents in dashboard
function loadDocs(){

let list = document.getElementById("docList");
list.innerHTML = "";

for(let key in docs){

let li = document.createElement("li");

li.innerHTML = `<button onclick="openDoc('${key}')">${key}</button>`;

list.appendChild(li);

}

}

loadDocs();


// create a new monthly document
function createDoc(){

let name = prompt("Enter month (example: March 2026)");

if(!name) return;

docs[name] = {};
saveDocs();
loadDocs();

}


// open selected document
function openDoc(name){

currentDoc = name;

document.getElementById("dashboard").style.display = "none";
document.getElementById("editor").style.display = "block";

document.getElementById("docTitle").innerText = name;

loadData();

}


// go back to dashboard
function back(){

saveData();

document.getElementById("editor").style.display = "none";
document.getElementById("dashboard").style.display = "block";

}


// calculate total spending
function calculate(){

let total = 0;

document.querySelectorAll("#budgetTable input").forEach(input => {

total += Number(input.value) || 0;

});

document.getElementById("total").innerText =
total.toLocaleString("id-ID");

let income = Number(document.getElementById("income").value) || 0;

let status = document.getElementById("status");

if(total > income){

status.innerText = "⚠ Over Budget";
status.style.color = "red";

}else{

status.innerText = "✔ Under Budget";
status.style.color = "green";

}

saveData();

}


// save document list
function saveDocs(){

localStorage.setItem("budgetDocs", JSON.stringify(docs));

}


// save current document data
function saveData(){

if(!currentDoc) return;

let data = {
income: document.getElementById("income").value,
inputs: []
};

document.querySelectorAll("#budgetTable input").forEach(i => {
data.inputs.push(i.value);
});

docs[currentDoc] = data;

saveDocs();

}


// load saved document data
function loadData(){

let data = docs[currentDoc];

if(!data) return;

document.getElementById("income").value = data.income || "";

let inputs = document.querySelectorAll("#budgetTable input");

inputs.forEach((input, i) => {
input.value = data.inputs ? data.inputs[i] : "";
});

calculate();

}
