var express = require("express");
var router = express.Router();
var Burger = require("../models/burgers.js");

router.get("/", function(req, res){
    Burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    Burger.insertOne([
        "burger_name", "devoured", "creation_time"
    ], [
        req.body.burger_name, req.body.devoured, req.body.creation_time
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    Burger.updateOne({
        burger_name: req.body.burger_name
    }, condition, function(result) {
        if (result.changedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;