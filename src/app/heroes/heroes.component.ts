import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Hero } from './heroes.model';
import { HeroesService } from 'src/app/heroes/heroes.service';
import { MessagesService } from 'src/app/messages/messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
	public heroes: WritableSignal<Hero[]> = signal([]);
	public selectedHero?: Hero;

	private readonly heroesService = inject(HeroesService);

	public ngOnInit(): void {
		this.#initHeroes();
	}

	public add(name: string): void {
		name = name.trim();
		if (!name) {
			return;
		}
		this.heroesService.addHero$({ name } as Hero).subscribe(hero => {
			this.heroes.set([...this.heroes(), hero]);
		});
	}

	public delete(hero: Hero): void {
		this.heroes.set(this.heroes().filter(h => h !== hero));
		this.heroesService.deleteHero(hero.id).subscribe();
	}

	#initHeroes(): void {
		this.heroesService.getHeroes$()
			.subscribe(heroes => this.heroes = signal(heroes));
	}
}
