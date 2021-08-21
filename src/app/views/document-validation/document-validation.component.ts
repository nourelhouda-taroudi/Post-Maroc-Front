import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.css']
})
export class DocumentValidationComponent implements OnInit {

  constructor() { }
  CIN_number : number = 0;
  firstName : string = "";
  lastName : string = "";
  duration : number = 0;
  monthly : number = 0;
  amount : number =0;
  ngOnInit(): void {
  }
  exportAsPDF(div_id : string)
  {
    var w = document.getElementById(div_id) as HTMLCanvasElement;
    var h = document.getElementById(div_id) as HTMLCanvasElement ;
    let data = document.getElementById(div_id) as HTMLCanvasElement;  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      //let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      // var pdf = new jsPDF('p', 'mm');
      // pdf.addImage(contentDataURL, 'PNG', 10, 10);
      //let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      //pdf.addImage(contentDataURL, 'PNG', 0,0,canvas.width, canvas.height);  
      // pdf.save('Filename.pdf');   
      var img = canvas.toDataURL("image/jpeg", 1);
      var doc = new jsPDF('l', 'px', [w.offsetWidth, h.offsetHeight]);
      doc.addImage(img, 'JPEG', 0, 0,w.offsetWidth, h.offsetHeight);
      doc.save('sample-file.pdf');
      //var file = doc.output('datauri');
      //console.log(file);
    }); 
  }

}

