import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, BehaviorSubject } from 'rxjs';
import { Beneficios } from './../models/beneficios.models';
import { Tramitacao } from './../models/tramitacao.models';

@Injectable({
  providedIn: 'root'
})
export class TramitacaoService {

  baseUrl = "http://localhost:3001/tramitacao";

  private _tramitacao = new BehaviorSubject<Tramitacao>({
    idBeneficio: 0,
    dataTramitacao: null,
    idLocalTramitacaoOrigem: 0,
    idLocalTramitacaoDestino: 0,
    descricaoLocalTramitacaoOrigem: null,
    descricaoLocalTramitacaoDestino: null
  })

  constructor(private snackBar: MatSnackBar, private  http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  public get tramitacao(): Tramitacao {
    return this._tramitacao.value
  }

  public set tramitacao(tramit: Tramitacao) {
    this._tramitacao.next(tramit)
  }

  criarTramitacao(tramitacao: Tramitacao): Observable<Tramitacao> {
    return this.http.post<Tramitacao>(this.baseUrl, tramitacao)
  }

  pesquisarTramitacao(): Observable<Tramitacao[]> {
    return this.http.get<Tramitacao[]>(this.baseUrl)
  }

  pesquisarTramitacaoPorBeneficio(benef: Beneficios): Observable<Tramitacao[]> {
    var url = this.baseUrl + "?idBeneficio=" + benef.idBeneficio
    console.log('baseUrl: ' + url)
    return this.http.get<Tramitacao[]>(this.baseUrl)
  }
}
