import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HerokuProvider {

  basepath = "/vainorachapp"

  constructor(
    private http: Http,
    public httpClient: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://vainorachapp.herokuapp.com";
    }
  }

  //--------------- GET ---------------

  // Usado em: Quadra Infos
  pesquisarQuadraPorId(id) {
    var url = `${this.basepath}/quadras/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarQuadraPorNome(nome) {
    var url = `${this.basepath}/quadras/quadra?name=${nome}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarQuadrasDisponiveisPorIdeNome(id, data) {
    var url = `${this.basepath}/quadras/disponiveis?timeId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Home, Splash, Login
  pesquisarTodasAsQuadras() {
    var url = `${this.basepath}/quadras`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  // Usado em: 
  pesquisarUsuarioPorId(id) {
    var url = `${this.basepath}/usuarios/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Rachas Marcados
  pesquisarRachasMarcadosPorIdDoUsuario() {
    var url = `${this.basepath}/usuarios/rachas/${window.localStorage.getItem('idUsuario')}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: 
  pesquisarTodosOsUsuarios() {
    var url = `${this.basepath}/usuarios`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  // Usado em: 
  pesquisarHorarioPorId(id) {
    var url = `${this.basepath}/horarios/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Quadra Infos
  pesquisarHorariosDisponiveis(id, data) {
    var url = `${this.basepath}/horarios/desbloqueados?blockId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: 
  pesquisarHorariosNaoDisponiveis(id, data) {
    var url = `${this.basepath}/horarios/bloqueados?blockId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarTodosOsHorarios() {
    var url = `${this.basepath}/horarios`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }






  //--------------- POST ---------------
  // Usado em: Rachas, Quadra Infos
  postRacha(data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      userId: data.userId,
      blockId: data.blockId,
      timeId: data.timeId,
      streakDate: data.streakDate,
      blockRentStatus: 2,
      paymentId: 2,
    });
    console.log('data', data);
    console.log('myData', myData);
    return this.httpClient.post(this.basepath + '/rachas', myData, {
      headers: headers,
      observe: 'response', responseType: 'json'
    });
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
  putUsuario(id, data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.put(`${this.basepath}/usuarios/${id}`, data, {
      headers: headers,
      observe: 'response', responseType: 'json'
    });
  }






  //--------------- DELETE ---------------
  // Usado em: Rachas Marcados
  deleteRacha(id) {
    var url = `${this.basepath}/rachas/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

}
