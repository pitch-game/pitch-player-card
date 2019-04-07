import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PlayerCardComponent } from './component/player-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PlayerCardComponent],
  exports: [PlayerCardComponent],
  entryComponents: [PlayerCardComponent]
})
export class PitchPlayerCardModule { }

export { Card } from './models/card';