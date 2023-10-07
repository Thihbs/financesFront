import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-button-login-auth0',
  template: `
  <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
    <button class="button__container" (click)="auth.logout({ logoutParams: { returnTo: document.location.origin }}) || isLogout()">
      Log out
    </button>
  </ng-container>
  <ng-template #loggedOut>
    <button class="button__container" (click)="auth.loginWithRedirect()">Log in</button>
  </ng-template>
`,
  styleUrls: ['./button-login-auth0.component.css']
})

export class ButtonLoginAuth0Component {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
  }
  isLogout(){
    localStorage.clear();
  }
}
