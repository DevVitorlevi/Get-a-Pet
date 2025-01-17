const mongoose = require('mongoose')
const {Schema} = mongoose

const Pet = mongoose.model('Pet', new Schema({
    nome:{
        type:String,require:true
    },
    age:{
        type:Number,
        require:true
    },
    peso:{
        type:Number,
        require:true
    },
    cor:{
        type:String,
        require:true
    },

    image:{
        type:Array,
        require:true
    },
    disponivel:{
        type:Boolean,
        required:true
    },
    user:Object,
    adotador:Object
    


},
    {timestamps:true}))
module.exports = Pet