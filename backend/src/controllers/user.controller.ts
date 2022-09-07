import express from "express";
import User from "../models/user"


export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username; 
        let password = req.body.password;
        let type = req.body.type;
        
        User.findOne({'kor_ime':username, 'lozinka':password, 'tip':type}, (err, user)=>{
            if(err)console.log(err); 
            else res.json(user); 
        })
        
    }


    register = (req: express.Request, res: express.Response)=>{
        let user = new User({
            kor_ime: req.body.firstname,
            lozinka: req.body.lastname,
            ime: req.body.username,
            prezime: req.body.password,
            tip: req.body.type,
            adresa: req.body.address,
            telefon: req.body.phone,
            email: req.body.email,
            status: req.body.status,
            slika: req.body.image
        })

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }



}