const express = require("express");
const router = express.Router();

const Medicine = require("../models").Medicine;
const Time = require("../models").Time;
const User=require("../models").User;

// NEW MEDICINE ROUTE
router.get('/new', (req, res) => {
    res.render('meds/new.ejs');
});

//POST for new/create
router.post('/', (req,res) => {
    Medicine.create(req.body).then((newMedicine) => {
       res.redirect('/medicine'); 
    });
});

// MEDICINE INDEX ROUTE
router.get("/", (req, res) => {
    Medicine.findAll().then((medicines) =>{
        res.render("meds/index.ejs", {
      medicines: medicines,
        });
    });
  });

//SHOW ROUTE

router.get('/:id', (req, res) => {
    Medicine.findByPk(req.params.id).then((medicine) => {
    res.render("meds/show.ejs", {
        medicine: medicine,
        });
    });
});

//edit route
router.get('/:id/edit', (req, res) => {
    console.log(req.params.id)
    Medicine.findByPk(req.params.id).then((medicine) => {
            res.render(
		'meds/edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
            medicine: medicine, 
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