import express from "express";
import Book from "../models/book"
import Date from "../models/date"
import Obligation from "../models/obligation";
import maxDays from "../models/max_days";

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
        let username = req.body.username; 
        let book_id = req.body.book_id; 
        console.log(id);
        console.log(username);
        console.log(book_id);

        Obligation.updateOne({'id':id, 'kor_ime':username},{$set:{'razduzen':'da'}}, (err,resp)=>{
            if(err)console.log(err)
            else {
                Book.findOne({'id':book_id},(err, book)=>{
                    if(err)console.log(err)
                    else{
                        let na_stanju = book.na_stanju+1;
                        Book.updateOne({'id':book.id}, {$set:{'na_stanju':na_stanju}}, (err, resp)=>{
                            if(err)console.log(err)
                            else res.json({'message': 'uspesno_vracena'})
                        })
                    }

                })
            
            }
        })
    }

    makeObligation = (req: express.Request, res: express.Response)=>{
  
        Obligation.find({},(err, obligs)=>{
            if(err)console.log(err)
            else{
                let idO = obligs.length+1; 
                let obligation = new Obligation({
                    id:idO,
                    kor_ime:req.body.obligation.kor_ime,
                    id_knjige:req.body.obligation.id_knjige,
                    datum_zaduzivanja:req.body.obligation.datum_zaduzivanja,
                    datum_vracanja:req.body.obligation.datum_vracanja,
                    razduzen:req.body.obligation.razduzen
                })

                console.log(obligation); 

                obligation.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else {
                        Book.findOne({'id':req.body.obligation.id_knjige},(err, book)=>{
                            if(err)console.log(err)
                            else{
                                let na_stanju = book.na_stanju-1;
                                let broj_uzimanja= book.broj_uzimanja+1; 
                                Book.updateOne({'id':book.id}, {$set:{'na_stanju':na_stanju, 'broj_uzimanja':broj_uzimanja}}, (err, resp)=>{
                                    if(err)console.log(err)
                                    else res.json({"message": "obligation_added"})
                                })
                            }
        
                        })
                    }
                        
                })
            }
        })
    }

    addComment = (req: express.Request, res: express.Response)=>{
        let comment = req.body.comment; 
        console.log(comment); 

        Book.updateOne({'id':comment.id_knjige}, {$push: {'komentari': comment}}, (err, book)=>{
            if(err) console.log(err)
            else {
                Book.findOne({'id':comment.id_knjige}, (err, book)=>{
                    if(err) console.log(err)
                    else{
                        let ratings = book.komentari.length;
                        console.log(ratings);
                        let rating = ((book.prosecna_ocena+comment.ocena)/ratings); 
                        console.log(rating); 
                        Book.updateOne({'id':comment.id_knjige}, {$set: {'prosecna_ocena': rating}}, (err, resp)=>{
                            if(err) console.log(err)
                            res.json({'message': 'comment_added'})
                        })
                    }
                })
            }
        })

    }


    updateBook = (req: express.Request, res: express.Response)=>{
        let book = req.body.book;

        Book.updateOne({'id':book.id}, 
        {$set:{'naziv':book.naziv, 'autor':book.autor, 'zanr':book.zanr,
         'izdavac':book.izdavac, 'godina_izdavanja':book.godina_izdavanja, 'jezik':book.jezik,
        'broj_uzimanja':book.broj_uzimanja, 'prosecna_ocena':book.prosecna_ocena,
        'na_stanju':book.na_stanju, 'slika':book.slika}}, (err, resp)=>{

            if(err) console.log(err)
            else res.json({'message': 'book_updated'})
        })
    }

    addBook = (req: express.Request, res: express.Response)=>{
        Book.find({}, (err,books)=>{
            if(err) console.log(err)
            else{
                let new_id = books.length+1; 
                let newBook = new Book({
                    id: new_id,
                    naziv:req.body.book.naziv,
                    autor:req.body.book.autor,
                    zanr:req.body.book.zanr,
                    izdavac:req.body.book.izdavac,
                    godina_izdavanja:req.body.book.godina_izdavanja,
                    jezik:req.body.book.jezik,
                    broj_uzimanja:req.body.book.broj_uzimanja,
                    prosecna_ocena:req.body.book.prosecna_ocena,
                    na_stanju:req.body.book.na_stanju,
                    slika:req.body.book.slika
                })

                newBook.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else res.json({"message": "book_added"})
                })
            }
        })

    }

    deleteBook= (req: express.Request, res: express.Response)=>{
        let idB = req.body.bookId;
        Book.deleteOne({'id':idB}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'knjiga je obrisana'})
        })
    }


    changeMaxDays= (req: express.Request, res: express.Response)=>{
        let days = req.body.days; 
        console.log(days); 
        maxDays.updateOne({'id':1}, {$set:{'max_broj_dana':days}}, (err, resp)=>{
            if(err) console.log(err)
            res.json({'message': 'max days updated'})
        })
        
    }

    getMaxDays= (req: express.Request, res: express.Response)=>{
        maxDays.findOne({'id':1}, (err, maxDays)=>{
            if(err)console.log(err)
            else res.json(maxDays)
        })
    }

    advancedSearch= (req: express.Request, res: express.Response)=>{
        let naziv = req.body.searchObj.naziv;
        let autor = req.body.searchObj.autor;
        let zanr = req.body.searchObj.zanr;
        let izdavac = req.body.searchObj.izdavac;
        let godina_od = req.body.searchObj.godina_od;
        let godina_do = req.body.searchObj.godina_do;
        console.log(zanr);
        console.log(naziv);
        console.log(izdavac);

    }


}
