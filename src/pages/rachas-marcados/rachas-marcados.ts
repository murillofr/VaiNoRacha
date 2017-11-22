import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { QuadraService } from './../../service/rest/QuadraService';

@IonicPage()
@Component({
  selector: 'page-rachas-marcados',
  templateUrl: 'rachas-marcados.html',
})
export class RachasMarcadosPage {

  quadras: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private quadraService: QuadraService) {
      this.encontrarQuadras();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RachasMarcadosPage');
  }

  encontrarQuadras() {
    this.quadraService.encontrarQuadras().subscribe(
      data => {
        this.quadras = data.results;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Todas as quadras encontradas')
    );
    console.log('TESTE');
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
