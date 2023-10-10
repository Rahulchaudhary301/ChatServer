const express=require('express')
const app=express()
const cors=require('cors')
const route=require('./Router/route')
//const page=require('./socket')


app.use(cors())
app.use(express.json())
app.use('/',route)


const soctetIo=require('socket.io')

const io=soctetIo(5000,{
    cors:{
        origin:"https://chatappss.netlify.app"
    }
})


const users=[{}];
let mess=[]

let x=0

io.on('connection',(socket)=>{
    x++
   // console.log('A user Connected'+" "+x)
    
    socket.on('clear',()=>{
        mess=[]
        mess.push({mess: "claer !!!!"})
         io.emit('ress',mess)
    })

    socket.on('join',(data)=>{
           users[socket.id]=data
           socket.broadcast.emit('Joinn',`${users[socket.id]} join !!!`)
          // socket.emit('own',{id:socket.id ,mess:`Admin : Welcome to Caht ${users[socket.id]}`} )
       })

   socket.on('mess',(data)=>{
    let d={
        id:socket.id,
        mess:data
    }
    mess.push(d)

    io.emit('rec',mess)
    socket.emit('ownMessage',mess)
   
   })





    socket.on('disconnect',()=>{
        x--
      //  console.log('A user DisConnected'+" "+x)
        socket.broadcast.emit('Joinn',`${users[socket.id]} disConnect !!!`)
       // socket.broadcast.emit('new','Existance user disconnected !!!!')
       
        
    })
})





module.exports=io


app.listen(8000,()=>{
    console.log('App is running on 8000 PORT')
})