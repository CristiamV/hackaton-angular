import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-campaign-card',
  imports: [DecimalPipe, NgStyle],
  templateUrl: './campaign-card.html',
  styleUrl: './campaign-card.scss',
})
export class CampaignCard {

  title = input('');
  targetSoldiers = input(0);
  currentSoldiers = input(0);
  targetRice = input(0);
  currentRice = input(0);
  deadline = input('');
  contribute = output<void>();


  soldierProgress = computed(() => {
    return this.targetSoldiers() ? (this.currentSoldiers() / this.targetSoldiers()) * 100 : 0;
  });

  riceProgress = computed(() => {
    return this.targetRice() ? (this.currentRice() / this.targetRice()) * 100 : 0;
  });

  onContributeClick() {
    this.contribute.emit();
  }

}
