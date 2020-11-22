import { Servidores } from './../models/servidores.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServidoresService {

  baseUrl = "http://localhost:3001/servidores";

  private _servidor = new BehaviorSubject<Servidores>({
    matricula: 0,
    cpf: '',
    nome: '',
    orgao: ''
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
  
  public get servidor(): Servidores {
    return this._servidor.value
  }
  
  public set servidor(servidor: Servidores) {
    this._servidor.next(servidor)
  }

  criarServidor(servidor: Servidores): Observable<Servidores> {
    return this.http.post<Servidores>(this.baseUrl, servidor)
  }

  pesquisarServidorPorMatricula(serv: Servidores): Observable<Servidores[]> {
    var url = this.baseUrl + "?matricula=" + serv.matricula
    // console.log('baseUrl: ' + url)
    return this.http.get<Servidores[]>(url)
  }
}
