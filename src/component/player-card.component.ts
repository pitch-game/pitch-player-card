import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/card';
import anime from 'animejs';

var nextId = 0;
@Component({
    selector: "pitch-player-card",
    templateUrl: "player-card.component.html",
    styleUrls: ["player-card.component.less"]
})
export class PlayerCardComponent implements OnInit {

    private _card: Card;
    @Input() set card(value: Card) {
        this._card = value;
        if (value != null) {
            this.reveal();
        }
    }

    get card(): Card {
        return this._card;
    }

    @Input()
    size: string = "md";

    opened: boolean;

    id = `pitch-player-${nextId++}`;

    private spinning: any;

    ngOnInit(): void {
        this.opened = this.card != null;
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
        this.open().finished.then(() => {
            if (this.card != null) {
                this.reveal();
            } else {
                this.spin();
            }
        });
    }
}