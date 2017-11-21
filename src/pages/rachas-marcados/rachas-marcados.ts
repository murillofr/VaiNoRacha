import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rachas-marcados',
  templateUrl: 'rachas-marcados.html',
})
export class RachasMarcadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RachasMarcadosPage');
  }

  tapEvent(e) {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Você deseja cancelar esse Racha?',
      message: 'Essa ação não pode ser desfeita.',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'SIM',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
