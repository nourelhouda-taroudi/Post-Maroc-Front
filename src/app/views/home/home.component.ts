import { CreditService } from './../../core/_services/credit/credit.service';
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
  imageSrc:any;
  clientForm = new FormGroup({
    CIN_Number : new FormControl(null,[Validators.required]),
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required]),
    age: new FormControl(null,[Validators.required]),
    salary: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    job: new FormControl(null,[Validators.required])
  });
  creditForm = new FormGroup({
    amount : new FormControl(null,[Validators.required]),
    monthly : new FormControl(null,[Validators.required])
  });
  documentForm = new FormGroup({
    CIN_front : new FormControl(null,[Validators.required]),
    CIN_back : new FormControl(null,[Validators.required]),
    salaryCertificat : new FormControl(null,[Validators.required]),
    certificateResWaterElec : new FormControl(null,[Validators.required]),
    jobCertificate : new FormControl(null,[Validators.required])
  })

  constructor(private clientService:ClientService,
    private router:Router,
    private creditService:CreditService
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
  }
  createCredit(){
  //   this.creditService.createCredit(this.creditForm.value,this.CIN)
  //     .subscribe(res=>{
  //    this.creditForm.reset();
  //   this.router.navigate(['/uploadDocument']);
  //  },
  //   err=>{
  //     console.log(err)
    // })
  }
  // Check if one of form control has an error
	isClientControlHasError(controlName: string, validationType: string): boolean {
		const control = this.clientForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
  isCreditControlHasError(controlName: string, validationType: string): boolean {
		const control = this.creditForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}
  onFileChange(event:any,formControl:string) {
    // const reader = new FileReader();
    
    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    
    //   reader.onload = () => {
   
    //     this.imageSrc = reader.result as string;
    if (event.target.files.length === 0)
      return;
 
    var mimeType = event.target.files[0].type;
      const selectedImg=<File>event.target.files[0]
      this.documentForm.patchValue({
        formControl:selectedImg
      });
      var reader = new FileReader();
      // this.imageSrc = event.target.files; 
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.imageSrc=reader.result;

      }
  }
  uploadDocument(){
    console.log(this.documentForm.value);
  }

}
