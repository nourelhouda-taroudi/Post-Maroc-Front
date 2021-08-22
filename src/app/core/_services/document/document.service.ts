import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_DOC = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http:HttpClient
  ) { }
  
  uploadDocument(payload:any,CIN:string):Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${API_DOC}/${CIN}/uploadDocument`,payload,{headers: headers});
  }
  signer(idCredit:number,pdf:string):Observable<any>{
    return this.http.put(`${API_DOC}/${idCredit}/sign`,pdf);
  }
}
