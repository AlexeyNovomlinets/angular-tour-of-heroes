import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Hero } from 'src/app/heroes/heroes.model';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit {
	public heroes: WritableSignal<Hero[]> = signal([]);

	private readonly heroesService = inject(HeroesService);

	public ngOnInit(): void {
		this.#initHeroes();
	}

	#initHeroes(): void {
		this.heroesService.getHeroes$()
			.subscribe(heroes => this.heroes = signal(heroes.slice(1, 5)));
	}
}
