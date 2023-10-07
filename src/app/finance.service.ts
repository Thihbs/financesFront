import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Finance } from './finance.interface';
import { Total } from './total.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private apiUrl = environment.baseUrl; // Substitua pelo URL da sua API

  constructor(private http: HttpClient) {}

  cadastrarFinance(data: any, userId: string) {
    // Envie os dados para a API usando o método POST
    return this.http.post(`${this.apiUrl}/api/finance/${userId}`, data);
  }

  checkUserFinance(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/checkUser/${userId}`);
  }
  obterTotal(userId: string): Observable<Total> {
    return this.http.get<Total>(`${this.apiUrl}/api/finances/total/${userId}`);
  }
          
  dados:any;

  capitalizeFirstLetter(input: string): string | undefined {
    if(input === undefined) {
      console.error();
      return;
    } 
    return input.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  formatNumber(input: string): string | undefined {
    if(input === undefined) {
      return;
    }
    // Remove todos os caracteres não numéricos, exceto ponto (.)
    const cleanedNumber = input.replace(/[^0-9.]/g, '');
    // Remove todos os pontos (.) para obter o número sem formatação de milhares
    const numberWithNoThousandsSeparator = cleanedNumber.replace(/\./g, '');
    return numberWithNoThousandsSeparator;
  }
  
  obterFinance(userId: string): Observable<Finance[]> {
    return this.http.get(`${this.apiUrl}/api/finance/${userId}`).pipe(
      map((response: any) => {
        const transactions = Object.values(response);
        return transactions.map((transaction: any) => {
          return {
            categoria: this.capitalizeFirstLetter(transaction.categoria),
            tipo: transaction.tipo,
            data: transaction.data,
            valor: this.formatNumber(transaction.valor)
          };
        });
      })
    );
  }
}