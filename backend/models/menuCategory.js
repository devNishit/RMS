import mongoose from 'mongoose';
const { Schema } = mongoose;

const menuCategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
})

export default MenuCategory = mongoose.model('MenuCategory',menuCategorySchema);