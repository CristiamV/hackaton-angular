import { Component, input, output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-transfer-modal',
  imports: [FormsModule],
  templateUrl: './transfer-modal.html',
  styleUrl: './transfer-modal.scss',
})
export class TransferModal {
  open = input(false);
  isCampaignContribution = input(false);
  campaignTitle = input('');

  openChange = output<boolean>();

  lands = 0;
  soldiers = 0;
  rice = 0;

  readonly tributePercentage = 0.02;

  get landsTribute(): number {
    return Math.floor(this.lands * this.tributePercentage);
  }

  get soldiersTribute(): number {
    return Math.floor(this.soldiers * this.tributePercentage);
  }

  get riceTribute(): number {
    return Math.floor(this.rice * this.tributePercentage);
  }

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    // TODO: conectar con backend / wallet
    this.close();
  }
}
