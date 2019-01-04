import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable,of} from 'rxjs';
import {Log} from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs:Log[];

      private logSource= new BehaviorSubject<Log>({id: null,text :null,date:null});
      selectedLog = this.logSource.asObservable();

      private stateScource = new BehaviorSubject<boolean>(true);
      stateClear = this.stateScource.asObservable();

  constructor() {
    this.logs = []
   }

   getLogs():Observable<Log[]>{
     
    if(localStorage.getItem('logs')===null){
      this.logs= [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    
       
    return of(this.logs.sort((a,b)=>{
      return b.date = a.date;
    }));

     
   }

   setFormLog(log:Log){
     this.logSource.next(log);
   }
   
   addLog(log:Log){
     this.logs.unshift(log);

     // add to local stroage 
     localStorage.setItem('logs',JSON.stringify(this.logs));
   }
   updLog(log:Log){
   this.logs.forEach((cur,index) => {
     if(log.id===cur.id){
      this.logs.splice(index,1);
     }
   });
   this.logs.unshift(log);
   // update to local stroage 
   localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  deleteLog(log:Log){
    this.logs.forEach((cur,index) => {
      if(log.id===cur.id){
       this.logs.splice(index,1);
      }
    });
    // delete to local stroage 
    localStorage.setItem('logs',JSON.stringify(this.logs));
     }

     clearState(){
       this.stateScource.next(true);
     }
}
