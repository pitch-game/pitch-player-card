import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Card } from '../models/card';
import anime from 'animejs';
import { Observable } from 'rxjs';

var nextId = 0;
@Component({
    selector: "pitch-player-card",
    templateUrl: "player-card.component.html",
    styleUrls: ["player-card.component.less"]
})
export class PlayerCardComponent implements OnInit, AfterViewInit {

    ngAfterViewInit(): void {
        if (this.spinOnInit) {
            this.click();
        }
    }

    @Input()
    card: Observable<Card>;
    @Input()
    size: string = "md";
    @Input()
    spinOnInit: boolean;
    @Input()
    mode: string;

    opened: boolean;
    cardModel: Card;

    id = `pitch-player-${nextId++}`;

    private spinning: any;

    ngOnInit(): void {
        this.card.subscribe(cardModel => {
            this.cardModel = cardModel;
            if (this.mode && this.mode == "squad") {
                this.opened = true;
            } else {
                this.reveal();
            }
        });
    }

    reveal() {
        if (this.spinning)
            this.spinning.pause();
        anime.timeline({
            loop: false
        })
            .add({ targets: [`#${this.id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' }, 0) //todo stop spin
            .add({ targets: [`#${this.id} .cover`], opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 0)
            .finished.then(() => {
                //race condition
                anime.timeline({
                    loop: false
                })
                    .add({ targets: [`#${this.id} .position`], opacity: [{ value: 100, duration: 1000 }] }, 0)
                    .add({ targets: [`#${this.id} .rating`], opacity: [{ value: 100, duration: 1000 }] }, '+=150')
                    .add({ targets: [`#${this.id} .name`], opacity: [{ value: 100, duration: 1000 }] }, '+=500')
            });
    }

    open() {
        return anime.timeline({
            loop: false
        })
            .add({ targets: [`#${this.id} .ribbon`], translateX: [{ value: -250, duration: 150 }], opacity: [{ value: 0, duration: 100 }], easing: 'linear' }, 0)
            .add({ targets: [`#${this.id} .ribbon`], opacity: [{ value: 0, duration: 150 }], easing: 'linear' }, 0)
    }

    spin() {
        this.spinning = anime.timeline({
            loop: true
        })
            .add({ targets: [`#${this.id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' });
    }

    click() {
        if (this.opened || this.mode == "squad") return;
        this.open().finished.then(() => this.spin());
    }
}