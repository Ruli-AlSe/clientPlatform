import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './components/default/default.component';
import { QueryComponent } from './components/query/query.component';

//Para login con Facebook
import { SocialLoginModule, AuthServiceConfig } from "angular5-social-login";
import { FacebookLoginProvider } from "angular5-social-login"; 

//importar el SDK de Facebook
import { FacebookModule } from 'ngx-facebook';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("163638510973296")
        },
      ]);
  return config;
}


@NgModule({
  declarations: [
  //Definir directivas, componentes y pipes para mostrarse vistas de web 
    AppComponent,
    LoginComponent,
    DefaultComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    FacebookModule.forRoot()
  ],
  providers: [
  appRoutingProviders,
  { provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
