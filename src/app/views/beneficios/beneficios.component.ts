import { Router } from '@angular/router';
import { BeneficiosService } from './../../services/beneficios.service';
import { Beneficios } from './../../models/beneficios.models';
import { HeaderService } from './../../services/header.service';
import { Servidores } from './../../models/servidores.models';
import { ServidoresService } from './../../services/servidores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})
export class BeneficiosComponent implements OnInit {

  servidor: Servidores = {
    matricula: null,
    cpf: null,
    nome: null,
    orgao: null
  }

  beneficio: Beneficios = {
    idBeneficio: null,
    descricaoBeneficio: null,
    matricula: null
  }

  beneficios: Beneficios[]
  displayedColumns = ['idBeneficio', 'descricaoBeneficio']

  private _possuiBeneficioCadastrado: boolean = false

  constructor(private servServices: ServidoresService, private benefService: BeneficiosService, headerService: HeaderService, private router: Router) {
    headerService.headerData = {
      title: "Benefícios",
      icon: "add_task",
      routeUrl: '/beneficios'
    }
  }

  ngOnInit(): void {
    this.possuiBeneficioCadastrado = true
  }

  pesquisarServidorPorMatricula(): void {
    // console.log('pesquisarServidorPorMatricula()')
    this.servServices.pesquisarServidorPorMatricula(this.servidor).subscribe(
      resp => {
        var mat = this.servidor.matricula
        if (resp[0]) {
          this.servidor = resp[0]
          this.servServices.servidor = this.servidor
          this.pesquisarBeneficioPorMatricula()
        } else {
          this.servServices.showMessage('Matrícula ' + mat + ' não localizada', true)
        }
      }
      ,
      erro => {
        console.log('erro: ' + erro.status)
        if (erro.status == 404) {
          this.servServices.showMessage('Erro no acesso aos dados', false);
        }
      }
    )
  }

  pesquisarBeneficioPorMatricula(): void {
    // console.log('pesquisarBeneficioPorMatricula()')
    this.benefService.pesquisarBeneficioPorMatricula(this.servServices.servidor).subscribe(
      resp => {
        if (resp[0]) {
          this.beneficio = resp[0]
          this.beneficios = resp
          this.benefService.beneficio = this.beneficio
          this.possuiBeneficioCadastrado = true
        } else {
          this.possuiBeneficioCadastrado = false
        }
      }
      ,
      erro => {
        console.log('erro: ' + erro.status)
        if (erro.status == 404) {
          this.servServices.showMessage('Erro no acesso aos dados', false);
        }
      }
    )
  }

  public get possuiBeneficioCadastrado(): boolean {
    return this._possuiBeneficioCadastrado
  }

  public set possuiBeneficioCadastrado(trueFalse: boolean) {
    this._possuiBeneficioCadastrado = trueFalse
  }

  beneficioNovo(): void {
    console.log('beneficioNovo()')
    this.router.navigate(['/beneficionovo'])
  }

  get cpf(): string { return this.servServices.servidor.cpf }
  get nome(): string { return this.servServices.servidor.nome }
  get orgao(): string { return this.servServices.servidor.orgao }
  get idBeneficio(): number { return this.benefService.beneficio.idBeneficio }

}
