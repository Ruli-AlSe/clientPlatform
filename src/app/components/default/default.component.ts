import { Component, OnInit, } from '@angular/core';
 //El Component sirve para definir los componentes, y OnInit para definir na interfaz 
 //que nos provea de metodos que se ejecutaran
 import { Router, ActivatedRoute, Params} from '@angular/router';
 //Router son las librerias del router para navegacion
 //Params para recoger parametros por URL


 //define parametros o metadatos para configuracion del componente
 @Component({
 	selector: 'default',
 	templateUrl: './default.component.html'
 })


 export class DefaultComponent implements OnInit 
 {
 	public title:string;
 	
 	//proposito principal es asignar valores a las variables
 	constructor(private _route: ActivatedRoute, private _router: Router) 
 	{
 		this.title = 'Inicio';
 	}

 	ngOnInit()
 	{
 		//console.log('default.component cargado correctamente');
 	}
 }

