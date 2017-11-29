import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class RachasMarcadosService {

    basepath = "/vainorachaapi"

    constructor(
        private http: Http,
        private _platform: Platform
    ) { 
        if(this._platform.is("cordova")) {
            this.basepath = "https://vainoracha.herokuapp.com";
        }
    }

    encontrarRachasMarcados() {
        var url = `${this.basepath}/usuarios/rachas/3`;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}