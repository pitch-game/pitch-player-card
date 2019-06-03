import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PlayerCardComponent } from './component/player-card.component';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  imports: [CommonModule, AngularFittextModule],
  declarations: [PlayerCardComponent],
  exports: [PlayerCardComponent],
  entryComponents: [PlayerCardComponent]
})
export class PitchPlayerCardModule { }

export { PitchPlayerCard as Card } from './models/pitch-player-card';