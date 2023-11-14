const express = require("express");
const router = express.Router();
const User = require("../models/User");

//find all
router.get("/", (req, res) => {
  User.findAll()
    .then((dbUsers) => {
      res.json(dbUsers);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
});
//find one
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((dbUser) => {
      if (dbUser) {
        res.json(dbUser);
      } else {
        res.status(404).json({ msg: "no such user" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
});
//create
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
});
//update
router.put("/:id", (req, res) => {
    User.update({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    },{
        where:{
            id:req.params.id
        }
    }).then((updatedUser) => {
        console.log('updatedUser: ',updatedUser)
        if (updatedUser[0]) {
          res.json(updatedUser);
        } else {
          res.status(404).json({ msg: "no such user to update" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "oh no an error!",
          err,
        });
      });
  });
  //delete
router.delete("/:id", (req, res) => {
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then((delUser) => {
        console.log('delUser: ',delUser)
        if (delUser) {
          res.json(delUser);
        } else {
          res.status(404).json({ msg: "no such user to delete" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "oh no an error!",
          err,
        });
      });
  });

  //login
  router.post("/login",(req,res)=>{
    //1. accept a email password

    //2. find that record in our database
    User.findOne({
      where:{
        email:req.body.email
      }
    }).then(foundUser=>{
      if(!foundUser){
        res.status(401).json({msg:"incorrect username/password"})
      } else{
        //3. compare entered password to saved password
        if(req.body.password!==foundUser.password){
          res.status(401).json({msg:"incorrect username/password"})
        } else {
          //4. if match, send back record
          res.json(foundUser);
        }
      }
    }) .catch((err) => {
      res.status(500).json({
        msg: "oh no an error!",
        err,
      });
    });
    //5. if not, login failed
  })

module.exports = router;
