import express from "express";
import User from "../models/user"
import Image from "../models/image"
import Obligation from "../models/obligation"


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

    findUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username; 

        User.findOne({'kor_ime':username}, (err, user)=>{
            if(err)console.log(err); 
            else res.json(user); 
        })
    }

    getNoUserImage = (req: express.Request, res: express.Response)=>{
        Image.findOne({'id':1}, (err, image)=>{
            if(err)console.log(err); 
            else res.json(image); 
        })
    }


    register = (req: express.Request, res: express.Response)=>{
        let user = new User({
            kor_ime: req.body.username,
            lozinka: req.body.password,
            ime: req.body.firstname,
            prezime: req.body.lastname,
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

    
    updatePassword = (req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let password= req.body.password;

        User.updateOne({'kor_ime':username}, {$set: {'lozinka':password}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })
    }

    getObligations = (req: express.Request, res: express.Response)=>{
        let username= req.body.username;

        Obligation.find({'kor_ime':username}, (err, obligations)=>{
            if(err) console.log(err)
            else res.json(obligations); 
        })
        
    }
    
    fetchAllUsers = (req: express.Request, res: express.Response)=>{
        User.find({}, (err, users)=>{
            if(err) console.log(err)
            else res.json(users); 
        })
    }

}