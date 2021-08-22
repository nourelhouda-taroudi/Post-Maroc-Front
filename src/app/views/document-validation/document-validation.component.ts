import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Credit } from 'src/app/core/_services/_models/credit.model';
import { DocumentService } from 'src/app/core/_services/document/document.service';

@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {

  constructor(
    private route           : ActivatedRoute,
    private documentService : DocumentService
  ) { }
  name : string = "Haitham";
  CIN_Number : number = 0;
  firstName : string = "";
  lastName : string = "";
  duration : number = 0;
  monthly : number = 0;
  amount : number =0;
  dateAujourdHui : Date = new Date();
  credit : Credit | any ;
  idCredit : number |any;
  generatedFile:string | any;
  pdf : any;
  signature : boolean = false;
  ngOnInit(): void {
    this.idCredit = this.route.snapshot.paramMap.get('idCredit');
    // Genrate the pdf file base 64
    this.exportAsPDFOrGenerate('MyDIv',false);
  }
  exportAsPDFOrGenerate(div_id : string , saveIt:boolean)
  {
    var w = document.getElementById(div_id) as HTMLCanvasElement;
    var h = document.getElementById(div_id) as HTMLCanvasElement ;
    let data = document.getElementById(div_id) as HTMLCanvasElement;  
    html2canvas(data).then(canvas => {   
      var img = canvas.toDataURL("image/jpeg", 1);
      var doc = new jsPDF('l', 'px', [w.offsetWidth, h.offsetHeight]);
      doc.addImage(img, 'JPEG', 0, 0,w.offsetWidth, h.offsetHeight);
      saveIt?doc.save('Credit-N°'+this.idCredit+'.pdf'):this.generatedFile = doc.output('datauristring');
    }); 
  }

  signer(){
    this.documentService.signer(this.idCredit,this.generatedFile)
    .subscribe(res=>{
      this.signature = true;
      // Export pdf
      setTimeout(function(){}, 4000);
      this.exportAsPDFOrGenerate('MyDIv',true);
    },err=>{
      console.log(err);
    })
  }

}
