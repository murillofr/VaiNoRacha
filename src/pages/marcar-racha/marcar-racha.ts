import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';
import { RachasPage } from './../rachas/rachas';

var dataSelecionada = null;
var horarioSelecionado = null;

@IonicPage()
@Component({
  selector: 'page-marcar-racha',
  templateUrl: 'marcar-racha.html',
  providers: [HerokuProvider]
})
export class MarcarRachaPage {

  private todosHorarios: Array<any>;
  private horariosPesquisados: Array<any>;
  private marcouRacha = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarcarRachaPage');
    dataSelecionada = null;
    horarioSelecionado = null;
    this.encontrarTodosHorarios();
  }

  ionViewWillEnter() {
    if (this.marcouRacha) {
      this.limparHorariosPesquisados();
    }
  }

  limparHorariosPesquisados() {
    this.horariosPesquisados = [];
    this.marcouRacha = false;
  }

  encontrarTodosHorarios() {
    let loading = this.loadingCtrl.create({
      content: 'Detectando horários...'
    });
    loading.present();

    this.herokuProvider.encontrarTodosHorarios().subscribe(
      data => {
        this.todosHorarios = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Todos os horários foram encontrados');
        loading.dismiss();
      }
    );
  }

  pesquisarPorHorario(id, data) {
    let loading = this.loadingCtrl.create({
      content: 'Localizando quadras...'
    });
    loading.present();

    this.herokuProvider.pesquisarPorHorario(id, data).subscribe(
      data => {
        this.horariosPesquisados = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        loading.dismiss();
        console.log('Horários pesquisados foram encontrados');
        // document.getElementById('divResultadosPorHorario').setAttribute("style", "height: 100%;");
      }
    );
  }

  onDataSelecionada(data) {
    dataSelecionada = data.split('-').reverse().join('/');
  }

  onHorarioSelecionado(horario) {
    horarioSelecionado = horario;
  }

  pesquisarRachaHorario() {
    if ((dataSelecionada !== null) && (horarioSelecionado !== null)) {
      this.pesquisarPorHorario(horarioSelecionado.id, dataSelecionada);
      console.log(dataSelecionada);
      console.log(horarioSelecionado.id);
    } else {
      if (dataSelecionada == null) {
        this.exibirToast("Data é obrigatória");
      } else if (horarioSelecionado == null) {
        this.exibirToast("Horário é obrigatório");
      }
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

  pushPageRachas(quadra): void {
    this.navCtrl.push(RachasPage, {
      callback: this.myCallbackFunction,
      quadra: quadra,
      dataRacha: dataSelecionada,
      horarioRacha: horarioSelecionado
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.marcouRacha = _params;
      resolve();
    });
  }

}
