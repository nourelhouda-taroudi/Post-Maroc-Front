import { DocumentService } from './../../core/_services/document/document.service';
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
  isChecked:boolean=false;
  imageSrc:any;
  file:any;
  hasFormErrors : boolean = false;
  formData : FormData = new FormData();
  clientForm = new FormGroup({
    CIN_Number : new FormControl(null,[Validators.required]),
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required]),
    age: new FormControl(null,[Validators.required,Validators.min(20),Validators.max(50)]),
    salary: new FormControl(null,[Validators.required,Validators.min(1500)]),
    address: new FormControl(null,[Validators.required]),
    job: new FormControl(null,[Validators.required])
  });
  creditForm = new FormGroup({
    amount : new FormControl(null,[Validators.required,Validators.min(10000)]),
    monthly : new FormControl(null,[Validators.required,Validators.min(1000)])
  });

  constructor(
    private clientService:ClientService,
    private router:Router,
    private creditService:CreditService,
    private documentService:DocumentService

    ) { }

  ngOnInit(): void {
  }
    createClient(){
      // Check form before 
      this.checkClientFormIsValid();
      this.clientService.createClient(this.clientForm.value)
      .subscribe(res=>{
        const CIN=this.clientForm.controls["CIN_Number"].value;
        // this.clientForm.reset();
        this.createCredit();
      },
      err=>{
          console.log(err)
        })
  }
  createCredit(){
    this.checkCreditFormIsValid();
    const CIN=this.clientForm.controls["CIN_Number"].value;
    this.creditService.createCredit(this.creditForm.value,CIN)
    .subscribe(res=>{
      console.log(res)
    // this.creditForm.reset();
      const id =res.id;
      console.log(id)
      this.uploadDocument(id);
   },
    err=>{
      console.log(err)
    })
  }
  uploadDocument(idCredit:number){
    const CIN=this.clientForm.controls["CIN_Number"].value; 
    this.documentService.uploadDocument(this.formData, CIN)
      .subscribe(res=>{
        // this.documentForm.reset();
        console.log(res)
        this.router.navigate(['/document-validation',{CIN,idCredit}]);
        },
        err=>{
          console.log(err)
        })
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
  isDocumentControlHasError(controlName: string, validationType: string): boolean {
		const control = this.creditForm.controls[controlName];
		if (!control) {
			return false;
		}
    return control.hasError(validationType) && (control.dirty || control.touched);
	}
  onFileChange(event:any,formName:string) {
    var reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageSrc=file;
        
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imageSrc=reader.result;
      }
      this.formData.set(formName,file,file.name);
      console.log(this.formData.get(formName));
        
    }        
  }

  isAmountValid(){
    const amount = this.creditForm.controls['amount'].value;
    const salary = this.clientForm.controls['salary'].value;
    const age = this.clientForm.controls['age'].value;
    if(amount!=null && salary!=null && age!=null){
      if(amount>=1500 && amount<4000){
        const max = 200000;
        if(amount>=max){
          return false
        }
        return true
      }
   
    if(salary >= 4000 && salary < 10000){
      let max = 60000
      if(age>=40) max=400000;

      if(amount>=max){
        return false;
      }
      return true;
    }
    if(salary >= 10000 && salary < 50000){
      let max = 1000000
      if(age>=40)max=800000;
      if(amount>=max){
        return false;
      }
      return true;
    }
  }
    return true;
  }

  // Check Form is valid
	checkClientFormIsValid() {
		this.hasFormErrors = false;
		const controls     = this.clientForm.controls;
		if (this.clientForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				this.clientForm.controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
	}
  checkCreditFormIsValid() {
		this.hasFormErrors = false;
		const controls     = this.creditForm.controls;
		if (this.creditForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				this.creditForm.controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}
	}

  submit(){
    this.initFormData();
    this.createClient();
  }
  initFormData(){
    this.formData.append('CIN_front','' );
    this.formData.append('CIN_back','' );
    this.formData.append('salaryCertificate','');
    this.formData.append('certificateResWaterElec', '');
    this.formData.append('jobCertificate', '');
  }

}
