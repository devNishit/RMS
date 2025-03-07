import mongoose from 'mongoose';
const { Schema } = mongoose;

const menuSchema = new Schema({
    item:{
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
        // type: 'ObjectId', 
        // ref: 'MenuCategory',
        type:"String",
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        public_id:String,
        url:{type:String, default:'noImage.jpg'}
    },
    available:{
        type:Boolean,
        default:true
    }
        
    
})

const Menu = mongoose.model('Menu',menuSchema);
export default Menu;