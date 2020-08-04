const express = require("express");
const Time = require("../models").Time;
const Medicine = require("../models").Medicine
const router = express.Router();

const UserModel = require("../models").User;

//GET USER MED SCHEDULE
router.get("/schedule/:id", (req,res)=>{
  UserModel.findByPk(req.params.id).then((user)=>{
    Medicine.findAll().then((allMeds)=>{
      Time.findAll().then((allTimes)=>{
        res.render('users/userschedule.ejs',{
          user:user,
          medicines:allMeds,
          times:allTimes,
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
  UserModel.Medicine.create({
    userId: req.params.id,
    timeId: req.body.time,
    medId: req.body.medicine,
    
  }).then(()=>{
    res.redirect(`/users/schedule/${foundUser.id}`)
  })
    // Medicine.findByPk(req.body.medicine).then((foundMed)=>{
    //   Time.findByPk(req.body.time).then((foundTime)=>{
    //   UserModel.findByPk(req.params.id).then((foundUser)=>{
    //     foundUser.addMedicine(foundMed, foundTime),
    //     res.redirect(`/users/schedule/${foundUser.id}`)
    //   })
    // })
    // })
  })


//USER MED SCHEDULE SHOW/EDIT/DELETE PAGE
router.get("/profile/schedule/:id", (req,res)=>{
  UserModel.findByPk(req.params.id, {
    include: [{model: Medicine}, {model: Time}],
  }).then((user)=>{
    Medicine.findAll().then((medicine)=>{
  });
});
});

module.exports = router;
