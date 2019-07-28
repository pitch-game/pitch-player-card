import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { PitchPlayerCard } from '../models/pitch-player-card';
import { Observable, isObservable } from 'rxjs';
import { AnimationService } from 'src/services/animation.service';

var nextId = 0;
@Component({
    selector: "pitch-player-card",
    templateUrl: "player-card.component.html",
    styleUrls: ["player-card.component.less"],
    providers: [AnimationService]
})
export class PlayerCardComponent implements OnInit, OnChanges, AfterViewInit {

    constructor(private animationService: AnimationService) { }

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

    ngOnChanges(changes: SimpleChanges): void {
        if (!isObservable(this.card)) {
            this.cardModel = this.card;
            if (!this.card) {
                this.opened = false;
                return;
            };
            if (this.mode && this.mode == "squad") {
                this.opened = this.card != null;
            } else {
                this.reveal();
            }
        }
    }

    ngAfterViewInit(): void {
        if (this.spinOnInit) {
            this.click();
        }
    }

    click() {
        if (this.opened || this.mode == "squad") return;
        this.open().finished.then(() => {
            if (this.animationService.revealing) return;
            this.spin();
        });
    }

    reveal() {
        this.animationService.reveal(this.id);
    }

    open(): any {
        return this.animationService.open(this.id);
    }

    spin() {
        this.animationService.spin(this.id);
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