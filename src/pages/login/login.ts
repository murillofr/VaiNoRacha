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
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [HerokuProvider]
})
export class LoginPage {

  data: any = {};
  private quadras: Array<any>;

  responseData: any;
  userData = { 
    "email" : "vito.gomes@gmail.com", 
    "password": "", 
    "userName": "", 
    "loggedByFace" : false 
  };

  safeSvg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider,
    public menuCtrl: MenuController,
    private sanitizer: DomSanitizer) {
      this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log("id: " + window.localStorage.getItem('id'));
    console.log("name: " + window.localStorage.getItem('name'));
    console.log("email: " + window.localStorage.getItem('email'));
    console.log("userName: " + window.localStorage.getItem('userName'));
    console.log("birthDate: " + window.localStorage.getItem('birthDate'));
    console.log("photo: " + window.localStorage.getItem('photo'));
    console.log("cpfOrCnpj: " + window.localStorage.getItem('cpfOrCnpj'));
    console.log("loggedByFace: " + window.localStorage.getItem('loggedByFace'));
    console.log("profiles: " + window.localStorage.getItem('profiles'));
    console.log("rentalHistory: " + window.localStorage.getItem('rentalHistory'));
    console.log("password: " + window.localStorage.getItem('password'));
  }

  login() {

    if (this.userData.userName == "") {
      this.showAlert("Usuario obrigatorio.");
    } else if (this.userData.password == "") {
      this.showAlert("Senha obrigatoria.");
    } else {

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
          <span class="spanMsgLoading">Efetuando login...</span>
        </div>
      `;

      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: this.safeSvg,
      });
      loading.present();

      this.herokuProvider.postLogin(this.userData).subscribe(
        (res) => {
          this.data = res.body;
          console.log('resposta', res);
          this.salvarDadosLoginStorage();
        }, error => {
          loading.dismiss();
          console.log("Oooops!", error);
          console.log('user: ' + this.userData.userName);
          console.log('password: ' + this.userData.password);
          this.showAlert("Usuário ou senha incorretos.");
        },
        () => {
          console.log('Login efetuado com sucesso.');
          this.aparecerDadosUsuario();
          loading.dismiss().then(() => {
            this.pesquisarTodasAsQuadras();
          });
        }
      );

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
    console.log('this.data', this.data);

    window.localStorage.setItem('id', this.data.content.id);
    window.localStorage.setItem('name', this.data.content.name);
    window.localStorage.setItem('email', this.data.content.email);
    window.localStorage.setItem('userName', this.data.content.userName);
    window.localStorage.setItem('birthDate', this.data.content.birthDate);
    window.localStorage.setItem('photo', this.data.content.photo);
    window.localStorage.setItem('cpfOrCnpj', this.data.content.cpfOrCnpj);
    window.localStorage.setItem('loggedByFace', this.data.content.loggedByFace);
    window.localStorage.setItem('profiles', this.data.content.profiles);
    window.localStorage.setItem('rentalHistory', this.data.content.rentalHistory);
    window.localStorage.setItem('password', this.userData.password);    

    console.log("id: " + window.localStorage.getItem('id'));
    console.log("name: " + window.localStorage.getItem('name'));
    console.log("email: " + window.localStorage.getItem('email'));
    console.log("userName: " + window.localStorage.getItem('userName'));
    console.log("birthDate: " + window.localStorage.getItem('birthDate'));
    console.log("photo: " + window.localStorage.getItem('photo'));
    console.log("cpfOrCnpj: " + window.localStorage.getItem('cpfOrCnpj'));
    console.log("loggedByFace: " + window.localStorage.getItem('loggedByFace'));
    console.log("profiles: " + window.localStorage.getItem('profiles'));
    console.log("rentalHistory: " + window.localStorage.getItem('rentalHistory'));
    console.log("password: " + window.localStorage.getItem('password'));
  }

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  aparecerDadosUsuario() {
    document.getElementById("spanNomeUsuario").innerHTML = window.localStorage.getItem('name');
    document.getElementById("divDadosUsuarioLogado").setAttribute("class", "aparecerDadosUsuarioLogado");
    document.getElementById('idLogin-form').style.animation = 'login-animation-out 0.5s ease-in-out';
    document.getElementById('idLogin-form').style.visibility = 'hidden';
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