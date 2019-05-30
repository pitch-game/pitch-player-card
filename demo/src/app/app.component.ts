import { Component } from '@angular/core';
import { Card } from 'src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  card: Card = { name: 'Mane', rating: 78, position: 'ST', rarity: 'gold' };
  emptyCard: Card;

  click(){
    this.emptyCard = { name: 'Trent A-A', rating: 78, position: 'ST', rarity: 'gold' };
  }
}
