import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import { Credit } from 'src/app/core/_services/_models/credit.model';
import { DocumentService } from 'src/app/core/_services/document/document.service';
import {Client} from "../../core/_services/_models/client.model";
import {AccessService} from "../../core/_services/access/access.service";
import {ClientService} from "../../core/_services/client/client.service";
import {CreditService} from "../../core/_services/credit/credit.service";

@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {

  constructor(
    private route           : ActivatedRoute,
    private documentService : DocumentService,
    private accessService   : AccessService,
    private router          : Router,
    private clientService   : ClientService,
    private creditService   : CreditService
  ) { }
  CIN_Number : string | any;
  idCredit : number |any;

  dateAujourdHui : Date = new Date();

  credit : Credit | any ;
  client : Client | any;

  generatedFile:string | any;
  ngOnInit(): void {
    this.idCredit = this.route.snapshot.paramMap.get('idCredit');
    this.CIN_Number = this.accessService.getCINClient();
    if(this.idCredit == null || this.CIN_Number == null) this.router.navigate(['/404']);
    this.getClient();
    this.getCredit();
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
      // Export pdf
      setTimeout(function(){}, 4000);
      this.exportAsPDFOrGenerate('MyDIv',true);
    },err=>{
      console.log(err);
    })
  }

  private getClient() {
    this.clientService.getClientByCIN(this.CIN_Number)
      .subscribe(client=>{
        this.client = client
        console.log(client)
      },err=>{
        console.log(err);
      })
  }

  private getCredit() {
    this.creditService.getCreditById(this.idCredit)
      .subscribe(credit=>{
        this.credit = credit;
        console.log(credit)
      },err=>{
        console.log(err);
      })
  }
}
