import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public nickName: string = '';
  userData: any;

  constructor(public user: UserDataService ) {

  }

  capitalizeFirstLetter(input: string): string {
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  ngOnInit() {
    this.user.getUserData().subscribe({next: (user) => {
      if (user) {
        this.userData = user;
        this.nickName = this.capitalizeFirstLetter(this.userData.nickname);
      } else {
        // Usuário não autenticado, lide com isso aqui
        console.log('Usuário não autenticado.');
      };
    },error(msg){
      console.log("Erro ao tentar validar  o usuario: " + msg)
    }
  });
  }
}
