import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableReceitasAdicionadasComponent } from '../table-receitas-adicionadas/table-receitas-adicionadas.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './home.component';
import { TableReceitasAdicionadasModule } from '../table-receitas-adicionadas/table-receitas-adicionadas.module';

@NgModule({
  declarations: [HomeComponent,BarChartComponent],
  imports: [CommonModule, NgChartsModule,TableReceitasAdicionadasModule],
  exports: [HomeComponent],
})

export class HomeModule {

}