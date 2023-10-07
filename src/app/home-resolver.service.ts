import { Injectable, inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {  of, switchMap } from 'rxjs';
import { FinanceService } from './finance.service';
import { UserDataService } from './user-data-service.service';
import { Total } from './total.interface';



@Injectable()
export class HomeResolverService {
  
}

export const homeResolver: ResolveFn<Total | undefined> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(UserDataService).getUserData().pipe(
       switchMap((user) => {
          console.log("User Data home resolver" + user);
          if (user) {
            return inject(FinanceService).obterTotal(user.nickname);
          } else {
            // Lide com o caso de usuário não autenticado aqui
            return of(undefined);
          }
        })
      );
    };
