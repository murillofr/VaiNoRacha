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
import { DomSanitizer } from '@angular/platform-browser';

var dataSelecionada = null;
var diaSemanaSelecionado: String;

@IonicPage()
@Component({
  selector: 'page-quadra-infos',
  templateUrl: 'quadra-infos.html',
  providers: [HerokuProvider]
})
export class QuadraInfosPage {

  dataPost: any = {};

  safeSvg: any;

  private quadraInfos: any = {};
  private idParam = this.navParams.data.id;
  private terminouCarregar = false;
  private diaInvalido = false;
  private horariosPesquisados;

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
    this.pesquisarQuadraPorId();
    dataSelecionada = null;
    console.log('ionViewDidLoad RachasMapaPage');
  }

  pesquisarQuadraPorId() {
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
        <span class="spanMsgLoading">Localizando informações da quadra...</span>
      </div>
    `;

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.safeSvg,
    });
    loading.present();

    this.herokuProvider.pesquisarQuadraPorId(this.idParam).subscribe(
      data => {
        this.quadraInfos = data.content;
        console.log(data);
        this.dividirDiasFuncionamento();
      },
      err => {
        loading.dismiss();
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

    for (let dia of this.quadraInfos.daysOfOperations) {

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

    // Apaga lista de horarios caso troque a data antes de pesquisar
    if (dataSelecionada !== data.split('-').reverse().join('/')) {
      this.horariosPesquisados = [];
    }

    // Inverte data para padrão brasileiro
    dataSelecionada = data.split('-').reverse().join('/');

    // Cria vetor para descobrir qual dia da semana foi selecionado
    var semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

    // Concatena a data com a hora, criando o padrão necessário para a função
    var concat = data + ' 00:00:00';

    // Chama a função para criar um novo Date livre de erros de Fuso Horário
    var newDate = this.convertDateForIos(concat);

    // Pega o dia referente a data criada na função
    var dia = newDate.getDay();

    // Pega o nome do dia dentro do array
    diaSemanaSelecionado = semana[dia];

    // Bloqueia botão caso o dia seja inválido
    if (this.quadraInfos.daysOfOperations.indexOf(diaSemanaSelecionado) !== -1) {
      this.diaInvalido = false;
    } else {
      this.diaInvalido = true;
      this.horariosPesquisados = [];
      this.exibirToast("Quadra fechada no dia selecionado");
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

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  pesquisarHorarios() {
    if (dataSelecionada !== null) {
      console.log(dataSelecionada);
      this.pesquisarHorariosDisponiveis(this.idParam, dataSelecionada);
    } else {
      this.exibirToast("Data é obrigatória");
    }
  }

  pesquisarHorariosDisponiveis(id, data) {
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

    this.herokuProvider.pesquisarHorariosDisponiveis(id, data).subscribe(
      data => {
        this.horariosPesquisados = data.content;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        loading.dismiss();
        console.log('Horários disponíveis foram encontrados');
        // document.getElementById('divResultadosPorHorario').setAttribute("style", "height: 100%;");
      }
    );
  }

  showConfirm(horario) {
    let confirm = this.alertCtrl.create({
      title: 'Você deseja marcar esse Racha?',
      subTitle: horario.startTime + ' - ' + horario.endTime,
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
            this.submit(horario);
          }
        }
      ]
    });
    confirm.present();
  }

  submit(horario) {

    this.dataPost.userId = window.localStorage.getItem('id');
    this.dataPost.blockId = this.idParam;
    this.dataPost.timeId = horario.id;
    this.dataPost.streakDate = dataSelecionada;

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
        <span class="spanMsgLoading">Reservando racha...</span>
      </div>
    `;

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.safeSvg,
    });
    loading.present();

    console.log(this.dataPost);
    
    this.herokuProvider.postRacha(this.dataPost).subscribe(
      (res) => {
        console.log('resposta', res);
      }, error => {
        console.log("Oooops!", error);
      },
      () => {
        loading.dismiss();
        this.showAlert();
      }
    );
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Oh Yeah!',
      subTitle: 'Racha criado com sucesso.',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          console.log("Racha foi criado com sucesso.");
          this.horariosPesquisados = [];
        }
      }]
    });
    alert.present();
  }

  convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }

}