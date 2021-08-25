import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessService } from '../access/access.service';

const API_CLIENT = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private hasAccess = new BehaviorSubject<boolean>(this.accessService.isAccessValid())
  accessStatus = this.hasAccess.asObservable();

  changeAccessStatus(value:boolean){
    this.hasAccess.next(value);
  }
  constructor(
    private http:HttpClient,
    private accessService : AccessService
  ) { }
  // Create client methode
  createClient(client:Client):Observable<any>{
     return this.http.post(API_CLIENT+'/createClient',client);
  }
  getAccountBalance(CIN : string):Observable<number>{
    return this.http.get<number>(API_CLIENT+'/'+CIN+'/getAccountBalance');
  }
  getClientByCIN(CIN : string):Observable<Client>{
    return this.http.get<Client>(API_CLIENT+'/'+CIN+'/getClient');
  }
}
