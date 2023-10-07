import { Component } from '@angular/core';
import { FinanceService } from '../finance.service';
import { UserDataService } from '../user-data-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent {
  formData: any = {
    tipo: '',
    valor: '',
    categoria: '',
    data: '',
  };

  userData: any;

  constructor(private financeService: FinanceService, public user: UserDataService) { 
    
  }

  ngOnInit() {
    this.user.getUserData().subscribe({
      next: (user) => {
        console.log("user" + user.nickname)
        this.userData = user;
        // Envia os dados do formulário para o serviço de finanças
      },
      error: (msg) => {
        console.log('Erro ao obter dados do usuário', msg);
      }
    });
  }
  submitForm() {
      this.financeService.cadastrarFinance(this.formData, this.userData.nickname).subscribe({
          next: (response) => {
            console.log(this.userData.nickname)
            // Limpe os campos após o sucesso do envio
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cadastro realizado com sucesso',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(response)
            this.resetForm();
          },
          error: (msg) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Não foi possivel realizar o cadastro : ' + msg,
            })
          },complete() {
            console.log('Success');
          }
        });
  }

  private resetForm() {
    // Limpa os campos do formulário
    this.formData.valor = '';
    this.formData.categoria = '';
    this.formData.data = '';
    this.formData.tipo = '';
  }
}


