const express = require('express');
const router = require('./routes/todoRoutes');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const uri = "mongodb+srv://bijoyanil74:m8LEHXdB3CcOSnfc@cluster0.hh1jxj4.mongodb.net/?retryWrites=true&w=majority";
const app = express()
require('dotenv').config

const PORT = process.env.PORT || 8080

//Middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.get('/', (req,res)=>{
  res.setHeader("Access-Control-Allow-Credentials","true")
})
app.use('/api/todo', router)


//Database connection
mongoose.connect(uri)
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`SREVER RUNNING ON POST ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
