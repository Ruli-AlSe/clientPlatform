import { ModuleWithProviders } from '@angular/core'; //Configurar rutas
import { Routes, RouterModule } from '@angular/router';	//

//importar componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
	{path:'', component: LoginComponent},
	{path:'login', component: LoginComponent},
	{path:'register', component: RegisterComponent},
	{path:'**', component: LoginComponent}
];

//para cargar los registros
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);