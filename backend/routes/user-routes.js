const router=require('express').Router();
let Name=require('../models/name.model');
const bcrypt = require('bcryptjs')

router.route('/').get((req,res)=>{
    Name.find()
    .then(names=>res.json(names))
    .catch(err=>res.status(400).json('Error'+err))
})
router.route('/signup').post((req,res)=> {
    const{name,email,password}=req.body;
      Name.findOne({email: email})
      .then(user => {
        if (user) {
            return res.status(404).json({message:"User Already Exists!Please Login"})
        } else{
           
            const user = new Name({
                name,
                email,
               password
            })
        
            try{
            user.save();
           
            }
            catch(err){
            console.log(err)
            }
            return res.status(201).json({message:"signup done"})
        }
      })
      .catch((err)=>console.log(err));
  

})

router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    Name.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "Couldn't find user" });
        }
        console.log(user.password)
        console.log(password)
        bcrypt.compare(password, user.password)
      
         
            if (user.password!=password) {
              return res.status(401).json({ message: "Password incorrect" });
            }
  
            return res.status(201).json({ message: "Login successful!" });
          
         
      })
      .catch(err => console.log(err));
  });
  



module.exports=router;