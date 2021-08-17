import { Observable } from 'rxjs';
import { Credit } from './../_models/credit.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const API_CREDIT = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(
    private http:HttpClient
  ) { }
  createCredit(credit:Credit,CIN:string):Observable<any>{
    return this.http.post(API_CREDIT+'/applyForCredit/'+CIN,credit);
 }
}
