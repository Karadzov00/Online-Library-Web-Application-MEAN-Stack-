import express from "express";
import Book from "../models/book"
import Date from "../models/date"
import Obligation from "../models/obligation";

export class BooksController{

    getTop3Books = (req: express.Request, res: express.Response)=>{

    
        Book.find().sort({'broj_uzimanja':-1}).limit(3).then(books=>{
            res.json(books)
            // console.log(books); 
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

    getRandomBook = (req: express.Request, res: express.Response)=>{
       
    }

    getHighestId = (req: express.Request, res: express.Response)=>{
        Book.find().sort({'id':-1}).limit(1).then(book=>{
            console.log("knjiga sa max id je"); 
            console.log(book); 
            res.json(book)
        }).catch(err=>{
            res.json(err)
        })
    }

    fetchAllBooks = (req: express.Request, res: express.Response)=>{
        Book.find({},(err, books)=>{
            if(err)console.log(err); 
            else res.json(books); 
        })
    }


    getBookById = (req: express.Request, res: express.Response)=>{
        let id = req.body.id; 
    
        // console.log(id); 
        
        Book.findOne({'id':id}, (err, book)=>{
            if(err)console.log(err); 
            else res.json(book); 
        })
    
    }

    checkInsertDate = (req: express.Request, res: express.Response)=>{
        let date = req.body.date; 

        Date.findOne({'datum':date},(err, date)=>{
            if(err)console.log(err); 
            else{
                if(!date){

                    Book.find({},(err, books)=>{
                        if(err)console.log(err); 
                        else{
                            let maxId = books.length; 
                            let randomId=  Math.floor(Math.random() * (maxId + 1));
                            
                            let new_date = new Date({
                                datum: req.body.date,
                                id_knjige: randomId
                            })

                            new_date.save((err, resp)=>{
                                if(err) {
                                    console.log(err);
                                    res.status(400).json({"message": "error"})
                                }
                                else res.json(randomId)
                            })
                        }
                    })

                }
                else{
                    res.json(date.id_knjige)                    
                }
            }
        })
    }


    searchBooks = (req: express.Request, res: express.Response)=>{
        let name = req.body.name; 
        let author = req.body.author; 
        
        if(name && !author){
            Book.find({'naziv':{$regex: name}}, (err, books)=>{
                if(err)console.log(err)
                else res.json(books)
            })

        }
        else if(!name && author){
            Book.find({'autor':{$regex: author}}, (err, books)=>{
                if(err)console.log(err)
                else res.json(books)
            })
        }
        else if(name && author){
            Book.find({'naziv':{$regex: name}, 'autor':{$regex:author}}, (err, books)=>{
                if(err)console.log(err)
                else res.json(books)
            })
        }
    }

    returnBook = (req: express.Request, res: express.Response)=>{
        let id = req.body.id; 

        Obligation.updateOne({'id_knjige':id},{$set:{'razduzen':'da'}}, (err,res)=>{
            if(err)console.log(err)
            else res.json({'message': 'Knjiga je uspesno vracena'})
        })
    }




}
