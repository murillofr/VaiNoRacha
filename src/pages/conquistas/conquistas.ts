import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conquistas',
  templateUrl: 'conquistas.html',
})
export class ConquistasPage {
  trophy: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trophy = "bronze"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConquistasPage');
  }

}
