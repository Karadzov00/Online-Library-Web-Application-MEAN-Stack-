import express from "express";
import Book from "../models/book"

export class BooksController{

    getTop3Books = (req: express.Request, res: express.Response)=>{

    
        Book.find().sort({'broj uzimanja':-1}).limit(3).then(books=>{
            res.json(books)
            console.log(books); 
        }).catch(err=>{
            res.json(err)
        })
        
    }

    getAtomicHabits = (req: express.Request, res: express.Response)=>{
        Book.findOne({'naziv':'Atomske navike'}, (err, user)=>{
            if(err)console.log(err); 
            else res.json(user); 
        })
    }

}
