const express = require("express");
const Time = require("../models").Time;
const Medicine = require("../models").Medicine;
const UserMed = require("../models").UserMed;
const router = express.Router();

const UserModel = require("../models").User;

//GET USER MED SCHEDULE
router.get("/schedule/:id", (req,res)=>{
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
          userMeds:allUserMeds
        })
        
      })
    })
      
      });
  });
});

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  UserModel.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
  });
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
    // Medicine.findByPk(req.body.medicine).then((foundMed)=>{
    //   Time.findByPk(req.body.time).then((foundTime)=>{
    //   UserModel.findByPk(req.params.id).then((foundUser)=>{
    //     foundUser.addMedicine(foundMed),
    //     foundUser.addTime(foundTime),
    //     res.redirect(`/users/schedule/${foundUser.id}`)
    //   })
    // })
    // })
  })



module.exports = router;
