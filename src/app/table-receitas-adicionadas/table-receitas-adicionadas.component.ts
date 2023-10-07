import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { Finance } from '../finance.interface';
import { UserDataService } from '../user-data-service.service';

@Component({
  selector: 'app-table-receitas-adicionadas',
  templateUrl: './table-receitas-adicionadas.component.html',
  styleUrls: ['./table-receitas-adicionadas.component.css']
})
export class TableReceitasAdicionadasComponent implements OnInit {
  dados: Finance[] = [];
  userData: any;

  constructor(private financeService: FinanceService, public user: UserDataService) {
  }

  ngOnInit() {
    this.initLocalStorageDataTable();
    this.user.getUserData().subscribe((user) => {
      if (user) {
        this.userData = user;
        this.financeService.obterFinance(this.userData?.nickname).subscribe({
          next: (response: Finance[]) => {
            this.dados = response;
            console.log('Dados recebidos:', this.dados);
            this.updateLocalStorageDataTable();
          },
          error: (msg) => {
            console.error('Erro ao buscar dados:', msg);
          }
        });
      } else {
        // Usuário não autenticado, lide com isso aqui
        console.log('Usuário não autenticado.');
      }
    });
  }

  private initLocalStorageDataTable() {
    const data: any = localStorage.getItem('dataTable');
    if (data) {
      const parsedData = JSON.parse(data);
      this.dados = parsedData.dados;
    } else {
      this.dados = [];
    }
  }

  private updateLocalStorageDataTable() {
    localStorage.setItem('dataTable', JSON.stringify({
      dados: this.dados
    }));
  }
}