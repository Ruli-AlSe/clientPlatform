import { Component, OnInit, DoCheck } from '@angular/core';
//hook de ciclo de vida de un componente (OnInit y DoCheck)
//Se importa el OnInit para crear metodo ngOnInit
import { UserService } from './services/user.service';
//se importa el servicio en el provider para obtener la nformacion del localstorage

//Impportar el servicio de Facebook
import { FacebookService, InitParams } from 'ngx-facebook';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'app';
  public identity;
  public token;

  constructor(private _userService: UserService, private fb: FacebookService)
  {
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
    //Iniciar el sdk de facebook
    fb.init({
      appId: '163638510973296',
      version: 'v3.0'
    });
  }

  ngOnInit()
  {
      
  }

  ngDoCheck()
  {
    //cada que se produce un cambio en un componente o un cambio interno en la aplicacion
    //se ejecuta el codigo de esta funcion
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
