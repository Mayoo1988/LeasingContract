import { Injectable } from '@angular/core';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [className]
    });
  }
}