import { Component } from '@angular/core';
import { Card } from 'src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  card: Card = { name: 'Ozil', rating: 78, position: 'ST', opened: true, rarity: 'gold' };
  card2: Card = { name: 'Alexander-Arnold', rating: 78, position: 'ST', opened: true, rarity: 'gold' };
}
