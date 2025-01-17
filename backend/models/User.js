const mongoose = require('mongoose')
const {Schema} = mongoose

const User = mongoose.model('User', new Schema({
    nome:{
        type:String,require:true
    },
    email:{
        type:String,require:true
    },
    image:{
        type:String
    },
    telefone:{
        type:String,
        require:true
    },
    senha:{
        type:Number,require:true
    },

},
    {timestamps:true}))

    module.exports = User