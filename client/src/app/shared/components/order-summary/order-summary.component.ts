import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-order-summary',
  imports: [
    MatButton, 
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

}
