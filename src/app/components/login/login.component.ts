import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL
 import { User } from '../../models/user';

 import { UserService } from '../../services/user.service';

 //Para login con Facebook
 import { AuthService, FacebookLoginProvider } from 'angular5-social-login';


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
 	public token;
 	public identity;
 	public status: string;
 	public message: string;
 	
 	//proposito principal es asignar valores a las variables
 	constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router, private _socialAuthService: AuthService) 
 	{
 		this.title = 'Iniciar Sesión';
 		this.user = new User(1, 'ROLE_USER', '', '', '', '');
 		this.identity = _userService.getIdentity();
 	}

 	ngOnInit()
 	{
 		if (this.identity != null) {
 			this._router.navigate(['']);
 		}
 		this.logout();
 	}
/*
 	onSubmit(form)
 	{
 		//console.log(this.user);

 		this._userService.signup(this.user).subscribe(
 			response => {
 				//token
 				if (response.status != 'error') 
 				{
 					this.status = 'success';
	 				this.token = response;

	 				//crear espacio en local storage
	 				localStorage.setItem('token', this.token);

	 				this._userService.signup(this.user, true).subscribe(
	 						response => {
	 							//console.log(response)
	 							this.identity = response;
	 							//en el local storage solo se pueden almacenar datos en JSON
	 							localStorage.setItem('identity', JSON.stringify(this.identity));

	 							form.reset();

	 							this._router.navigate([''])
	 						},
	 						error => {
	 							console.log(<any>error);
	 						});
	 			}
	 			else
	 			{
	 				this.status = 'error';
	 				this.message = response.message;
	 			}
 			},
 			error => {
 				console.log(<any>error);
 			});
 	}
*/
 	logout()
 	{
 		this._route.params.subscribe(params =>{
 			let logout = +params['sure'];

 			if (logout == 1) 
 			{
 				//borrar dato de local storage
 				localStorage.removeItem('identity');
 				localStorage.removeItem('token');

 				this.identity = null;
 				this.token = null;

 				//redireccion
 				this._router.navigate(['']);
 			}
 		});
 	}

 	public facebookLogin() 
 	{
    	let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    	this._socialAuthService.signIn(socialPlatformProvider).then(
      		(userData) => {
            	//console.log(userData);
            	this.identity = userData;
        		this._userService.loginFB(this.identity).subscribe(
        			response => {
        				if (response.status != 'error') {
        					console.log(response.message);
        				}
        	},
        	error => {
        		console.log(<any>error);
        	});
            	localStorage.setItem('identity', JSON.stringify(this.identity));
            	this._router.navigate(['']);
       		});
	}
 }

