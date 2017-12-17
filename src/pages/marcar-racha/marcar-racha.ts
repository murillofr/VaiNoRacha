// import { Component, ViewChild } from '@angular/core';
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
import { QuadraInfosPage } from './../quadra-infos/quadra-infos';
import { DomSanitizer } from '@angular/platform-browser';

var dataSelecionada = null;
var horarioSelecionado = null;

@IonicPage()
@Component({
  selector: 'page-marcar-racha',
  templateUrl: 'marcar-racha.html',
  providers: [HerokuProvider]
})
export class MarcarRachaPage {
  searchRacha: string = "quadra";

  // @ViewChild('searchBar') myInput;

  safeSvg: any;

  private todosHorarios: Array<any>;
  private quadrasPesquisadas: Array<any>;
  private horariosPesquisados: Array<any>;
  private marcouRacha = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider,
    private sanitizer: DomSanitizer) {

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

  limparQuadrasPesquisadas() {
    this.quadrasPesquisadas = [];
  }

  limparHorariosPesquisados() {
    this.horariosPesquisados = [];
    this.marcouRacha = false;
  }

  encontrarTodosHorarios() {
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
        <span class="spanMsgLoading">Detectando horários...</span>
      </div>
    `;

  this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: this.safeSvg,
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
        // loading.dismiss().then(() => { this.myInput.setFocus(); });
      }
    );
  }

  pesquisarQuadraPorNome(termoBuscado) {
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
        <span class="spanMsgLoading">Localizando...</span>
      </div>
    `;

  this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: this.safeSvg,
  });
  loading.present();

    this.herokuProvider.pesquisarQuadraPorNome(termoBuscado).subscribe(
      data => {
        this.quadrasPesquisadas = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        loading.dismiss();
        // loading.dismiss().then(() => { this.myInput.setFocus(); });
        console.log('Quadras pesquisadas foram encontradas');
        // document.getElementById('divResultadosPorHorario').setAttribute("style", "height: 100%;");
      }
    );
  }

  // teste(event) {
  //   setTimeout(() => {
  //     this.myInput.setFocus();
  //    }, 50);
  // }

  onInputNomeQuadra(termoBuscado) {
    if (termoBuscado !== "") {
      this.pesquisarQuadraPorNome(termoBuscado);
    } else {
      this.limparQuadrasPesquisadas();
    }
  }

  onClearNomeQuadra() {
    this.limparQuadrasPesquisadas();
  }

  pesquisarPorHorario(id, data) {
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
        <span class="spanMsgLoading">Localizando quadras...</span>
      </div>
    `;

  this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

  let loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: this.safeSvg,
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

    // Apaga lista de horarios caso troque a data antes de pesquisar
    if (dataSelecionada !== data.split('-').reverse().join('/')) {
      this.horariosPesquisados = [];
    }

    // Inverte data para padrão brasileiro
    dataSelecionada = data.split('-').reverse().join('/');
  }

  onHorarioSelecionado(horario) {

    // Apaga lista de horarios caso troque a data antes de pesquisar
    if (horarioSelecionado !== horario) {
      this.horariosPesquisados = [];
    }
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

  pushPageQuadraInfos(quadraId): void {
    this.navCtrl.push(QuadraInfosPage, {
      id: quadraId
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.marcouRacha = _params;
      resolve();
    });
  }

}
