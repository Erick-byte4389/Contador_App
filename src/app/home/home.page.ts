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

  public num: number;
  public showNumber: String;
  private keyNumber: string;
  public MAX: number;
  public MIN: number;

  constructor(private alertController: AlertController) {
    this.num = 0;
    this.MAX = 9999;
    this.MIN = 0;
    this.showNumber = '00';
    this.keyNumber = 'keyNumber';
  }

  async ionViewWillEnter() {

    const counter = await Preferences.get({ key: this.keyNumber });

    if(counter.value) {
      const num = +counter.value;
      if (isNaN(num) || num < this.MIN || num > this.MAX) {
        this.num = this.MIN;
        this.saveNum();
      } else {
        this.num = num;
      }
    }
    
  }

  up() {
    this.num++;
    this.formatShowNumber();
    this.saveNum();
  }

  down() {
    this.num--;
    this.formatShowNumber();
    this.saveNum();
  }

  formatShowNumber() {
    if (this.num < 10) {
      this.showNumber = '0' + this.num; 
    } else {
      this.showNumber = this.num + '';
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
            this.num = 0;
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
    Preferences.set({ key: this.keyNumber, value: this.num.toString() });
  }

}
