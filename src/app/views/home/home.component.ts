import { DocumentService } from './../../core/_services/document/document.service';
import { CreditService } from './../../core/_services/credit/credit.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/_services/client/client.service';
import { Client } from 'src/app/core/_services/_models/client.model';
import Swal from 'sweetalert2';
import { AccessService } from 'src/app/core/_services/access/access.service';
import { Credit } from 'src/app/core/_services/_models/credit.model';


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
  accountBalance : number = 2000;
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
    private documentService:DocumentService,
    private accessService : AccessService
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
    // this.creditForm.reset();
      const id =res.id;
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
        Swal.fire({
          title: 'Votre crédit à été valider',
          text: 'Votre sold maintenant est :<b>'+this.accountBalance+"</b>, et merci de <b>signer<b> ce document.",
          width: 600,
          padding: '3em',
          // background: 'linear-gradient(rgba(103, 58, 183,0.3),rgba(103, 58, 183,0.7))',
          backdrop: `
            rgba(103, 58, 183,0.4)
            url("../../../../assets/images/felicitation.gif")
            left top
            no-repeat
          `
        });
        this.handle(this.clientForm.value,this.creditForm.value);
        this.router.navigate(['/document-validation',{CIN,idCredit}]);
        },
        err=>{
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vous informations sont invalid! Verifiez svp',
          })
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
	isMonthlyValid(){
    const {amount,monthly} = this.creditForm.value;
    if(monthly!=null  && amount!=null){
      return (+amount >= +monthly);
    }
    return true;
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
			return true;
		}
		return false;
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
    Swal.fire({
      title: 'Confirmation',
      text: "Vous voulez valider les informations?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#673AB7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui je confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.initFormData();
        this.createClient();
      }
    })

  }
  initFormData(){
    this.formData.append('CIN_front','' );
    this.formData.append('CIN_back','' );
    this.formData.append('salaryCertificat','');
    this.formData.append('certificateResWaterElec', '');
    this.formData.append('jobCertificate', '');
  }
  handle(client : Client , credit : Credit){
    // Generate access string
    const payload = {firstName:client.firstName,age : client.age , amount : credit.amount};
    const acccess = this.generateClientAccess(payload);
    // Set the access
    console.log(acccess)
    this.accessService.setAccess(acccess);
    // Set client and Credit data in LocalStorage
    this.accessService.setClientData(client,credit);
    // Change access status
    this.clientService.changeAccessStatus(true);
  }
  // Method to generate clent access
  generateClientAccess(data : {firstName : string , age : number , amount : number}){
    const c = data.firstName.charCodeAt(0).toLocaleString()+data.firstName.charCodeAt(1)?.toLocaleString()+data.firstName.charCodeAt(3)?.toLocaleString();
    const b = (data.age+'').charCodeAt(0).toLocaleString()+(data.age+'').charCodeAt(2).toLocaleString();
    const a = (data.amount+'').charCodeAt(2).toLocaleString()+(data.amount+'').charCodeAt(3).toLocaleString()+(data.amount+'').charCodeAt(5).toLocaleString();
    const result :string = a.concat(c,b);
    return result;
  }

}
