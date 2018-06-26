import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()

export class UserService
{
	public url: string;
	public identity;
	public token;

	constructor(public _http: HttpClient)
	{
		this.url = GLOBAL.url;
	}

	loginFB(user): Observable<any>
	{
		//Obtener el objeto user y transformarlo a formate JSON
		let json = JSON.stringify(user);
		let params = 'json='+json;
		console.log(params);

		//Establecer cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		//peticion AJAX por POST
		return this._http.post(this.url+'loginFB', params, {headers: headers});
	}

	getIdentity()
	{
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != 'undefined')
		{
			this.identity = identity;
		}
		else
		{
			this.identity = null;
		}

		return this.identity;
	}

	getToken()
	{
		let token = localStorage.getItem('token');

		if(token != 'undefined')
		{
			this.token = token;
		}
		else
		{
			this.token = null;
		}

		return this.token;
	}
}