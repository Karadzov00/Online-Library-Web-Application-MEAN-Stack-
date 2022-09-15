import { Comment } from "./comment";

export class Book{
    id:number;
    naziv:string;
    autor:string;
    zanr:string;
    izdavac:string;
    godina_izdavanja:number;
    jezik:string;
    broj_uzimanja:number;
    prosecna_ocena:number; 
    na_stanju: number; 
    slika: string; 
    komentari: Array<Comment>;
}