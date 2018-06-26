import { ModuleWithProviders } from '@angular/core'; //Configurar rutas
import { Routes, RouterModule } from '@angular/router';	//

//importar componentes
import { LoginComponent } from './components/login/login.component';
import { QueryComponent } from './components/query/query.component';
import { DefaultComponent } from './components/default/default.component';


const appRoutes: Routes = [
	{path:'', component: DefaultComponent},
	{path:'login', component: LoginComponent},
	{path:'logout/:sure', component: LoginComponent},
	{path:'query', component: QueryComponent},
	{path:'**', component: DefaultComponent}
	
];

//para cargar los registros
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);