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
