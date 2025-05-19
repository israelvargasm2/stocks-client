import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CreateStockComponent } from './components/create-stock/create-stock.component';
import { EditStockComponent } from './components/edit-stock/edit-stock.component';
import { authenticationGuard } from './core/authentication/authentication.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [authenticationGuard] },
    { path: "dashboard", component: DashboardComponent, canActivate: [authenticationGuard] },
    { path: "administrator", component: AdministratorComponent, canActivate: [authenticationGuard] },
    { path: "administrator/stocks/create", component: CreateStockComponent, canActivate: [authenticationGuard] },
    { path: "administrator/stocks/edit/:id", component: EditStockComponent, canActivate: [authenticationGuard] },
    { path: "login", component: LoginComponent },
];
