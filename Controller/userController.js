import userModel from "../Models/userModel.js";
import UserModel from "../Models/userModel.js";

//get users
export async function getAllUsers(req, res){
    try{
        const users = await userModel.find();
        res.json(users);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}
//get user ID
export async function getUserID(req, res){
    try{
        const users = await userModel.findById(req.params.id);
        if(!users){
            res.status(404).json({message: 'User not found'})
        }
        res.json(users);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

//create user
export async function createUser(req, res){
    try{
        const newUser = new userModel({
            name: req.body.name,
            username: req.body.username || '',
            password: req.body.password || ''
        });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}


//login
export async function login(req, res){
    const {username, password} = req.body;
    try{
        const user = await UserModel.findOne({username});
        if (!user || user.password !== password){
            return res.status(401).json({message: 'Invalid username or password'});
        }
        res.json(user);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}
