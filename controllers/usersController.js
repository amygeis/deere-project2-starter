require('dotenv').config();

const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Time = require("../models").Time;
const Medicine = require("../models").Medicine;
const UserModel = require("../models").User;
const UserMed = require("../models").UserMed;
const router = express.Router();

const { render } = require('ejs');
const { sequelize } = require('../models');

module.exports = router;

//GET USER MED SCHEDULE
router.get("/schedule/:id", (req,res)=>{
  console.log(req.user)
  let username=req.user
  console.log(username)
  if (req.user.id == req.params.id) {
  UserModel.findByPk(req.params.id, {
    include:[{
      model: Medicine,
      attributes:["id","name","dosage"]
    },
  {
    model:Time,
    attributes:["id","timeOfDay"] 
  },
  ]
  }).then((user)=>{
    console.log(user)
    Medicine.findAll().then((allMeds)=>{
      Time.findAll().then((allTimes)=>{
        UserMed.findAll({
          where: {
            userId:req.params.id
          }
        }).then((allUserMeds)=>{
          res.render('users/userschedule.ejs',{
          user:user,
          medicines:allMeds,
          times:allTimes,
          userMeds:allUserMeds,
          username:username,
        })
        
      })
    })
      
      });
  })
} else {
    // res.json("unauthorized");
    res.redirect("/");
}
});

//GET LIST OF USER MEDICINES
router.get("/list/:id", (req,res) =>{
  username=req.user.username;
  if (req.user.id == req.params.id){
    UserMed.findAll({
      where :{
        userId:req.params.id
      },
      attributes : ['medId', [sequelize.fn('count', sequelize.col('medId')),'medCount']],
      group: ['UserMeds.medId'],
      raw: true,
      order: sequelize.literal('medId')
    }).then((allUserMeds)=>{
      Medicine.findAll().then((allMeds)=>{
        UserModel.findByPk(req.params.id).then((user)=>{
          res.render('user/userlist.ejs',{
          userMeds:allUserMeds,
          medicines:allMeds,
          user:user,
        })
      })
      })  
    })
  }
})

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  console.log(req.user);
  username = req.user.username;
  console.log(username)
  if (req.user.id == req.params.id) {
  UserModel.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
      username: username,
    });
  });
} else {
  // res.json("unauthorized");
  res.redirect("/");
}
});

//ADD NEW USER MED TO SCHEDULE
router.put("/schedule/:id", (req,res) => {
  console.log(req.body)
  UserMed.create({
    userId: req.params.id,
    timeId: req.body.time,
    medId: req.body.medicine,
    
  }).then(()=>{
      res.redirect(`/users/schedule/${req.params.id}`)
    })
  })

// delete route
router.delete('/schedule/:id', (req,res) => {
  let userMedId=req.params.id;
  let userId = ""
  UserMed.findByPk(userMedId).then((userMedRow)=>{
    userId = userMedRow.userId;
    return UserMed.destroy({where: {id: req.params.id}})
  }).then(()=>{
console.log(userId)
  res.redirect(`/users/schedule/${userId}`)
  })
});

module.exports = router;
