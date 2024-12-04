const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.use(express.json())

const port = 4000

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/osfclass');
        console.log("database connection established");
        
    } catch (error) {
        console.log('error connecting to database');
        
    }
}

db();



const Schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', Schema)



app.post('/signup',async (req,res) => {
try {
    const {userName,email,password} = req.body

    const existingUser = await User.findOne({email: email})

    if (existingUser){
        return res.status(400).json({message: "User already exists please login"})
    }

    const newUser = new User({
        userName: userName,
        email: email,
        password: password
    })

    await newUser.save()

    return res.status(200).json({message: "user created successfully"})
} catch (error) {
    console.log(error);
    
    return res.status(500).json({message:"internal server error"})
}
})


app.get('/', (req, res) => {
    res.send('Welcome to our homepage')
})

app.listen(port, ()=>{
    console.log(`port is listening on http://localhost:${port}`);
    
})