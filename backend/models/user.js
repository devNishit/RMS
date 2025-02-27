import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    email:{
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
    password: { type: String, required: true },
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

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

const User = mongoose.model('User',userSchema);
export default User ;