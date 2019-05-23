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
            this.revealCardAnimationInit();
        }
    }

    get card(): Card {
        return this._card;
    }

    id = `pitch-player-${nextId++}`;

    private spinning: any;

    ngOnInit(): void {

    }

    revealCardAnimationInit() {
        if(this.spinning)
            this.spinning.pause();
        return anime.timeline({
            loop: false
        })
            .add({ targets: [`#${this.id} .player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' }, 0) //todo stop spin
            .add({ targets: [`#${this.id} .cover`], opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 0)
            .add({ targets: [`#${this.id} .position`], opacity: [{ value: 100, duration: 1000 }] }, '+=150')
            .add({ targets: [`#${this.id} .rating`], opacity: [{ value: 100, duration: 1000 }] }, '+=150')
            .add({ targets: [`#${this.id} .name`], opacity: [{ value: 100, duration: 1000 }] }, '+=500');
    }

    spinCardAnimationInit() {
        return anime.timeline({
            loop: false
        })
            .add({ targets: [`#${this.id} .bow-left`], translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
            .add({ targets: [`#${this.id} .bow-right`], translateY: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 250 }], easing: 'linear' }, 0)
            .add({ targets: [`#${this.id} .ribbon-left`], translateX: [{ value: -250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
            .add({ targets: [`#${this.id} .ribbon-right`], translateX: [{ value: 250, duration: 500 }], opacity: [{ value: 0, duration: 1000 }], easing: 'linear' }, 100)
            .add({ targets: [`#${this.id} .ribbon-top`], translateY: [{ value: -250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
            .add({ targets: [`#${this.id} .ribbon-bottom`], translateY: [{ value: 250, duration: 750 }], opacity: [{ value: 0, duration: 750 }], easing: 'linear' }, 200)
            .add({ targets: [`#${this.id} .ribbon`], opacity: [{ value: 0, duration: 1 }], easing: 'linear' }, 200)
            .add({ targets: [`#${this.id} .player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' }, 500)
    }

    keepSpinning() {
        this.spinning = anime.timeline({
            loop: true
        })
            .add({ targets: [`#${this.id} .player`], rotateY: [{ value: 5040, duration: 4000 }], easing: 'easeOutCubic' });
    }

    click() {
        this.spinCardAnimationInit().finished.then(() => {
            if (this.card != null) { //todo wait on spin
                this.revealCardAnimationInit();
            } else {
                this.keepSpinning();
            }
        });
    }
}