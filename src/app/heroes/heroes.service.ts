import { Injectable } from "@angular/core";
import { Hero } from "./heroes.model";
import { Observable, of } from "rxjs";
import { MessagesService } from "src/app/messages/messages.service";

@Injectable({
	providedIn: 'root',
})
export class HeroesService {
	constructor(
		private readonly messagesService: MessagesService,
	) {}

	public getHeroes$(): Observable<Hero[]> {
		this.messagesService.add(`${HeroesService.name}: fetched heroes`);
		return of([
			{ id: 12, name: 'Dr. Nice' },
			{ id: 13, name: 'Bombasto' },
			{ id: 14, name: 'Celeritas' },
			{ id: 15, name: 'Magneta' },
			{ id: 16, name: 'RubberMan' },
			{ id: 17, name: 'Dynama' },
			{ id: 18, name: 'Dr. IQ' },
			{ id: 19, name: 'Magma' },
			{ id: 20, name: 'Tornado' },
		]);
	}
}

