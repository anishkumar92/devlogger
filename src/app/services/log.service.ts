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
   
}
