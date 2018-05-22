import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL

 //define parametros o metadatos para configuracion del componente
 @Component({
 	selector: 'login',
 	templateUrl: './login.component.html',
 	styleUrls: ['./login.component.css']
 })


 export class LoginComponent implements OnInit 
 {
 	public title:string;
 	
 	//proposito principal es asignar valores a las variables
 	constructor() 
 	{
 		this.title = 'Iniciar Sesión';
 	}

 	ngOnInit()
 	{
 		console.log('login.component cargado correctamente');
 	}
 }

