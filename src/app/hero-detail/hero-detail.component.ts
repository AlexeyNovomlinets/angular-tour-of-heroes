import { Location } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/heroes/heroes.model';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent {
	private readonly route = inject(ActivatedRoute);
	private readonly heroesService = inject(HeroesService);
	private readonly location = inject(Location);

	@Input() hero?: Hero;

	public ngOnInit(): void {
		this.#getHero();
	}

	public goBack(): void {
		this.location.back();
	}

	#getHero(): void {
	const id = Number(this.route.snapshot.paramMap.get('id'));
	this.heroesService.getHero$(id)
		.subscribe(hero => this.hero = hero);
	}
}
