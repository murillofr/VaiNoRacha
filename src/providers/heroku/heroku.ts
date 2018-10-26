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
    var url = `${this.basepath}/block/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarQuadraPorNome(nome) {
    var url = `${this.basepath}/block/block?name=${nome}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarQuadrasDisponiveisPorIdeNome(id, data) {
    var url = `${this.basepath}/block/available?scheduleId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Home, Splash, Login
  pesquisarTodasAsQuadras() {
    var url = `${this.basepath}/block?order=name%3Ddesc%2C+createdAt%3DASC`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  // Usado em: 
  pesquisarUsuarioPorId(id) {
    var url = `${this.basepath}/user/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: 
  pesquisarUsuarioPorNome(nome) {
    var url = `${this.basepath}/user/userName?name=${nome}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Rachas Marcados
  pesquisarRachasMarcadosPorIdDoUsuario() {
    var url = `${this.basepath}/user/streaks/${window.localStorage.getItem('id')}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: 
  pesquisarTodosOsUsuarios() {
    var url = `${this.basepath}/user`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }



  // Usado em: 
  pesquisarHorarioPorId(id) {
    var url = `${this.basepath}/times/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Quadra Infos
  pesquisarHorariosDisponiveis(id, data) {
    var url = `${this.basepath}/times/unblocked?blockId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: 
  pesquisarHorariosNaoDisponiveis(id, data) {
    var url = `${this.basepath}/times/blocked?blockId=${id}&date=${data}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  // Usado em: Marcar Racha
  pesquisarTodosOsHorarios() {
    var url = `${this.basepath}/times`;
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
      paymentId: 1,
    });
    console.log('data', data);
    console.log('myData', myData);
    return this.httpClient.post(this.basepath + '/streak', myData, {
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
  putUsuario(id, newPassword) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      name: window.localStorage.getItem('name'),
      password: newPassword,
      birthDate: window.localStorage.getItem('birthDate'),
      userName: window.localStorage.getItem('userName'),
      cpfOrCnpj: window.localStorage.getItem('cpfOrCnpj'),
      loggedByFace: false,
    });
    console.log('myData', myData);
    return this.httpClient.put(`${this.basepath}/user/${id}`, myData, {
      headers: headers,
      observe: 'response', responseType: 'json'
    });
  }






  //--------------- DELETE ---------------
  // Usado em: Rachas Marcados
  deleteRacha(id) {
    var url = `${this.basepath}/streak/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

}
