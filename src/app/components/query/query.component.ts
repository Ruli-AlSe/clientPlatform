import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
 	selector: 'query',
 	templateUrl: './query.component.html',
 	styleUrls: ['./query.component.css']
 })

export class QueryComponent implements OnInit {
	
	constructor(private _route: ActivatedRoute, private _router: Router) 
	{
		// code...
	}

	ngOnInit()
	{
		//console.log('query.component cargado');
	}
}