import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController,
  ItemSliding
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';

@IonicPage()
@Component({
  selector: 'page-rachas-marcados',
  templateUrl: 'rachas-marcados.html',
  providers: [HerokuProvider]
})
export class RachasMarcadosPage {

  private rachasMarcados: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider) {

  }

  ionViewDidLoad() {
    this.encontrarRachasMarcados();
    console.log('ionViewDidLoad RachasMarcadosPage');
  }

  encontrarRachasMarcados() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando rachas...'
    });
    loading.present();

    this.herokuProvider.encontrarRachasMarcados().subscribe(
      data => {
        this.rachasMarcados = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Todos os rachas marcados foram encontrados');
        loading.dismiss();
      }
    );
  }

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  avisarRacha(racha) {
    var classeOld = document.getElementById(racha.id).className;
    if (classeOld.indexOf('-slash-o') > 0) {
      document.getElementById(racha.id).className = classeOld.replace('-slash-o', '');
      this.tapEvent();
    } else {
      document.getElementById(racha.id).className = classeOld.replace('fa-bell', 'fa-bell-slash-o');
    }
  }

  compartilharRacha(slidingItem: ItemSliding, racha) {
    console.log(racha);
    slidingItem.close();
  }

  showConfirm(slidingItem: ItemSliding, racha) {
    let confirm = this.alertCtrl.create({
      title: 'Deseja cancelar esse Racha?',
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

            let loading = this.loadingCtrl.create({
              content: 'Deletando racha...'
            });
            loading.present();

            this.deletarRacha(slidingItem, racha, loading);
          }
        }
      ]
    });
    confirm.present();
  }

  deletarRacha(slidingItem: ItemSliding, racha, loading) {
    this.herokuProvider.deletarRacha(racha.id).subscribe(data => {
      loading.dismiss();
      this.showAlert(slidingItem);
    }, error => {
      console.log("Oooops! Erro ao deletar racha", error);
    });
  }

  showAlert(slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      title: 'Tudo certo!',
      subTitle: 'Racha deletado com sucesso.',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.encontrarRachasMarcados();
        }
      }]
    });
    alert.present();
  }

}