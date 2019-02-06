const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',(req,res,next)=>{
    User.find()
    .exec()
    .then(docs=>{
        console.log(docs);
         res.status(200).json(docs);
    }).catch(err=>{
        console.log(err); 
        res.status(500).json({
            error:err
        });
    });
    
});


router.post("/login",(req,res,next)=>{
    User.find({ email: req.body.email })
    .exec()
    .then(user=>{
        if(user.length <1)
        {
            return res.status(401).json({
                message: "1 .Authntication failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err)
            {
                return res.status(401).json({
                    message: "2 .Authntication failed"
                });
            }
            if(result)
            {
                console.log(user[0].name)
                    const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    }
                    );
                return res.status(200).json({
                    message: "Authentication succesful",
                    token: token,
                    email:req.body.email,
                    name:user[0].name,
                });
            }
            res.status(401).json({
                message: "3. Authntication failed"
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})


router.post('/signup',(req,res,next)=>{
    User.find({ email:req.body.email })
    .exec()
    .then(user=>{
        if(user.length >= 1)
        {
            return res.status(409).json({
                message:"Mail exists"
            });
        }
        else
        {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }
                else
                {
                    const user =new User({
                        _id: new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message:'User created'
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })   
});


router.delete("/:userId",(req,res,next)=>{
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "User Deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get("/:userId",(req,res,next)=>{
    User.findOne({ _id:req.params.userId })
    .exec()
    .then(result=>{
        console.log(result)
        if(result)
        {
            res.status(200).json({result})
        }
        else
        {
            res.status(400).json({message:"No entry found"});
        }
    }).catch(err=> {
        console.log(err)
        res.status(500).json({error:err})
    });
});



module.exports = router;