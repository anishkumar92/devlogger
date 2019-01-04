import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable,of} from 'rxjs';
import {Log} from '../models/Log';
import { currentId } from 'async_hooks';
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
    this.logs = [
      {id:'1',text:'Generated Components',date:new Date('12/26/2017 12:54:23')},
      {id:'2',text:'Added Bootstrap',date:new Date('12/26/2017 12:54:23')},
      {id:'2',text:'Added logs component',date:new Date('12/26/2017 12:54:23')},
    ]
   }

   getLogs():Observable<Log[]>{
     return of(this.logs);
   }

   setFormLog(log:Log){
     this.logSource.next(log);
   }
   
   addLog(log:Log){
     this.logs.unshift(log);
   }
   updLog(log:Log){
   this.logs.forEach((cur,index) => {
     if(log.id===cur.id){
      this.logs.splice(index,1);
     }
   });
   this.logs.unshift(log);
  }

  deleteLog(log:Log){
    this.logs.forEach((cur,index) => {
      if(log.id===cur.id){
       this.logs.splice(index,1);
      }
    });
     }

     clearState(){
       this.stateScource.next(true);
     }
}
