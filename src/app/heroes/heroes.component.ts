import { Component, WritableSignal, signal } from '@angular/core';
import { Hero } from './heroes.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
	public readonly hero: WritableSignal<Hero> = signal({
		id: 1,
		name: 'Windstorm',
	});
}
