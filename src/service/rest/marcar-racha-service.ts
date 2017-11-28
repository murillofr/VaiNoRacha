import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MarcarRachaService {

    constructor(private http: Http) { }

    encontrarTodosHorarios() {
        var url = 'https://vainoracha.herokuapp.com/horarios/';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    pesquisarPorHorario(id, data) {
        var url = 'https://vainoracha.herokuapp.com/quadras/disponiveis?horarioId=' + id + '&data=' + data;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}