const express=require('express')
const app=express()
const cors=require('cors')
const route=require('./Router/route')
const page=require('./socket')


app.use(cors())
app.use(express.json())
app.use('/',route)


app.listen(8000,()=>{
    console.log('App is running on 8000 PORT')
})