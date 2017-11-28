import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { MarcarRachaService } from './../../service/rest/marcar-racha-service';

var dataSelecionada = null;
var horarioSelecionado = null;

@IonicPage()
@Component({
  selector: 'page-marcar-racha',
  templateUrl: 'marcar-racha.html',
})
export class MarcarRachaPage {

  private todosHorarios: Array<any>;
  private horariosPesquisados: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public marcarRachaService: MarcarRachaService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarcarRachaPage');
    dataSelecionada = null;
    horarioSelecionado = null;
    this.encontrarTodosHorarios();
  }

  encontrarTodosHorarios() {
    let loading = this.loadingCtrl.create({
      content: 'Detectando horários...'
    });

    loading.present();

    this.marcarRachaService.encontrarTodosHorarios().subscribe(
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
    
    this.marcarRachaService.pesquisarPorHorario(id, data).subscribe(
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
        document.getElementById('divResultadosPorHorario').setAttribute("style", "height: 100%;");
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

}
