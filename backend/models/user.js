import mongoose from 'mongoose';
import passportLocalMomgoose from 'passport-local-mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },

    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'customer'
    },
    mobile: String,
    address: String,
    joiningDate: Date,
    salary: Number,
    shiftTimings: String,
    // isActive: Boolean,
    // orders: [ObjectId],
    // createdAt:Date,

},
{ timestamps: true })

userSchema.plugin(passportLocalMomgoose, { usernameField: 'username' });
const User = mongoose.model('User',userSchema);
export default User ;