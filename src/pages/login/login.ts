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
  userData = { "user": "", "senha": "" };

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
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    if (this.userData.user == "") {
      this.showAlert("Usuario obrigatorio.");
    } else {

      if (this.userData.senha == "") {
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
            this.salvarDadosLoginStorage();
            console.log('resposta', res);
          }, error => {
            loading.dismiss();
            console.log("Oooops!", error);
            this.showAlert("Usuário ou senha incorretos.");
          },
          () => {
            console.log('Login efetuado com sucesso.');
            this.aparecerDadosUsuario();
            loading.dismiss().then(() => {
              this.encontrarQuadras();
            });
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

    window.localStorage.setItem('idUsuario', this.data.Id_Usuario);
    window.localStorage.setItem('nome', this.data.Nome);
    window.localStorage.setItem('cpf_cnpj', this.data.cpf_cnpj);
    window.localStorage.setItem('userName', this.data.UserName);
    window.localStorage.setItem('senha', this.userData.senha);
    window.localStorage.setItem('perfil', this.data.Perfil);

    console.log("idUsuario: " + window.localStorage.getItem('idUsuario'));
    console.log("nome: " + window.localStorage.getItem('nome'));
    console.log("cpf_cnpj: " + window.localStorage.getItem('cpf_cnpj'));
    console.log("userName: " + window.localStorage.getItem('userName'));
    console.log("senha: " + window.localStorage.getItem('senha'));
    console.log("perfil: " + window.localStorage.getItem('perfil'));

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
    document.getElementById("spanNomeUsuario").innerHTML = window.localStorage.getItem('nome');
    document.getElementById("divDadosUsuarioLogado").setAttribute("class", "aparecerDadosUsuarioLogado");
    document.getElementById('idLogin-form').style.animation = 'login-animation-out 0.5s ease-in-out';
    document.getElementById('idLogin-form').style.visibility = 'hidden';
  }

  encontrarQuadras() {

    this.herokuProvider.encontrarQuadras().subscribe(
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