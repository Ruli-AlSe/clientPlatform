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
import { FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';

//declare const FB: any;
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
 	public params;
 	
 	//proposito principal es asignar valores a las variables
 	constructor(private fb: FacebookService, private _userService: UserService, private _route: ActivatedRoute, private _router: Router, private _socialAuthService: AuthService) 
 	{
 		this.title = 'Iniciar Sesión';
 		this.user = new User(1, '', '', '', '');
 		this.identity = _userService.getIdentity();
 	}

 	ngOnInit()
 	{
 		if (this.identity != null) {
 			this._router.navigate(['']);
 		}
 		this.logout();
 	}

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

 	facebookLogin() 
 	{
	 	const loginOptions: LoginOptions = {
	      enable_profile_selector: true,
	      return_scopes: true,
	      scope: 'public_profile,user_friends,email,pages_show_list'
	    };

	    this.fb.login(loginOptions)
	      .then((res: LoginResponse) => {
	        this.getProfile();
	      })
	      .catch(this.handleError);
	 }

	private handleError(error) {
    	console.error('Error processing action', error);
  	}

	getProfile() 
  {
  	this.fb.api('/me?fields=email,first_name,last_name,picture{url}')
    	.then((res: any) => {
      	//console.log(res);
        this.identity = res;
        this.user.id = res.id;
        this.user.first_name = res.first_name;
        this.user.last_name = res.last_name;
        this.user.sm = 'Facebook';
        this.user.email = res.email;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this._userService.loginFB(this.user).subscribe(
            response => {
                console.log(response);
                this._router.navigate(['']);
        },
        error => {
          console.log(<any>error);
        });
    	})
    	.catch(this.handleError);
}
 
 }

