import { BehaviorSubject, Observable } from 'rxjs';
import { LocaisTramitacao } from './../models/locaisTramitacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaisTramitacaoService {

  baseUrl = "http://localhost:3001/locaisTramitacao";

  private _locaisTramitacao = new BehaviorSubject<LocaisTramitacao>({
    idLocalTramitacao: 0,
    descricaoLocalTramitacao: ''
  })

  constructor(private http: HttpClient) { }

  public get locaisTramitacao(): LocaisTramitacao {
    return this._locaisTramitacao.value
  }
  
  public set locaisTramitacao(locaisTramit: LocaisTramitacao) {
    this._locaisTramitacao.next(locaisTramit)
  }

  listarLocaisTramitacao(): Observable<LocaisTramitacao[]> {
    var url = this.baseUrl
    // console.log('baseUrl: ' + url)
    return this.http.get<LocaisTramitacao[]>(url)
  }
}
