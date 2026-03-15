const router=require("express").Router()
const axios=require("axios")
const Contact=require("../models/Contact")

router.post("/bulk",async(req,res)=>{

let {template}=req.body

let contacts=await Contact.find()

for(let c of contacts){

await axios.post(
`https://graph.facebook.com/v19.0/${process.env.PHONE_ID}/messages`,
{
messaging_product:"whatsapp",
to:c.phone,
type:"template",
template:{
name:template,
language:{code:"en_US"}
}
},
{
headers:{Authorization:`Bearer ${process.env.TOKEN}`}
}
)

await new Promise(r=>setTimeout(r,800))

}

res.send({status:"campaign_sent"})

})

module.exports=router