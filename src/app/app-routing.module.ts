import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentValidationComponent } from './views/document-validation/document-validation.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'document-validation',
    component:DocumentValidationComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }