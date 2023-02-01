const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "jwtwebtoken";

router.post("/register",async(req,res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });

        const token = jwt.sign({email: newUser.email, id:newUser._id},SECRET_KEY);
        res.status(201).json({user: newUser, token:token});

        //const user= await newUser.save()
        //res.status(200).json(user)
    }catch(error){
        console.log(error)
        res.status(500).json(user)
    }

})

//login
router.post("/login",async (req,res) => {
    try{
        const user = await User.findOne({username:req.body.username})

        !user && res.status(400).json("Wrond")

        const validate = await bcrypt.compare(req.body.password, user.password)

        !validate && res.status(400).json("Wrong Pass")     

        const {password, ...other}=user._doc

        const token = jwt.sign({email:user,id: user._id}, SECRET_KEY);

        res.status(201).json({user:user,token:token});
    }catch(error){
        res.status(500).json(error)
    }
})

module.exports = router