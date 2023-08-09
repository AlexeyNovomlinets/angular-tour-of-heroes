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
	private readonly messagesService = inject(MessagesService);

	public ngOnInit(): void {
		this.#initHeroes();
	}

	public onSelect(hero: Hero): void {
		this.selectedHero = hero;
		this.messagesService.add(
			`${HeroesComponent.name}: Selected hero id=${hero.id}`
		);
	}

	#initHeroes(): void {
		this.heroesService.getHeroes$()
			.subscribe(heroes => this.heroes = signal(heroes));
	}
}
