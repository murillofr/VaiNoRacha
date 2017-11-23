import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RachasMarcadosService } from './../../service/rest/rachas-marcados-service';

@IonicPage()
@Component({
  selector: 'page-rachas-marcados',
  templateUrl: 'rachas-marcados.html',
})
export class RachasMarcadosPage {

  private rachasMarcados: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public rachasMarcadosService: RachasMarcadosService) {
    this.encontrarQuadras();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RachasMarcadosPage');
  }

  encontrarQuadras() {
    this.rachasMarcadosService.encontrarRachasMarcados().subscribe(
      data => {
        this.rachasMarcados = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Todas os rachas marcados foram encontrados')
    );
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
      subTitle: 'Essa ação não poderá ser desfeita.',
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
