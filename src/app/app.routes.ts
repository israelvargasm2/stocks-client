import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { CreateStockComponent } from './components/create-stock/create-stock.component';
import { EditStockComponent } from './components/edit-stock/edit-stock.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "administrator", component: AdministratorComponent },
    { path: "administrator/stocks/create", component: CreateStockComponent }, 
    { path: "administrator/stocks/edit/:id", component: EditStockComponent },
];
