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

  login() {
    this.herokuProvider.postLogin(this.userData).subscribe(
      (res) => {
        console.log('resposta', res);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        console.log("Oooops!", error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}