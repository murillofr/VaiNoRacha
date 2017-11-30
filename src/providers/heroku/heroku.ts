import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HerokuProvider {

  basepath = "/vainorachaapi"

  constructor(
    public http: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://vainoracha.herokuapp.com";
    }
  }

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
    return this.http.post(this.basepath + '/rachas', myData, { headers: headers });
  }

}
