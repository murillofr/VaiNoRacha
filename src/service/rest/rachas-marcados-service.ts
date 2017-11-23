import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RachasMarcadosService {

    constructor(private http: Http) { }

    encontrarRachasMarcados() {
        var url = 'https://vainoracha.herokuapp.com/usuarios/rachas/3';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}