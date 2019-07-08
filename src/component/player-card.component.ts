import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { PitchPlayerCard } from '../models/pitch-player-card';
import anime from 'animejs';
import { Observable, isObservable } from 'rxjs';

var nextId = 0;
@Component({
    selector: "pitch-player-card",
    templateUrl: "player-card.component.html",
    styleUrls: ["player-card.component.less"]
})
export class PlayerCardComponent implements OnInit, OnChanges, AfterViewInit {

    ngAfterViewInit(): void {
        if (this.spinOnInit) {
            this.click();
        }
    }

    @Input()
    card: Observable<PitchPlayerCard> | PitchPlayerCard;
    @Input()
    size: string = "md";
    @Input()
    spinOnInit: boolean;
    @Input()
    mode: string;

    opened: boolean;
    cardModel: PitchPlayerCard;

    id = `pitch-player-${nextId++}`;

    private spinning: boolean;
    private revealing: boolean;
    private spinningTl: any;

    ngOnInit(): void {
        if (!isObservable(this.card)) {
            this.opened = this.card != null;
            this.cardModel = this.card;
        } else {
            this.card.subscribe(cardModel => {
                this.cardModel = cardModel;
                if (this.mode && this.mode == "squad") {
                    this.opened = true;
                } else {
                    this.reveal();
                }
            });
        }
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        if (!isObservable(this.card)) {
            if (!this.card) return;
            this.cardModel = this.card;
            if (this.mode && this.mode == "squad") {
                this.opened = this.card != null;
            } else {
                this.reveal();
            }
        }
    }

    reveal() {
        if (this.spinningTl) {
            this.spinningTl.pause();
            this.spinning = false;
        }
        this.revealing = true;
        anime.timeline({
            loop: false
        })
            .add({ targets: [`#${this.id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' }, 0)
            .add({ targets: [`#${this.id} .cover`], opacity: [{ value: 0, duration: 3000 }], easing: 'linear' }, 0)
            .finished.then(() => {
                //race condition
                anime.timeline({
                    loop: false
                })
                    .add({ targets: [`#${this.id} .position`], opacity: [{ value: 100, duration: 1000 }] }, 0)
                    .add({ targets: [`#${this.id} .rating`], opacity: [{ value: 100, duration: 1000 }] }, '+=150')
                    .add({ targets: [`#${this.id} .name`], opacity: [{ value: 100, duration: 1000 }] }, '+=500').finished.then(() => {
                        this.revealing = false;
                    })
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
        this.spinning = true;
        this.spinningTl = anime.timeline({
            loop: true
        })
            .add({ targets: [`#${this.id}.player`], rotateY: [{ value: 2520, duration: 4000 }], easing: 'easeOutCubic' });
        this.spinningTl.finished.then(() => {
            this.spinning = false;
        });
    }

    click() {
        if (this.opened || this.mode == "squad") return;
        this.open().finished.then(() => {
            if(this.revealing || this.spinning) return;
            this.spin();
        });
    }

    maxFontSize(): number {
        switch (this.size) {
            case "sm":
                return 14
            case "md":
                return 18
            case "lg":
                return 28
        }
        return 12;
    }
}