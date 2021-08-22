import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentValidationComponent } from './views/document-validation/document-validation.component';
import { AccessGuard } from './core/_guards/access.guard';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'document-validation',
    component:DocumentValidationComponent,
    canActivate: [AccessGuard]
  },
  {
    path:'**',
    redirectTo :'/' // TODO : Create 404 error page
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }