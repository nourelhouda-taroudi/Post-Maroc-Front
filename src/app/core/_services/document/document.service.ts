import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_DOC = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http:HttpClient
  ) { }
  
  uploadDocument(payload:FormData,CIN:string):Observable<any>{
      return this.http.post(`${API_DOC}/vdxcvbn/uploadDocument`,payload);
  }
}
