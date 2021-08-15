import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http:HttpClient
  ) { }
  getAccountBalance(){
    this.http.get(environment.API_URL+'/AE269199/getAccountBalance').subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err)
    });
  }
}
