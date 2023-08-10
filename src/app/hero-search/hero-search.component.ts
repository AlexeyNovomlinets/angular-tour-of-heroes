import { Component, inject } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from 'src/app/heroes/heroes.model';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent {
	public heroes$!: Observable<Hero[]>;

	#searchTerms = new Subject<string>();
	#heroesService = inject(HeroesService);

	public ngOnInit(): void {
		this.heroes$ = this.#searchTerms.pipe(
		  debounceTime(300),
		  distinctUntilChanged(),
		  switchMap((term: string) => this.#heroesService.searchHeroes(term)),
		);
	}

	public search(term: string): void {
		this.#searchTerms.next(term);
	}
}
