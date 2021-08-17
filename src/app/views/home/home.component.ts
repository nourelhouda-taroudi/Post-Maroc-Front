import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/_services/client/client.service';
import { Client } from 'src/app/core/_services/_models/client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clientForm = new FormGroup({
    CIN_Number : new FormControl(null,[Validators.required]),
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email : new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),
    age: new FormControl(null,[Validators.required]),
    salary: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    job: new FormControl(null,[Validators.required]),
    accountBalance: new FormControl(null,[Validators.required])
  });

  constructor(private clientService:ClientService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
    createClient(){
      // const client:Client = {
  
      // }
      // this.clientService.createClient(this.clientForm.value)
      // .subscribe(res=>{
      //   const CIN=this.clientForm.controls["CIN_Number"].value;
      //   this.router.navigate(['/applyForCredit',CIN]);
      //   this.clientForm.reset();
      // },
      // err=>{
      //     console.log(err)
      //   })
      console.log(this.clientForm.value)
}
}
