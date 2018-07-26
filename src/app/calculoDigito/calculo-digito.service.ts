import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/internal/Observable'
import { URL_API } from '../../app.api';
import {map } from 'rxjs/operators'
import { Arquivo } from './arquivo.model';

@Injectable({
  providedIn: 'root'
})
export class CalculoDigitoService {

  constructor(private http: Http) { }
  
  //realiza um post do arquivo que foi selecionado e o envia pro back-end
  gerarMatriculasDV(arquivo: string): Observable<Arquivo> { 
    return this.http.post(`${URL_API}/gerarMatriculasComDV`,arquivo).pipe(map(response => response.json()))
  }

  //realiza um post do arquivo que foi selecionado e o envia pro back-end
  matriculasParaVerificar(arquivo: string): Observable<Arquivo> { 
    return this.http.post(`${URL_API}/matriculasParaVerificar`,arquivo).pipe(map(response => response.json()))
  }

}
