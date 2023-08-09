import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { HeroDetailComponent } from 'src/app/hero-detail/hero-detail.component';
import { HeroesComponent } from 'src/app/heroes/heroes.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'heroes', component: HeroesComponent },
	{ path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
