import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resource-card',
  imports: [DecimalPipe],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.scss',
})
export class ResourceCard {

  icon = input('');
  name = input('');
  amount = input(0);
  iconAlt = input('');

}
