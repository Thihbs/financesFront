import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { IncomeComponent } from './income/income.component';
import { ReportsComponent } from './reports/reports.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
 // Redirecionar para a página de login se a URL estiver vazia
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'cadastrar', component: CadastroComponent},
  { path: 'income', component: IncomeComponent },
  { path: 'reports', component: ReportsComponent},
  { path: '**', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule{
  
}