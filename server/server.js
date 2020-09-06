const express = require('express')
// this should commented out when production
import devBundle from './devBundle' 
import template from './../template'
import { MongoClient } from "mongodb";

const CURRENT_WORKING_DIRECTORY = process.cwd()
const app = express()
// this should commented out when production
devBundle.compile(app)

// Database
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/FarDeanMERN'
MongoClient.connect(DB_URI,(err,db)=>{
    console.log('Connected to MongoDB')
    db.close()
})

app.use('/dist',express.static(CURRENT_WORKING_DIRECTORY + '/dist'))

app.get('/',(req,res)=>{
    res.status(200).send(template())
})

let PORT = process.env.PORT || 3000
app.listen(PORT,(err)=>{
    if(err){
        console.error(err)
    }
    console.info(`Server Started on port ${PORT}`)
})