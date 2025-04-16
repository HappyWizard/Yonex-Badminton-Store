import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const JWT_SECRET = "aosifoewimwoefewfjiwodfapo0398497e637waurgiwro3iqPlsrefe0er" // can be any gliberrish


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.json({ error: "User Not Found" })
    }
    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({}, JWT_SECRET, {
            expiresIn: '15m',
        })

        if (res.status(201)){

            return res.json({ status: "ok", data: token})
        }else{
            return res.json({ error: "error"})
        }
    }
    res.json({ status: "error", error: "Password Incorrect"})
}

export const signupUser = async (req, res) => {

    const { userName, email, password } = req.body;

    const encrptedPassword = await bcrypt.hash(password, 10)
    try{
        const oldUser = await User.findOne({email})

        if(oldUser){
            return res.send({error: "User Already Exists"})
        }
        await User.create({
            userName: userName,
            email: email,
            password: encrptedPassword,
        })

        res.send({status:"ok", data:{userName, email, password}})

    }catch(error){
        res.send({status: "error"})
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try{
        const oldUser = await User.findOne({ email });
        if (!oldUser){
            return res.json({ error:"User Does not Exist" })
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "10m",
        })
        // this link will be sent to user thru email, this link has to be modified when website is deployed
        // const link = `http://localhost:${process.env.PORT}/${oldUser._id}/${token}`
        const link = `https://yonex-badminton-store.onrender.com/${oldUser._id}/${token}`
        console.log(link)

        return res.json({ status: "ok" })

    }catch(error){

    }
}

export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    console.log(req.body)
    console.log(req.params)

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser){
        return res.json({ error: "User Does not Exist" })
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret)
        
        const encrptedPassword = await bcrypt.hash(password, 10)
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encrptedPassword,
                },
            }
        )
        res.json({ status: "Password Updated"})
        
    }catch(error){
        // console.log(error)
        res.send({ error: "Password not Updated"})
    }
}


// export const showUserData = async (req, res) => {
//     const { token } = req.body;
//     try{
//         // all user details will be stored in this user variable
//         const user = jwt.verify(token, JWT_SECRET)

//         const userEmail = user.email;
//         User.findOne({ email: userEmail})
//             .then((data) => {
//                 res.send({ status: onkeydown, data: data })
//             })
//             .catch((error) => {
//                 res.send({ status: "error", data: error })
//             })

//     }catch(error){

//     }
// } 
