import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public n: number;
  public showNumber: String;

  constructor() {
    this.n = 0;
    this.showNumber = '00';
  }

}
