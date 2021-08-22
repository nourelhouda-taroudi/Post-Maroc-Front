import { Injectable } from '@angular/core';
import { Client } from '../_models/client.model';
import { Credit } from '../_models/credit.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  constructor() { }
  isAccessValid(){
    const access = this.getAccess();
    console.log(access);
    if(access !=null){
      return this.check(access);
    }
    return false;
  }
  getAccess(){
    return localStorage.getItem('access');
  }

  setAccess(access : string){
    localStorage.setItem('access',access);
  }
  removeAccess(){
    localStorage.removeItem('access');
  }
  setClientData(client : Client , credit : Credit){
    localStorage.setItem('firstName',client.firstName); 
    localStorage.setItem('lastName',client.lastName);
    localStorage.setItem('CIN',client.CIN_Number);
    localStorage.setItem('age',client.age+"");    
    localStorage.setItem('amount',credit.amount+"");
  }
  getClientFirstName(){
    return localStorage.getItem('firstName');
  }
  getClientAge(){
    return localStorage.getItem('age');
  }
  getClientCreditAmount(){
    return localStorage.getItem('amount');
  }
  check(access : string){
    const firstName : any = this.getClientFirstName();
    const age :any = this.getClientAge();
    const amount = this.getClientCreditAmount();
    if(age!=null || firstName !=null || amount != null){
      const c = firstName.charCodeAt(0).toLocaleString()+firstName.charCodeAt(1)?.toLocaleString()+firstName.charCodeAt(3)?.toLocaleString();
      const b = (age+'').charCodeAt(0).toLocaleString()+(age+'').charCodeAt(2).toLocaleString();
      const a = (amount+'').charCodeAt(2).toLocaleString()+(amount+'').charCodeAt(3).toLocaleString()+(amount+'').charCodeAt(5).toLocaleString();
      const result :string = a.concat(c,b);
      console.log(result);
      return access == result;
    }
    return false;
  }
  removeAll(){
    localStorage.clear();
  }
}
