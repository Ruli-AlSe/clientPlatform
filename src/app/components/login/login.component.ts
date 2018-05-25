import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL
 import { User } from '../../models/user';

 import { UserService } from '../../services/user.service';

 //define parametros o metadatos para configuracion del componente
 @Component({
 	selector: 'login',
 	templateUrl: './login.component.html',
 	styleUrls: ['./login.component.css'],
 	providers: [ UserService ]
 })


 export class LoginComponent implements OnInit 
 {
 	public title:string;
 	public user: User;
 	
 	//proposito principal es asignar valores a las variables
 	constructor(private _userService: UserService) 
 	{
 		this.title = 'Iniciar Sesión';
 		this.user = new User(1, 'ROLE_USER', '', '', '', '');
 	}

 	ngOnInit()
 	{
 		console.log('login.component cargado correctamente');
 	}

 	onSubmit(form)
 	{
 		//console.log(this.user);

 		this._userService.signup(this.user).subscribe(
 			response => {
 				//token
 				console.log(response);

 				this._userService.signup(this.user, true).subscribe(
 						response => {
 							console.log(response)
 						},
 						error => {
 							console.log(<any>error);
 						});
 			},
 			error => {
 				console.log(<any>error);
 			});
 	}
 }

