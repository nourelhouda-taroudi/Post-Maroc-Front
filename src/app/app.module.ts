import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientService } from './core/_services/client/client.service';
import { CreditService } from './core/_services/credit/credit.service';
import { DocumentService } from './core/_services/document/document.service';
import { ClientComponent } from './views/client/client.component';
import { CreditComponent } from './views/credit/credit.component';
import { DocumentComponent } from './views/document/document.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    CreditComponent,
    DocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ClientService,
    CreditService,
    DocumentService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
