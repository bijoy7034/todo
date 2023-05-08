const { default: mongoose } = require('mongoose')
const userModel = require('../model/model')

const createList = async(req,res)=>{
    const {title,details} = req.body
    try{
        const todo = await userModel.create({title,details})
        res.status(200).json(todo)
    }catch(err){
        res.status(400).json({error:err})
    }

}

const getList = async(req,res)=>{
    const todo = await userModel.find({}).sort({createdAt: -1})
    if(!todo){
        res.status(400).json({mssg:"Empty"})
    }
    res.status(200).json(todo)
}


const deleteList = async(req,res)=>{
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg :"No record found"})
    }
    const todo = await userModel.findOneAndDelete({_id:id})

    if(!todo){
         res.status(404).json({mssg :"No record found"})
    }
    res.status(200).json(todo)
}

const updateTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg :"No record found"})
    }
    const todo = await userModel.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!todo){
        res.status(404).json({mssg :"No record found"})
    }
    res.status(200).json(todo)
}

const getListPending = async(req,res)=>{
    const todo = await userModel.find({marked:'Task Pending'}).sort({createdAt: -1})
    if(!todo){
        res.status(400).json({mssg:"Empty"})
    }
    res.status(200).json(todo)
}
const getListCompleted = async(req,res)=>{
    const todo = await userModel.find({marked:'Task Completed'}).sort({createdAt: -1})
    if(!todo){
        res.status(400).json({mssg:"Empty"})
    }
    res.status(200).json(todo)
}
const deleteAll = async(req,res)=>{
    const todo = await userModel.deleteMany({})
    if(!todo){
        res.status(400).json({mssg:"Not Deleted"})
    }
    res.status(200).json(todo)
}
module.exports ={
    createList,
    getList,
    deleteList,
    updateTask,
    getListPending,
    getListCompleted,
    deleteAll
}