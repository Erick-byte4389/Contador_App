import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  providers: [
    AlertController
  ]
})
export class HomePage {

  public n: number;
  public showNumber: String;
  private keyNumber: string;
  private readonly MIN: number = 0;
  private readonly MAX: number = 100; // Adjust the max value as needed

  constructor(private alertController: AlertController) {
    this.n = 0;
    this.showNumber = '00';
    this.keyNumber = 'keyNumber';
  }

  async ionViewWillEnter() {

    const counter = await Preferences.get({ key: this.keyNumber });

    if(counter.value) {
      const num = +counter.value;
      if (isNaN(num) || num < this.MIN || num > this.MAX) {
        this.n = this.MIN;
        this.saveNum();
      } else {
        this.n = num;
      }
    }
    
  }

  up() {
    this.n++;
    this.formatShowNumber();
    this.saveNum();
  }

  down() {
    this.n--;
    this.formatShowNumber();
    this.saveNum();
  }

  formatShowNumber() {
    if (this.n < 10) {
      this.showNumber = '0' + this.n; 
    } else {
      this.showNumber = this.n + '';
    }
  }

  async reset() {

    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: '¿Estas seguro de que quieres reiniciar el contador?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.n = 0;
            this.formatShowNumber();
            this.saveNum();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
  });

   await alert.present();

  }

  private saveNum() {
    Preferences.set({ key: this.keyNumber, value: this.n.toString() });
  }

}
