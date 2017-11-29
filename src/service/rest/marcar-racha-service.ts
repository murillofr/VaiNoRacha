import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class MarcarRachaService {

    basepath = "/vainorachaapi"

    constructor(
        private http: Http,
        private _platform: Platform
    ) { 
        if(this._platform.is("cordova")) {
            this.basepath = "https://vainoracha.herokuapp.com";
        }
    }

    encontrarTodosHorarios() {
        var url = `${this.basepath}/horarios/`;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    pesquisarPorHorario(id, data) {
        // var url = `${this.basepath}/quadras/disponiveis?horarioId=` + id + '&data=' + data;
        var url = `${this.basepath}/quadras/disponiveis?horarioId=${id}&data=${data}`;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}