const Balance=document.querySelector('#Balance');
const transaction=document.querySelector('.transaction');
const incDescription=document.querySelector('.inc-des');
const incAmount=document.querySelector('.inc-amt');
const expDescription=document.querySelector('.exp-des');
const expAmount=document.querySelector('.exp-amt');
const income=document.querySelector('#income');
const expense=document.querySelector('#expense');
const form=document.querySelector('#form')
const description=document.querySelector('#description')
const Amount=document.querySelector('#Amount')


const local=JSON.parse(localStorage.getItem('trans'));
let list=localStorage.getItem('trans')!==null?local:[];
function loadTransaction(list){
const div=document.createElement('div');
div.classList.add(list.amount>0?"green":"red")
div.innerHTML=`<p class="inc-des">${list.description}</p>
<p class="inc-amt">${list.amount}</p>
<button class="close" onclick="remove(${list.id})">x</button>`
transaction.append(div)
}

function remove(li){
  if(confirm("are you sure to delete")){
    list=list.filter(l=>l.id != li);
    config();
    updateLocalStorage()
  }
  

}
function displayBalance(){
const balAmt=list.map(l=>l.amount);
Balance.innerHTML=balAmt.reduce((acc,ind)=>(acc += ind),0).toFixed(2);
income.innerHTML=list.filter(lis=>lis.amount>0).map(l=>l.amount).reduce((acc,ind)=>(acc +=ind)).toFixed(2)
expense.innerHTML=list.filter(lis=>lis.amount<0).map(l=>l.amount).reduce((acc,ind)=>(acc +=ind)).toFixed(2)

}
function config(){
  transaction.innerHTML='';
  list.forEach(loadTransaction);
  displayBalance()
}
form.addEventListener('submit',addTransaction)

function addTransaction(e){
  e.preventDefault()
if(description.value==''||Amount.value==''){
  alert('please enter a value')
} else{
 let arr={ id:Math.floor(Math.random()*100000),description:description.value,amount: +Amount.value}
list.push(arr);
config();
updateLocalStorage()
}

}
window.addEventListener('load',function (){
  config();
    
})


function updateLocalStorage(){
 return localStorage.setItem('trans',JSON.stringify(list))
}