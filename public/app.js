let currentPhone=""

async function loadContacts(){

let res=await fetch("/contacts")
let data=await res.json()

let box=document.getElementById("contacts")
box.innerHTML=""

data.forEach(c=>{

let div=document.createElement("div")
div.innerText=c.name+" "+c.phone
div.onclick=()=>openChat(c.phone)

box.appendChild(div)

})

}

async function addContact(){

let name=document.getElementById("name").value
let phone=document.getElementById("phone").value

await fetch("/contacts",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,phone})
})

loadContacts()

}

async function openChat(phone){

currentPhone=phone

let res=await fetch("/messages/"+phone)
let msgs=await res.json()

let chat=document.getElementById("chat")
chat.innerHTML=""

msgs.forEach(m=>{
chat.innerHTML+=`<p>${m.direction}: ${m.text}</p>`
})

}

async function send(){

let text=document.getElementById("msg").value

await fetch("/messages/send",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({phone:currentPhone,text})
})

openChat(currentPhone)

}

async function loadTemplates(){

let res=await fetch("/templates")
let data=await res.json()

let div=document.getElementById("templates")
div.innerHTML=""

data.data?.forEach(t=>{

let el=document.createElement("div")
el.innerText=t.name

div.appendChild(el)

})

}

async function campaign(){

let template=document.getElementById("templateName").value

await fetch("/campaigns/bulk",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({template})
})

alert("Campaign Sent")

}

loadContacts()