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
    path:'applyForCredit',
    component:CreditComponent
  },
  {
    path:'uploadDocument',
    component:DocumentComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
