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
  encontrarQuadras() {
    var url = `${this.basepath}/quadras`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  encontrarRachasMarcados() {
    var url = `${this.basepath}/usuarios/rachas/3`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  encontrarTodosHorarios() {
    var url = `${this.basepath}/horarios/`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  pesquisarPorHorario(id, data) {
    var url = `${this.basepath}/quadras/disponiveis?horarioId=${id}&data=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  //--------------- POST ---------------
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

}
