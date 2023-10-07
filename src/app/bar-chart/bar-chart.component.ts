import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { UserDataService } from '../user-data-service.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public totReceitaMes: number = 0;
  public totDespesaMes: number = 0;
  public chartData: any;
  public chartData2: any;

  public chartLabels: string[] = ['Setembro'];
  public chartType: any = 'bar';
  public chartOptions: any = {
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    aspectRatio: 3.0,
  };

  constructor(private financeService: FinanceService, public user: UserDataService) { }

  ngOnInit() {
    this.initLocalStorageDataBarChart();
    this.user.getUserData().subscribe({
      next: (user) => {
        this.financeService.obterTotal(user.nickname).subscribe({
          next: (result) => {
            this.totReceitaMes = result.totalReceita;
            this.totDespesaMes = result.totalDespesa;
            this.chartData = [
              {
                data: [this.totReceitaMes],
                label: 'Receita',
              },
              {
                data: [this.totDespesaMes],
                label: 'Despesa',
              }
            ];
            this.chartData2 = [...this.chartData]; // Copia os dados
            this.updateLocalStorageDataBarChart(result.totalReceita, result.totalDespesa);
          },
          error: (msg) => {
            console.log(msg);
          }
        });
      },
      error: (msg) => {
        console.log(msg);
      }
    });
  }

  private initLocalStorageDataBarChart() {
    const data: any = localStorage.getItem('dataBarChart');
    if (data) {
      const parsedData = JSON.parse(data);
      this.totReceitaMes = parsedData.totReceitaMes;
      this.totDespesaMes = parsedData.totDespesaMes;
    } else {
      this.totReceitaMes = 0;
      this.totDespesaMes = 0;
    }
  }

  private updateLocalStorageDataBarChart(totReceitaMes: number, totDespesaMes: number) {
    localStorage.setItem('dataBarChart', JSON.stringify({
      totReceitaMes: totReceitaMes,
      totDespesaMes: totDespesaMes
    }));
  }
}