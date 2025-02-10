import mongoose from 'mongoose';
const { Schema } = mongoose;

const menuSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    ingredients:{
        type:String,
        required:true,
    },
    keyword:[{
        type:String,
        required:true,
    }],
    category:{
        type: 'ObjectId', 
        ref: 'MenuCategory',
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        path:String,
        url:{type:String, default:'noImage.jpg'}
    },
    available:{
        type:Boolean,
        default:true
    }
        
    
})

export default Menu = mongoose.model('Menu',menuSchema);