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

var dataSelecionada = null;

@IonicPage()
@Component({
  selector: 'page-quadra-infos',
  templateUrl: 'quadra-infos.html',
  providers: [HerokuProvider]
})
export class QuadraInfosPage {

  private quadraInfos: any = {};
  private idParam = this.navParams.data.id;
  private diasFuncionamentoArray = [];
  private terminouCarregar = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private herokuProvider: HerokuProvider) {

  }

  ionViewDidLoad() {
    this.encontrarQuadra();
    dataSelecionada = null;
    console.log('ionViewDidLoad RachasMapaPage');
  }

  encontrarQuadra() {
    let loading = this.loadingCtrl.create({
      content: 'Localizando informações da quadra...'
    });
    loading.present();

    this.herokuProvider.encontrarQuadra(this.idParam).subscribe(
      data => {
        this.quadraInfos = data;
        console.log(data);
        this.dividirDiasFuncionamento();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Todos as informações da quadra foram encontradas');
        loading.dismiss();
        this.terminouCarregar = true;
      }
    );
  }

  dividirDiasFuncionamento() {
    this.diasFuncionamentoArray = this.quadraInfos.diasFuncionamento.split(', ');

    for (let dia of this.diasFuncionamentoArray) {

      if (dia == "Segunda") {
        document.getElementById("colSeg").setAttribute("class", "quadraAberta");
        document.getElementById("iconSeg").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Terça") {
        document.getElementById("colTer").setAttribute("class", "quadraAberta");
        document.getElementById("iconTer").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Quarta") {
        document.getElementById("colQua").setAttribute("class", "quadraAberta");
        document.getElementById("iconQua").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Quinta") {
        document.getElementById("colQui").setAttribute("class", "quadraAberta");
        document.getElementById("iconQui").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Sexta") {
        document.getElementById("colSex").setAttribute("class", "quadraAberta");
        document.getElementById("iconSex").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Sabado") {
        document.getElementById("colSab").setAttribute("class", "quadraAberta");
        document.getElementById("iconSab").setAttribute("class", "fa-check-circle-o");
      }
      if (dia == "Domingo") {
        document.getElementById("colDom").setAttribute("class", "quadraAberta");
        document.getElementById("iconDom").setAttribute("class", "fa-check-circle-o");
      }

    }

  }

  onDataSelecionada(data) {
    dataSelecionada = data.split('-').reverse().join('/');
  }

  pesquisarHorarios() {
    if (dataSelecionada !== null) {
      console.log("Clicou para pesquisar Horários disponíveis.");
      // this.pesquisarPorHorario(horarioSelecionado.id, dataSelecionada);
      console.log(dataSelecionada);
    } else {
      this.exibirToast("Data é obrigatória");
    }
  }

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

}
