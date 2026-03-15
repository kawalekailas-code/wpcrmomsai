const mongoose=require("mongoose")

module.exports=mongoose.model("Message",{
phone:String,
text:String,
direction:String,
time:{type:Date,default:Date.now}
})