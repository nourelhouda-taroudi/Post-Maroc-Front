import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client.model';
import { Observable } from 'rxjs';

const API_CLIENT = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http:HttpClient
  ) { }
  // Create client methode
  createClient(client:Client):Observable<any>{
     return this.http.post(API_CLIENT+'/createClient',client);
  }
  getAccountBalance(){
    this.http.get(environment.API_URL+'/AE269199/getAccountBalance').subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err)
    });
  }
}
