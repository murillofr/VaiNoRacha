import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HerokuProvider {

  basepath = "/vainorachaapi"

  constructor(
    private http: Http,
    public httpClient: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://vainoracha.herokuapp.com";
    }
  }

  //--------------- GET ---------------
  // Usado em: Home, Splash, Login
  encontrarQuadras() {
    var url = `${this.basepath}/quadras`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Rachas Marcados
  encontrarRachasMarcados() {
    var url = `${this.basepath}/usuarios/rachas/${window.localStorage.getItem('idUsuario')}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  encontrarTodosHorarios() {
    var url = `${this.basepath}/horarios/`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarPorHorario(id, data) {
    var url = `${this.basepath}/quadras/disponiveis?horarioId=${id}&data=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Quadra Infos
  encontrarQuadra(id) {
    var url = `${this.basepath}/quadras/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Quadra Infos
  pesquisarHorariosDisponiveis(id, data) {
    var url = `${this.basepath}/horarios/desbloqueados?quadraId=${id}&data=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarQuadraPorNome(nome) {
    var url = `${this.basepath}/quadras/quadra?nome=${nome}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  //--------------- POST ---------------
  // Usado em: Rachas, Quadra Infos
  postRacha(data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      idUsuario: data.idUsuario,
      idQuadra: data.idQuadra,
      idHorario: data.idHorario,
      dataRacha: data.dataRacha,
      statusAluguelQuadra: 2
    });
    console.log(myData);
    return this.httpClient.post(this.basepath + '/rachas', myData, { headers: headers });
  }

  // Usado em: Login
  postLogin(data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.post(this.basepath + '/login', data, {
      headers: headers,
      observe: 'response', responseType: 'json'
    });
  }


  //--------------- PUT ---------------
  // Usado em: Configurações
  putSenha(id, data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.put(`${this.basepath}/usuarios/${id}`, data, {
      headers: headers,
      observe: 'response', responseType: 'json'
    });
  }


  //--------------- DELETE ---------------
  // Usado em: Rachas Marcados
  deletarRacha(id) {
    var url = `${this.basepath}/rachas/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

}
