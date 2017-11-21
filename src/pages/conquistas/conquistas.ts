import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conquistas',
  templateUrl: 'conquistas.html',
})
export class ConquistasPage {
  trophy: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.trophy = "bronze"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConquistasPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Título da Conquista',
      subTitle: 'Infos sobre a Conquista',
      buttons: ['OK']
    });
    alert.present();
  }

}
