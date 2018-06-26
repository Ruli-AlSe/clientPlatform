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
 	//public status: string;
 	//public message: string;
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
 		/*
 		this.options = {
  			scope: 'email,user_friends,user_likes,user_location,user_photos,user_posts,user_status,pages_show_list',
  			return_scopes: false,
  			enable_profile_selector: true
  		};
 	    this.FB.login(this.options).then((response: LoginResponse) => {
 	    	console.log(response.authResponse)
 	    	//this.identity = response.authResponse;
 	    	//localStorage.setItem('identity', JSON.stringify(this.identity));
 	    	this.params = {
  			scope: 'me?fields=name,email,location',
  			accessToken: response.authResponse.accessToken 
  		}
 	    }).catch((error: any) => console.error(error));

 	    this.FB.api('/me','GET', {"fields":"email,location,first_name,last_name"}).then(res => console.log(res)).catch(e => console.log(e));
 	    */
	 	const loginOptions: LoginOptions = {
	      enable_profile_selector: true,
	      return_scopes: true,
	      scope: 'public_profile,user_friends,email,pages_show_list'
	    };

	    this.fb.login(loginOptions)
	      .then((res: LoginResponse) => {
	        //console.log('Logged in', res);
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
 

/*
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
*/	
 }

