require("dotenv").config()
const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const cors=require("cors")

const webhook=require("./routes/webhook")
const messages=require("./routes/messages")
const contacts=require("./routes/contacts")
const campaigns=require("./routes/campaigns")
const templates=require("./routes/templates")

mongoose.connect(process.env.MONGO_URL)

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

app.use("/webhook",webhook)
app.use("/messages",messages)
app.use("/contacts",contacts)
app.use("/campaigns",campaigns)
app.use("/templates",templates)

app.listen(process.env.PORT||3000,()=>{
console.log("Ultimate WhatsApp SaaS CRM running")
})