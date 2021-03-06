import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { HerokuProvider } from './../../providers/heroku/heroku';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  providers: [HerokuProvider]
})
export class SplashPage {

  private quadras: Array<any>;

  pageMapa = { title: 'Mapa', component: HomePage };
  pageLogin = { title: 'Login', component: LoginPage };

  pageAtiva = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private herokuProvider: HerokuProvider,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');

    //window.localStorage.clear();

    var body = document.getElementById("bodySplash");

    clearInterval(teste);
    var teste = setInterval(() => {
      if (window.getComputedStyle(body).backgroundColor == 'rgb(30, 30, 30)') {
        clearInterval(teste);

        this.setarPageInicial();

        if (this.pageAtiva == 'MAPA') {
          document.getElementById("spanNomeUsuario-Splash").innerHTML = window.localStorage.getItem('name');
          document.getElementById('divDadosUsuarioLogado-Splash').style.animation = 'splash-animation-in 0.5s forwards ease-in-out';
          this.pesquisarTodasAsQuadras();
        } else if (this.pageAtiva == 'LOGIN') {
          this.navCtrl.setRoot(this.pageLogin.component);
        }

      }
    }, 10);

  }

  pularParaLogin() {
    this.navCtrl.setRoot(this.pageLogin.component);
  }

  pularParaMapa() {
    this.navCtrl.setRoot(this.pageMapa.component);
  }

  setarPageInicial() {

    // console.log("id: " + window.localStorage.getItem('id'));
    // console.log("name: " + window.localStorage.getItem('name'));
    // console.log("email: " + window.localStorage.getItem('email'));
    // console.log("userName: " + window.localStorage.getItem('userName'));
    // console.log("birthDate: " + window.localStorage.getItem('birthDate'));
    // console.log("photo: " + window.localStorage.getItem('photo'));
    // console.log("cpfOrCnpj: " + window.localStorage.getItem('cpfOrCnpj'));
    // console.log("loggedByFace: " + window.localStorage.getItem('loggedByFace'));
    // console.log("profiles: " + window.localStorage.getItem('profiles'));
    // console.log("rentalHistory: " + window.localStorage.getItem('rentalHistory'));
    // console.log("password: " + window.localStorage.getItem('password'));

    if (window.localStorage.getItem('userName') !== null &&
      window.localStorage.getItem('password') !== null) {
      this.pageAtiva = 'MAPA';
    } else {
      this.pageAtiva = 'LOGIN';
    }
  }

  pesquisarTodasAsQuadras() {

    this.herokuProvider.pesquisarTodasAsQuadras().subscribe(
      data => {
        this.quadras = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Todas as quadras foram encontradas');

        clearInterval(teste);
        var teste = setTimeout(() => {
          clearInterval(teste);

          this.navCtrl.setRoot(HomePage, {
            quadras: this.quadras
          });

        }, 2000);

      }
    );
  }

}
