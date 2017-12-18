import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
  providers: [HerokuProvider]
})
export class ConfiguracoesPage {

  data: any = {};
  senha = { "senhaAtual": "", "novaSenha1": "", "novaSenha2": "" };
  senhaEnviar = { "senha": "" };
  safeSvg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private herokuProvider: HerokuProvider,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  atualizarSenha() {

    if (this.senha.senhaAtual == "") {
      this.showAlert("Senha atual obrigatoria.");
    } else if (this.senha.novaSenha1 == "") {
      this.showAlert("Nova senha obrigatoria.");
    } else if (this.senha.novaSenha1 !== this.senha.novaSenha2) {
      this.showAlert("Senha nova repetida incorretamente.");
    } else if (this.senha.senhaAtual !== window.localStorage.getItem('senha')) {
      this.showAlert("Senha atual incorreta.");
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
            <span class="spanMsgLoading">Alterando senha...</span>
          </div>
        `;

      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: this.safeSvg,
      });
      loading.present();

      this.senhaEnviar.senha = this.senha.novaSenha1;
      this.herokuProvider.putSenha(window.localStorage.getItem('idUsuario'), this.senhaEnviar).subscribe(
        (res) => {
          this.data = res.body;
          console.log('resposta', res);
        }, error => {
          loading.dismiss();
          console.log("Oooops!", error);
          this.showAlert("Erro ao alterar a senha. Tente novamente.");
        },
        () => {
          loading.dismiss().then(() => {
            console.log('Senha alterada com sucesso.');
            this.showAlert("Senha alterada com sucesso.");
            window.localStorage.setItem('senha', this.senha.novaSenha1);
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

}
