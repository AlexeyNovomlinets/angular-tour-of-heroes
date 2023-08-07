import { Component, WritableSignal, signal } from '@angular/core';
import { Hero } from './heroes.model';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
	public readonly heroes: WritableSignal<Hero[]> =
		signal(this.heroesService.getHeroes());

	public selectedHero?: Hero;

	constructor(
		private readonly heroesService: HeroesService,
	) {}

	public onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
}
