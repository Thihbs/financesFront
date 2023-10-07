import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { ButtonLoginAuth0Component } from './login/button-login-auth0/button-login-auth0.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ButtonLoginAuth0Component,
        LoginComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
    BrowserModule,
        HomeModule,
        AppRoutingModule,
        CadastroModule,
        HttpClientModule,
        AuthModule.forRoot({
            domain: environment.auth0.domain,
            clientId: environment.auth0.clientId,
            authorizationParams: {
              redirect_uri: window.location.origin,
            }
          }),
    ]
})

export class AppModule {
    
}


