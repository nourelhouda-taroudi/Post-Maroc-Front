import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule , ReactiveFormsModule} from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientService } from './core/_services/client/client.service';
import { CreditService } from './core/_services/credit/credit.service';
import { DocumentService } from './core/_services/document/document.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { DocumentValidationComponent } from './views/document-validation/document-validation.component';
import { NavbarComponent } from './views/partials/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentValidationComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
	  ReactiveFormsModule,
    FormsModule
	
  ],
  providers: [
    ClientService,
    CreditService,
    DocumentService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
