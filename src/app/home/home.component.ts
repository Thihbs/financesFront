import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../finance.service';
import { Total } from '../total.interface';
import { UserDataService } from './../user-data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userSub: Subscription | undefined;
  total: Total | undefined;
  rtotal: any;
  dtotal: any;
  saldototal: any;
  userData: any;

  constructor(
    private financeService: FinanceService,
    public user: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const data:any = localStorage.getItem('data');
    if (data) {
      // Se houver dados, parseie-os e use-os para inicializar as variáveis
      const parsedData = JSON.parse(data);
      this.rtotal = parsedData.rtotal;
      this.dtotal = parsedData.dtotal;
      this.saldototal = parsedData.saldototal;
    } else {
      // Se não houver dados, você pode inicializar com valores padrão ou como desejar
      this.rtotal = 0;
      this.dtotal = 0;
      this.saldototal = 0;
    }
    this.route.url.subscribe(() => {
      this.user.getUserData().subscribe((user) => {
        if (user) {
          this.userData = user;
          console.log('Dados do usuário:', this.userData);
          this.financeService.checkUserFinance(this.userData.nickname).subscribe({
            next: (result) => {
              console.log(result);
            },
            error: (msg) => {
              console.log("Erro na requisição checkFinance: " + msg);
            }
          });

          this.financeService.obterTotal(this.userData.nickname).subscribe({
            next: (result) => {
              this.total = result;
              this.rtotal = this.total.totalReceita;
              this.dtotal = this.total.totalDespesa;
              this.saldototal = this.rtotal - this.dtotal;
              localStorage.setItem('data', JSON.stringify({
                rtotal: this.rtotal,
                dtotal: this.dtotal,
                saldototal: this.saldototal
              }));
            },
            error: (msg) => {
              console.log("Erro na requisição para obter o Total: " + msg);
            }
          });
        } else {
          console.log('Usuário não autenticado.');
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}