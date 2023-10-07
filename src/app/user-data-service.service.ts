import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private userDataSubject = new Subject<any>();
  private userData: any;

  constructor(private authService: AuthService) {
    // Assine o Observable do Auth0 para receber dados do usuário
    this.authService.user$.subscribe({next: (user) => {
      if (user) {
        // Se o usuário estiver autenticado, atualize this.userData e notifique os assinantes
        this.userData = user;
        this.userDataSubject.next(this.userData);
      } else {
        // Se o usuário não estiver autenticado, defina this.userData como null
        this.userData = null;
        this.userDataSubject.next(null);
      }
    }, error(msg) {
      console.log(msg);
    }
  });
  }

  // Função que retorna um Observable para os dados do usuário
  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
}