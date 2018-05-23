import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()

export class UserService
{
	public url: string;

	constructor(public _http: HttpClient)
	{
		this.url = GLOBAL.url;
	}

	prueba()
	{
		return this.url;
	}

	register(user): Observable<any>
	{
		//Obtener el objeto user y transformarlo a formate JSON
		let json = JSON.stringify(user);
		let params = 'json='+json;

		//Establecer cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		//peticion AJAX por POST
		return this._http.post(this.url+'register', params, {headers: headers});
	}
}