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
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [HerokuProvider]
})
export class LoginPage {

  data: any = {};

  responseData: any;
  userData = { "user": "", "senha": "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    if (this.userData.user == "") {
      this.showAlert("Usuario obrigatorio.");
    } else {

      if (this.userData.senha == "") {
        this.showAlert("Senha obrigatoria.");
      } else {

        let loading = this.loadingCtrl.create({
          content: 'Efetuando login...'
        });
        loading.present();

        this.herokuProvider.postLogin(this.userData).subscribe(
          (res) => {

            this.salvarDadosLoginStorage();

            loading.dismiss();
            console.log('resposta', res);
            this.navCtrl.setRoot(HomePage);
          }, error => {
            loading.dismiss();
            console.log("Oooops!", error);
            this.showAlert("Usuário ou senha incorretos.");
          }
        );

      }
    }
  }

  showAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      // subTitle: 'Tente novamente.',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          console.log(msg);
        }
      }]
    });
    alert.present();
  }

  salvarDadosLoginStorage() {
    window.localStorage.setItem('usuario', this.userData.user);
    window.localStorage.setItem('senha', this.userData.senha);
    console.log("Usuario: " + window.localStorage.getItem('usuario'));
    console.log("Senha: " + window.localStorage.getItem('senha'));
  }

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

}