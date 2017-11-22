import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuadraService {

    constructor(private http: Http) { }

    encontrarQuadras() {
        var url = 'http://localhost:8080/rachas';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}