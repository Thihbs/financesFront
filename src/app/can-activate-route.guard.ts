import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard{
  dataUser:any;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authService.isAuthenticated$.subscribe({next: (user) => {
      this.dataUser = user; 
    },error(msg){
      console.log(msg);
    }
  });
    console.log(this.dataUser);
    if (this.dataUser) {
      // O usuário está autenticado, permita o acesso à rota
      return true;
    } else {
      // O usuário não está autenticado, redirecione-o para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}



export const canActivateTeam: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(AuthGuard).canActivate(route,state);
};