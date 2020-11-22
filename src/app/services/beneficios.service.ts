import { Servidores } from './../models/servidores.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { Beneficios } from '../models/beneficios.models';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {

  baseUrl = "http://localhost:3001/beneficios";

  private _beneficio = new BehaviorSubject<Beneficios>({
    idBeneficio: 0,
    descricaoBeneficio: '',
    matricula: 0
  })

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'fechar', {
      duration: 6000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['boldRed'] : ['boldGreen']
    })
  }

  public get beneficio(): Beneficios {
    return this._beneficio.value
  }

  public set beneficio(benef: Beneficios) {
    this._beneficio.next(benef)
  }

  criarBeneficio(benef: Beneficios): Observable<Beneficios> {
    console.log('post beneficio')
    console.log(benef)
    return this.http.post<Beneficios>(this.baseUrl, benef)
    // .pipe(
    //   map((obj) => obj),
    //   catchError((e) => this.errorHandler(e))
    // )
  }

  pesquisarBeneficioPorMatricula(serv: Servidores): Observable<Beneficios[]> {
    var url = this.baseUrl + "?matricula=" + serv.matricula
    // console.log('baseUrl: ' + url)
    return this.http.get<Beneficios[]>(url)
  }

  // errorHandler(e: any): Observable<any> {
  //   this.showMessage("Erro ao tentar inserir beneficio!", true);
  //   return EMPTY;
  // }
}

