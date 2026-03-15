const router=require("express").Router()
const Contact=require("../models/Contact")

router.get("/",async(req,res)=>{

let data=await Contact.find()
res.send(data)

})

router.post("/",async(req,res)=>{

let {name,phone}=req.body
await Contact.create({name,phone})

res.send({status:"saved"})

})

module.exports=router