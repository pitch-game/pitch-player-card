import { Component, OnInit } from '@angular/core';
import { Card } from 'src';
import { Observable, empty } from 'rxjs';
import { of } from 'rxjs'

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
  card: Card = { id: '', name: 'Mane', rating: 78, position: 'ST', rarity: 'gold' };
  updateObservable;

  emptyCard: Observable<Card>;

  click() {
    this.updateObservable({ id: '', name: 'Trent A-A', rating: 78, position: 'ST', rarity: 'gold' });
  }
}
