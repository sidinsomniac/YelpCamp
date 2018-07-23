var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');

// Index Route to view all campground lists
router.get('/',function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log('There was an error');
        }
        else{
            res.render('campgrounds/index',{campgrounds:campgrounds});
        }
    })
    console.log('Index page requested');
});

// Create Route to add new campgrounds to the database
router.post('/',function(req,res){
    Campground.create(req.body.newground, function(err,campground){
        if(err){
            console.log('There was an error');
        }
        else{
            res.redirect('/campgrounds');            
        }
    });
});

// New Route to add new campgrounds to the form
router.get('/newground',function(req,res){
    res.render('campgrounds/newground');
    console.log('New campground form requested');
});

// Show Route to show more info on a single campground
router.get('/:id',function(req,res){
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render('campgrounds/show',{campground:foundCampground});
        }
    });
    console.log(`Requested ${req.params.id} page`);
});

module.exports = router;