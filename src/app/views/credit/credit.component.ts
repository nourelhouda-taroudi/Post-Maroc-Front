import { ClientService } from './../../core/_services/client/client.service';
import { CreditService } from './../../core/_services/credit/credit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createDirectiveDefinitionMap } from '@angular/compiler/src/render3/partial/directive';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  creditForm = new FormGroup({
    amount : new FormControl(null,[Validators.required]),
    monthly : new FormControl(null,[Validators.required])
  })
  CIN:string="";
  constructor(
    private creditService:CreditService,
    private router:Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CIN=this.route.snapshot.params["CIN"];

  }
    createCredit(){
      this.creditService.createCredit(this.creditForm.value,this.CIN)
        .subscribe(res=>{
       this.creditForm.reset();
      this.router.navigate(['/uploadDocument']);
     },
      err=>{
        console.log(err)
      })
    }


}
