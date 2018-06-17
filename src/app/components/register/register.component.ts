import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL
 import { User } from '../../models/user'; //se importa el modelo del usuario
 import { UserService } from '../../services/user.service';

 //define parametros o metadatos para configuracion del componente
 @Component({
 	selector: 'register',
 	templateUrl: './register.component.html',
 	styleUrls: ['./register.component.css'],
 	providers: [UserService]
 })


 export class RegisterComponent implements OnInit 
 {
 	public title:string;
 	public user: User;
 	public status: string;
 	public message: string;
 	public identity;
 	
 	//proposito principal es asignar valores a las variables
 	constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) 
 	{
 		this.title = 'Registrar';
 		this.user = new User(1, 'ROLE_USER', '', '', '');
 		this.identity = _userService.getIdentity();
 	}

 	ngOnInit()
 	{
 		if (this.identity != null) {
 			this._router.navigate(['']);
 		}
 		else
 		{
 			console.log('register.component cargado correctamente');
 		}
 	}

 	onSubmit(form)
 	{
 		//console.log(this.user);
 		//console.log(this._userService.prueba());

 		this._userService.register(this.user).subscribe(
 			response => {
 				console.log(response.status)
 				if (response.status == 'success') 
 				{
 					this.status = response.status;	

 					//Vaciar formulario
 					//this.user = new User(1, 'ROLE_USER', '', '', '', '');
 					form.reset(); 
 				}
 				else
 				{
 					this.status = 'error';
 					this.message = response.message;
 				}

 			}, error =>{console.log(<any>error)})
 	}
 }

