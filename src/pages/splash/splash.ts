import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  pageMapa = { title: 'Mapa', component: HomePage };
  pageLogin = { title: 'Login', component: LoginPage };

  // Aqui irá pegar a variável LocalStorage
  //pageAtiva = 'LOGIN';
  pageAtiva = 'MAPA';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');

    clearInterval(teste);

    var body = document.getElementById("bodySplash");

    var teste = setInterval(() => {
      if (window.getComputedStyle(body).backgroundColor == 'rgb(30, 30, 30)') {
        clearInterval(teste);
        this.navCtrl.setRoot(this.pageLogin.component);
      }
    }, 10);

    // if (this.pageAtiva == 'MAPA') {
    //     this.navCtrl.setRoot(this.pageMapa.component);
    // }else if (this.pageAtiva == 'LOGIN') {
    //   setTimeout(() => {
    //     this.navCtrl.setRoot(this.pageLogin.component);
    //   }, 8500000000);
    // }

  }

}
