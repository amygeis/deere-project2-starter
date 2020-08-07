const express = require("express");
const router = express.Router();
const Medicine = require("../models").Medicine;
const Time = require("../models").Time;
const User=require("../models").User;


// NEW MEDICINE ROUTE
router.get('/new', (req, res) => {
    User.findByPk(req.user.id).then((user)=>{
        res.render('meds/new.ejs', {
            user:user,
        });
    })
    
});

//POST for new/create
router.post('/', (req,res) => {
    Medicine.create(req.body).then((newMedicine) => {
       res.redirect('/medicine'); 
    });
});

// MEDICINE INDEX ROUTE
router.get("/", (req, res) => {
    username=req.user.username;
    Medicine.findAll({
        order: ['name']
    }).then((medicines) =>{
        User.findByPk(req.user.id).then((user)=>{
            res.render("meds/index.ejs", {
      medicines: medicines,
      user:user,
        })
        
        });
    });
  });

//SHOW ROUTE

router.get('/:id', (req, res) => {
    username=req.user.username;
    Medicine.findByPk(req.params.id).then((medicine) => {
        User.findByPk(req.user.id).then((user)=>{
            res.render("meds/show.ejs", {
        medicine: medicine,
        user:user,
        })    
        });
    });
});

//edit route
router.get('/:id/edit', (req, res) => {
    username=req.user.username
    console.log(req.params.id)
    Medicine.findByPk(req.params.id).then((medicine) => {
        User.findByPk(req.user.id).then((user)=>{
            res.render('meds/edit.ejs', {
            medicine: medicine, 
            user:user,
        })
            
            });
        });
    });

//  update route
router.put('/:id', (req, res) => { 
    Medicine.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedMed) => {
                res.redirect('/medicine');
            });
        });


// delete route
router.delete('/:id', (req,res) => {
    Medicine.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect('/medicine');
    });    
});

module.exports = router;