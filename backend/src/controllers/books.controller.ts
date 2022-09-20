import express from "express";
import Book from "../models/book"
import DateModel from "../models/date"
import Obligation from "../models/obligation";
import maxDays from "../models/max_days";
import BookRequest from "../models/book_request";
import Prolongation from "../models/prolongation"
import Reservation from "../models/reservation"
import { ReservationModel } from "../models/reservationModel";
import book from "../models/book";
import reservation from "../models/reservation";

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

        DateModel.findOne({'datum':date},(err, date)=>{
            if(err)console.log(err); 
            else{
                if(!date){

                    Book.find({},(err, books)=>{
                        if(err)console.log(err); 
                        else{
                            let maxId = books.length; 
                            let randomId=  Math.floor(Math.random() * (maxId + 1));
                            
                            let new_date = new DateModel({
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
        let returnDate = req.body.returnDate; 
        console.log(id);
        console.log(username);
        console.log(book_id);

        

        Obligation.updateOne({'id':id, 'kor_ime':username},{$set:{'razduzen':returnDate}}, (err,resp)=>{
            if(err)console.log(err)
            else {
                //if there are no reservations for this book 
                Book.findOne({'id':book_id},(err, book)=>{
                    if(err)console.log(err)
                    else{
                        Reservation.find({'id_knjige':book_id}).sort({'id':1}).then(reservations=>{
                            if(reservations){
                                // console.log(reservations);
                                //if there are reservations for this book 
                                let book_given=false; 
                                reservations.forEach(reserv=>{
                                    let hasThatBook=false; 
                                    let cnt=0;
                                    let exitFor=false; 
                                    console.log(reserv); 
                                    Obligation.find({'kor_ime':reserv.kor_ime},(err, obligations)=>{
                                        if(err)console.log(err)
                                        else{
                                            obligations.forEach(obligation=>{
                                                if(!obligation.razduzen.localeCompare('ne')){
                                                    cnt++; 
                                                    if(obligations.id_knjige==book_id){
                                                        hasThatBook=true; 
                                                    }
                                                }
                                            })
                                            
                                            console.log(reserv.kor_ime +" "+ cnt +" , "+hasThatBook)
                                            if(cnt<3 && !hasThatBook && !book_given){
                                                book_given=true; 
                                                //break loop and assign book to the user 
                                                exitFor=true; 
                                                console.log(reserv.kor_ime + " usao u dodavanje")
                                                //make obligation 
                                                maxDays.findOne({'id':1},(err, days)=>{
                                                    if(err)console.log(err)
                                                    else{
                                                        
                                                        let date2 = new Date();
                                                        date2.setDate(date2.getDate() + days.broj_dana);
                                                        let returnDate = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate(); 
                                                        
                                                        let username=reserv.kor_ime;
                                                        console.log("Username je "+username)

                                                        let date1 = new Date(); 
                                                        let takeDate = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();
                    
                                                        Obligation.find({},(err, obligations)=>{
                                                            if(err)console.log(err)
                                                            else{
                                                                let new_id = obligations.length+1; 
                            
                                                                let obligation = new Obligation({
                                                                    id:new_id,
                                                                    kor_ime:username,
                                                                    id_knjige:book_id,
                                                                    datum_zaduzivanja: takeDate,
                                                                    datum_vracanja: returnDate,
                                                                    razduzen:'ne'
                                                                })
                                                                obligation.save((err,resp)=>{
                                                                    if(err)console.log(err)
                                                                    else {
                                                                        Book.findOne({'id':book_id},(err, book)=>{
                                                                            if(err)console.log(err)
                                                                            else{
                                                                                let broj_uzimanja= book.broj_uzimanja+1; 
                                                                                Book.updateOne({'id':book.id}, {$set:{'broj_uzimanja':broj_uzimanja}}, (err, resp)=>{
                                                                                    if(err)console.log(err)
                                                                                    // else res.json({"message": "reservation accepted and obligation added"})
                                                                                })
                                                                            }
                                                                        })
                                                                        Reservation.deleteOne({'id':reserv.id}, (err, resp)=>{
                                                                        if(err)console.log(err)
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })                                                  
                                                    
                                                    }
                                                })                 
                                            }
                                        }
                                    })
                                    
                                }) 
                            }
                            else{
                                //if there are no reservations for this book 
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

                })
            
            }
        })
    }

    checkReservations(book_id){
        // Reservation.find({'id_knjige':book_id}).sort({'id':1}).then(reservations=>{
        //     if(reservations){
        //         //if there are reservations for this book 
        //         let hasThatBook=false; 
        //         let cnt=0;
        //         let exitFor=false; 
        //         for(var reserv of reservations){
        //             Obligation.find({'kor_ime':reserv.kor_ime},(err, obligations)=>{
        //                 if(err)console.log(err)
        //                 else{
        //                     obligations.forEach(obligation=>{
        //                         if(!obligation.razduzen.localeCompare('ne')){
        //                             cnt++; 
        //                             if(obligations.id_knjige==book_id){
        //                                 hasThatBook=true; 
        //                             }
        //                         }
        //                     })
        //                     if(cnt<3 && !hasThatBook){
        //                         //break loop and assign book to the user 
        //                         exitFor=true; 
    
        //                         //make obligation 
        //                         maxDays.findOne({'id':1},(err, days)=>{
        //                             if(err)console.log(err)
        //                             else{
    
        //                                 let date2 = new Date();
        //                                 date2.setDate(date2.getDate() + days);
        //                                 let returnDate = date2.getFullYear()+'-'+(date2.getMonth()+1)+'-'+date2.getDate(); 
                                        
        //                                 let username=reserv.kor_ime;
        //                                 let id_knjige = book_id;
        //                                 let returned = 'ne'; 
        //                                 let date1 = new Date(); 
        //                                 let takeDate = date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate();
    
        //                                 Obligation.find({},(err, obligations)=>{
        //                                     if(err)console.log(err)
        //                                     else{
        //                                         let new_id = obligations.length+1; 
            
        //                                         let obligation = new Obligation({
        //                                             id:new_id,
        //                                             kor_ime:username,
        //                                             id_knjige:id_knjige,
        //                                             datum_zaduzivanja: takeDate,
        //                                             datum_vracanja: returnDate,
        //                                             razduzen:'ne'
        //                                         })
        //                                         obligation.save((err,resp)=>{
        //                                             if(err)console.log(err)
        //                                             else {
        //                                                 Book.findOne({'id':req.body.obligation.id_knjige},(err, book)=>{
        //                                                     if(err)console.log(err)
        //                                                     else{
        //                                                         let broj_uzimanja= book.broj_uzimanja+1; 
        //                                                         Book.updateOne({'id':book.id}, {$set:{'broj_uzimanja':broj_uzimanja}}, (err, resp)=>{
        //                                                             if(err)console.log(err)
        //                                                             else res.json({"message": "obligation_added"})
        //                                                         })
        //                                                     }
                                        
        //                                                 })
        //                                             }
        //                                         })
        //                                     }
        //                                 })                                                  
                                    
        //                             }
        //                         })                 
        //                     }
        //                 }
        //             })
        //             if(exitFor)break; 
        //         } 
        //     }
        //     else{
        //         //if there are no reservations for this book 
        //         Book.findOne({'id':book_id},(err, book)=>{
        //             if(err)console.log(err)
        //             else{


        //                 let na_stanju = book.na_stanju+1;
        //                 Book.updateOne({'id':book.id}, {$set:{'na_stanju':na_stanju}}, (err, resp)=>{
        //                     if(err)console.log(err)
        //                     else res.json({'message': 'uspesno_vracena'})
        //                 })
        //             }

        //         })
        //     }
      
        // })
        
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
                       

                        let cnt = 0.0;
                        let  sum =0.0; 
                        book.komentari.forEach(element => {
                            sum+=element.ocena; 
                            cnt++; 
                        }); 

                        let rating = (sum/cnt).toFixed(3); 

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

    updateComment= (req: express.Request, res: express.Response)=>{
        let comment = req.body.comment; 
        console.log(comment); 

        Book.updateOne({'id':comment.id_knjige, 'komentari.kor_ime':comment.kor_ime},
                {$set: {'komentari.$.ocena':comment.ocena, 'komentari.$.tekst':comment.tekst,
                'komentari.$.datum_vreme':comment.datum_vreme,'komentari.$.azuriran':'da'}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'comment_updated'})
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

    changeProlongationDays= (req: express.Request, res: express.Response)=>{
        let days = req.body.days; 
        console.log(days); 
        maxDays.updateOne({'id':2}, {$set:{'max_broj_dana':days}}, (err, resp)=>{
            if(err) console.log(err)
            res.json({'message': 'prolongation days updated'})
        })
        
    }

    getMaxDays= (req: express.Request, res: express.Response)=>{
        maxDays.findOne({'id':1}, (err, maxDays)=>{
            if(err)console.log(err)
            else res.json(maxDays)
        })
    }
    getProlongationDays= (req: express.Request, res: express.Response)=>{
        maxDays.findOne({'id':2}, (err, maxDays)=>{
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

        if(!naziv)naziv="";
        if(!autor)autor="";

        if(!izdavac)izdavac="";
        if(!godina_od)godina_od=0;
        if(!godina_do)godina_do=999999;


        // console.log(zanr);
        // console.log(naziv);
        // console.log(autor);
        // console.log(godina_do);
        // console.log(izdavac);

        Book.find({'naziv':{$regex: naziv},'autor':{$regex: autor},
                    'izdavac':{$regex: izdavac}, 'godina_izdavanja':{$gte: godina_od, $lte: godina_do },
                    'zanr':{$in: zanr}}, (err, books)=>{
                        if(err)console.log(err)
                        else{
                            // console.log(books);
                            res.json(books); 
                        }
                    })
    }

    suggestBook = (req: express.Request, res: express.Response)=>{
        let book = req.body.suggestion; 

        BookRequest.find({}, (err, requests)=>{
            if(err)console.log(err)
            else{
                let idR = requests.length+1; 
                let newBook = new BookRequest({
                    id: idR,
                    kor_ime:book.kor_ime,
                    naziv:book.naziv,
                    autor:book.autor,
                    zanr:book.zanr,
                    izdavac:book.izdavac,
                    godina_izdavanja:book.godina_izdavanja,
                    jezik:book.jezik,
                    broj_uzimanja:0,
                    prosecna_ocena:0,
                    na_stanju:book.na_stanju,
                    slika:book.slika,
                    status:'na cekanju'
                })

                newBook.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": "error"})
                    }
                    else res.json({"message": "dodat zahtev za knjigu"})
                })

            }
        })
    }

    fetchBookSuggestions= (req: express.Request, res: express.Response)=>{
        BookRequest.find({},(err, requests)=>{
            if(err)console.log(err)
            else res.json(requests)
        })
    }

    acceptSuggestion= (req: express.Request, res: express.Response)=>{
        let id = req.body.suggestion.id; 

        BookRequest.updateOne({'id':id}, {$set:{'status':'odobren'}}, (err, resp)=>{
            if(err)console.log(err)
            else res.json({"message": "obrisan predlog za knjigu"})
        } )
    }

    fetchProlongations= (req: express.Request, res: express.Response)=>{
        Prolongation.find({}, (err, prols)=>{
            if(err)console.log(err)
            else res.json(prols);
        })
    }

    addProlongation= (req: express.Request, res: express.Response)=>{
        let prolongation=req.body.prolongation; 
        
        Prolongation.find({}, (err, prols)=>{
            if(err)console.log(err)
            else {
                let id = prols.length+1; 
                let new_prol = new Prolongation({
                    id: id, 
                    id_zaduzenja: prolongation.id_zaduzenja,
                    kor_ime: prolongation.kor_ime,
                    id_knjige: prolongation.id_knjige,
                    novi_datum:prolongation.novi_datum
                })

                new_prol.save((err, resp)=>{
                    if(err)console.log(err)
                    else{
                        Obligation.updateOne({'id':prolongation.id_zaduzenja},
                        {$set:{'datum_vracanja':prolongation.novi_datum}}, (err, resp)=>{
                            if(err)console.log(err)
                            else res.json({"message": "produzen rok za vracanje knjige"})
                            
                        })
                    }
                })
            }
        })


    }

    makeReservation = (req: express.Request, res: express.Response)=>{
        let reser = req.body.reservation; 

        Reservation.find({},(err, reservs)=>{
            if(err)console.log(err)
            else{
                if(reservs){
                    Reservation.find({},{_id:0, id_knjige:0, kor_ime:0}).sort({'id':-1}).limit(1).then((reserv)=>{
                        var result=[]; 
                        reserv.forEach(elem=>{
                            result.push(elem.id)
                        })  
                        // console.log(result[0]);

                        let new_id=result[0]+1; 

                        let new_reservation = new Reservation({
                            id: new_id,
                            id_knjige:reser.id_knjige,
                            kor_ime: reser.kor_ime
                        })

                        new_reservation.save((err, resp)=>{
                            if(err)console.log(err)
                            else res.json({"message": "dodata rezervacija"})
                        })
                    })
                }
                else{
                    let new_id=1; 

                    let new_reservation = new Reservation({
                            id: new_id,
                            id_knjige:reser.id_knjige,
                            kor_ime: reser.kor_ime
                        })

                        new_reservation.save((err, resp)=>{
                            if(err)console.log(err)
                            else res.json({"message": "dodata rezervacija"})
                        })
                }
            }
        })

    }

}
