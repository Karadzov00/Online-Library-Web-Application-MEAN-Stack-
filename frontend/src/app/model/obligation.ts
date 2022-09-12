// id:{
//     type: Number
// },
// kor_ime: {
//     type: String
// },
// id_knjige:{
//     type:Number
// },
// datum_zaduzivanja:{
//     type: String
// },
// datum_vracanja:{
//     type: String
// }

export class Obligation{
    id:number; 
    kor_ime:string; 
    id_knjige:number; 
    datum_zaduzivanja: string; 
    datum_vracanja:string; 
    razduzen:string; 
}