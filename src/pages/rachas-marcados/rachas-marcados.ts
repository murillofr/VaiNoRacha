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
import { MarcarRachaPage } from './../marcar-racha/marcar-racha';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-rachas-marcados',
  templateUrl: 'rachas-marcados.html',
  providers: [HerokuProvider]
})
export class RachasMarcadosPage {

  pageMarcarRacha = { title: 'Marcar Racha', component: MarcarRachaPage };

  private rachasMarcados: Array<any>;

  safeSvg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider,
    private sanitizer: DomSanitizer) {

  }

  ionViewDidLoad() {
    this.encontrarRachasMarcados();
    console.log('ionViewDidLoad RachasMarcadosPage');
  }

  encontrarRachasMarcados() {
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
        <span class="spanMsgLoading">Carregando rachas...</span>
      </div>
    `;

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.safeSvg,
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
        this.temRacha();
      }
    );
  }

  temRacha() {
    if (this.rachasMarcados.length == 0) {
      document.getElementById("divContentSemRacha").setAttribute("class", "aparecer");
    } else {
      document.getElementById("divContentSemRacha").setAttribute("class", "esconder");
    }
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
    this.tapEvent();
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
                <span class="spanMsgLoading">Deletando racha...</span>
              </div>
            `;

            this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

            let loading = this.loadingCtrl.create({
              spinner: 'hide',
              content: this.safeSvg,
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

  goMarcarRachaPage() {
    this.navCtrl.setRoot(this.pageMarcarRacha.component);
  }

}