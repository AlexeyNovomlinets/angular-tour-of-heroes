import { Injectable, inject } from "@angular/core";
import { Hero } from "./heroes.model";
import { Observable, catchError, of, tap } from "rxjs";
import { MessagesService } from "src/app/messages/messages.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: 'root',
})
export class HeroesService {
	readonly #heroesUrl = 'api/heroes';
	readonly #httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	readonly #HEROES = [
		{ id: 12, name: 'Dr. Nice' },
		{ id: 13, name: 'Bombasto' },
		{ id: 14, name: 'Celeritas' },
		{ id: 15, name: 'Magneta' },
		{ id: 16, name: 'RubberMan' },
		{ id: 17, name: 'Dynama' },
		{ id: 18, name: 'Dr. IQ' },
		{ id: 19, name: 'Magma' },
		{ id: 20, name: 'Tornado' },
	];

	private readonly http = inject(HttpClient);
	private readonly messagesService = inject(MessagesService);

	public getHeroes$(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.#heroesUrl).pipe(
			tap(() => this.#log('fetched heroes')),
			catchError(this.#handleError<Hero[]>('getHeroes', []))
		  );
	}

	public getHero$(id: number): Observable<Hero> {
		const url = `${this.#heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(() => this.#log(`fetched hero id=${id}`)),
			catchError(this.#handleError<Hero>(`getHero id=${id}`)),
		);
	}

	public updateHero$(hero: Hero): Observable<any> {
		return this.http.put(this.#heroesUrl, hero, this.#httpOptions).pipe(
			tap(() => this.#log(`updated hero id=${hero.id}`)),
			catchError(this.#handleError<any>('updateHero')),
		);
	}

	public addHero$(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.#heroesUrl, hero, this.#httpOptions).pipe(
			tap((newHero: Hero) => this.#log(`added hero w/ id=${newHero.id}`)),
			catchError(this.#handleError<Hero>('addHero')),
		);
	}

	public deleteHero(id: number): Observable<Hero> {
		const url = `${this.#heroesUrl}/${id}`;
		return this.http.delete<Hero>(url, this.#httpOptions).pipe(
			tap(() => this.#log(`deleted hero id=${id}`)),
			catchError(this.#handleError<Hero>('deleteHero')),
		);
	}

	public searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.#heroesUrl}/?name=${term}`).pipe(
			tap(x => x.length ?
			this.#log(`found heroes matching "${term}"`) :
			this.#log(`no heroes matching "${term}"`)),
			catchError(this.#handleError<Hero[]>('searchHeroes', [])),
		);
	}

	#handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
		return (error: any): Observable<T> => {
		  console.error(error);
		  this.#log(`${operation} failed: ${error.message}`);
		  return of(result as T);
		};
	  }

	#log(message: string) {
		this.messagesService.add(`HeroService: ${message}`);
	}
}

