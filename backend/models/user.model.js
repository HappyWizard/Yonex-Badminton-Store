import mongoose from 'mongoose'

// Create a separate connection to the `users` database
const usersDB = mongoose.connection.useDb('users'); 

const userDetailsSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps: true // ensure there's a createdAt and updatedAt fields
});

const User = usersDB.model('User Info', userDetailsSchema); // collection name is Yonex Product

export default User;