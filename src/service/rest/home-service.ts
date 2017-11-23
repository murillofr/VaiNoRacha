import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    encontrarQuadras() {
        var url = 'https://vainoracha.herokuapp.com/quadras';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}