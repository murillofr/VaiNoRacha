import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';

@IonicPage()
@Component({
  selector: 'page-rachas',
  templateUrl: 'rachas.html',
  providers: [HerokuProvider]
})
export class RachasPage {

  data: any = {};

  private quadra = this.navParams.data.quadra;
  private dataRacha = this.navParams.data.dataRacha;
  private horarioRacha = this.navParams.data.horarioRacha;
  private callback;
  private marcouRacha = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider) { }

  ionViewDidLoad() {
    console.log(this.quadra);
    console.log(this.dataRacha);
    console.log(this.horarioRacha);
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
            this.submit();
          }
        }
      ]
    });
    confirm.present();
  }

  submit() {

    this.data.idUsuario = 3
    this.data.idQuadra = this.quadra.id;
    this.data.idHorario = this.horarioRacha.id;
    this.data.dataRacha = this.dataRacha;

    let loading = this.loadingCtrl.create({
      content: 'Reservando racha...'
    });
    loading.present();

    console.log(this.data);
    this.herokuProvider.postRacha(this.data).subscribe(data => {
      console.log('resposta', data);
    }, error => {
      if (error['status'] == 201) {
        loading.dismiss();
        this.showAlert();
      }
      else
        console.log("Oooops!", error);
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oh Yeah!',
      subTitle: 'Racha criado com sucesso.',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.marcouRacha = true;
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
  }

  ionViewWillLeave() {
    this.callback(this.marcouRacha).then(() => {

    });
  }

}
