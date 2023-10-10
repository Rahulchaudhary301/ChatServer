const express=require('express')
const router=express.Router()




router.get('/',(req,res)=>{
    res.send({status:true,msg:"i Am Ready"})
})






module.exports=router