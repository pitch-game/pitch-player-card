import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { of } from 'rxjs'
import { PitchPlayerCard } from 'src';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.emptyCard = Observable.create((observer) => {
      this.updateObservable = (newValue) => {
        observer.next(newValue);
        observer.complete();
      }
    });
  }

  title = 'demo';
  card: PitchPlayerCard = { id: '', name: 'Mane', rating: 84, position: 'ST', rarity: 'gold' };
  noCard: PitchPlayerCard;
  updateObservable;

  cards: PitchPlayerCard[] = [];

  emptyCard: Observable<PitchPlayerCard>;

  cardsTest: { [position: string]: PitchPlayerCard } = {};

  click() {
    this.updateObservable(new PitchPlayerCard('', 'Trent A-A', 'RB', 86, 'gold'));
    this.cardsTest['LB'] = new PitchPlayerCard('', 'Trent A-A', 'RB', 86, 'gold');
  }

  click2() {
    this.noCard = new PitchPlayerCard('', 'Trent A-A', 'RB', 86, 'gold');
  }

  setnull(){
    this.card = null;
  }
}
