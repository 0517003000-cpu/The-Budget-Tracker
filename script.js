// create 31 rows
const table = document.getElementById("budgetTable");

for(let i=1;i<=31;i++){

let row = table.insertRow();

row.innerHTML = `
<td>${i}</td>
<td><input class="essential" oninput="calculate()"></td>
<td><input class="nonessential" oninput="calculate()"></td>
<td><input class="savings" oninput="calculate()"></td>
`;

}


// main calculation
function calculate(){

let income = Number(document.getElementById("income").value) || 0;


// 50 30 20 rule
let essentialBudget = income * 0.5;
let nonessentialBudget = income * 0.3;
let savingsBudget = income * 0.2;


// show available funds
document.getElementById("essentialBudget").innerText =
essentialBudget.toLocaleString("id-ID");

document.getElementById("nonessentialBudget").innerText =
nonessentialBudget.toLocaleString("id-ID");

document.getElementById("savingsBudget").innerText =
savingsBudget.toLocaleString("id-ID");


// calculate spending
let essentialTotal = 0;
let nonessentialTotal = 0;
let savingsTotal = 0;


document.querySelectorAll(".essential").forEach(e=>{
essentialTotal += Number(e.value)||0;
});

document.querySelectorAll(".nonessential").forEach(e=>{
nonessentialTotal += Number(e.value)||0;
});

document.querySelectorAll(".savings").forEach(e=>{
savingsTotal += Number(e.value)||0;
});


// display totals
document.getElementById("essentialTotal").innerText =
essentialTotal.toLocaleString("id-ID");

document.getElementById("nonessentialTotal").innerText =
nonessentialTotal.toLocaleString("id-ID");

document.getElementById("savingsTotal").innerText =
savingsTotal.toLocaleString("id-ID");


// over under budget
updateStatus("essential", essentialTotal, essentialBudget);
updateStatus("nonessential", nonessentialTotal, nonessentialBudget);
updateStatus("savings", savingsTotal, savingsBudget);

}


function updateStatus(type,total,budget){

let status = document.getElementById(type+"Status");

if(total > budget){

status.innerText = "Over Budget";
status.style.color = "red";

}else{

status.innerText = "Under Budget";
status.style.color = "green";

}

}
