import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController, 
  AlertController
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rachas',
  templateUrl: 'rachas.html',
})
export class RachasPage {

  private quadra = this.navParams.data.quadra;
  private data = this.navParams.data.dataRacha;
  private horario = this.navParams.data.horarioRacha;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log(this.quadra);
    console.log(this.data);
    console.log(this.horario);
    console.log('ionViewDidLoad RachasPage');
  }

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Você deseja marcar esse Racha?',
      // subTitle: 'Essa ação não poderá ser desfeita.',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          handler: () => {
            console.log('NÃO clicado');
          }
        },
        {
          text: 'SIM',
          handler: () => {
            console.log('SIM clicado');
          }
        }
      ]
    });
    confirm.present();
  }

}
