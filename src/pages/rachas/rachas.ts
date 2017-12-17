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
import { DomSanitizer } from '@angular/platform-browser';

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

  safeSvg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider,
    private sanitizer: DomSanitizer) { }

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

    this.data.idUsuario = window.localStorage.getItem('idUsuario');
    this.data.idQuadra = this.quadra.id;
    this.data.idHorario = this.horarioRacha.id;
    this.data.dataRacha = this.dataRacha;

    let svg = `
      <div class="divContainerLoading">
        <svg class="svgLoading" xmlns="http://www.w3.org/2000/svg" viewBox="140 0 910 1190">
          <style>
            .st1 {
              fill: transparent;
              stroke-width: 40;
              stroke-miterlimit: 10;
            }
          </style>

          <path id="idHexagonLoading" stroke="transparent" class="st1" d="M570.1 82.5L163.7 317.2c-15.6 9-25.2 25.6-25.2 43.6v469.3c0 18 9.6 34.6 25.2 43.6l406.4 234.7c15.6 9 34.7 9 50.3 0l406.4-234.7c15.6-9 25.2-25.6 25.2-43.6V360.8c0-18-9.6-34.6-25.2-43.6L620.4 82.5c-15.5-8.9-34.7-8.9-50.3 0z"
          />

        </svg>
        <span class="spanMsgLoading">Reservando racha...</span>
      </div>
    `;

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.safeSvg,
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
