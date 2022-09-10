import express from "express";
import Book from "../models/book"

export class BooksController{

    getTop3Books = (req: express.Request, res: express.Response)=>{
        
    }

    getAtomicHabits = (req: express.Request, res: express.Response)=>{
        Book.findOne({'naziv':'Hari Poter i zatvorenik iz Askabana'}, (err, user)=>{
            if(err)console.log(err); 
            else res.json(user); 
        })
    }

}
