import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasDocumentos } from './../models/categoriasDocumentos.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasDocumentosService {

  baseUrl = "http://localhost:3001/categoriasDocumentos";

  private _categoriasDocumentos = new BehaviorSubject<CategoriasDocumentos>({
    idCategoriaDocumento: 0,
    abreviacaoCategoria: '',
    descricaoCategoria: ''
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

  public get categoriasDocumentos(): CategoriasDocumentos {
    return this._categoriasDocumentos.value
  }
  
  public set categoriasDocumentos(categoriasDocumentos: CategoriasDocumentos) {
    this._categoriasDocumentos.next(categoriasDocumentos)
  }

  listarCategoriasDocumentos(): Observable<CategoriasDocumentos[]> {
    var url = this.baseUrl
    // console.log('baseUrl: ' + url)
    return this.http.get<CategoriasDocumentos[]>(url)
  }

}
