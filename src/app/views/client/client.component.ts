import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/_services/client/client.service';
import { Client } from 'src/app/core/_services/_models/client.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
    //this.clientService.getAccountBalance();
    const client:Client = {
      CIN_Number:'AE1562244',
      email:'haithamoumerzoug31@gmail.com',
      lastName:'OUMERZOUG',
      firstName: 'Haitham',
      phone:'06523523654',
      age:28,
      salary:1000261033,
      job:'ingénieur',
      address:'agadir',
      accountBalance:0
    }
    this.clientService.createClient(client)
    .subscribe(res=>{
      console.log(res)},err=>{
        console.log(err)
      })
  }

}
