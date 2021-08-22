import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../_services/access/access.service';
import { ClientService } from '../_services/client/client.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // If client doesn't access
      if(!this.accessService.isAccessValid()){
        // Redirect to home
        this.router.navigate(['/']);
        // Remove all from Local,storage
        this.accessService.removeAll();
        this.clientService.changeAccessStatus(false);
        return false
      }
      return true;
  }
  constructor(
    private clientService : ClientService,
    private router : Router,
    private accessService : AccessService
  ){}
  
}
