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
  card: PitchPlayerCard = { id: '', name: 'Mane', rating: 78, position: 'ST', rarity: 'gold' };
  noCard: PitchPlayerCard;
  updateObservable;

  emptyCard: Observable<PitchPlayerCard>;

  click() {
    this.updateObservable({ id: '', name: 'Trent A-A', rating: 78, position: 'ST', rarity: 'gold' });
  }

  click2() {
    this.noCard = new PitchPlayerCard('', 'Trent A-A', 'ST', 78, 'gold');
  }
}
