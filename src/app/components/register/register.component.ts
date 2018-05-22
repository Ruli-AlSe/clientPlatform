import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL
 import { User } from '../../models/user'; //se importa el modelo del usuario

 //define parametros o metadatos para configuracion del componente
 @Component({
 	selector: 'register',
 	templateUrl: './register.component.html',
 	styleUrls: ['./register.component.css']
 })


 export class RegisterComponent implements OnInit 
 {
 	public title:string;
 	public user: User;
 	
 	//proposito principal es asignar valores a las variables
 	constructor() 
 	{
 		this.title = 'Registrar';
 		this.user = new User(1, 'ROLE_USER', '', '', '', '');
 	}

 	ngOnInit()
 	{
 		console.log('register.component cargado correctamente');
 	}
 }

