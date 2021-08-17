import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './views/client/client.component';
import { CreditComponent } from './views/credit/credit.component';
import { DocumentComponent } from './views/document/document.component';

const routes: Routes = [
  {
    path:'',
    component:ClientComponent
  },
  {
    path:'applyForCredit/:CIN',
    component:CreditComponent
  },
  {
    path:'uploadDocument',
    component:DocumentComponent
  },
  {
    path:'home',
    component:HomeComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
