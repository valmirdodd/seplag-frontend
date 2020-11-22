import { LocaisTramitacaoService } from './../../services/locais-tramitacao.service';
import { Component, OnInit } from '@angular/core';
import { TramitacaoService } from './../../services/tramitacao.service';
import { ServidoresService } from './../../services/servidores.service';
import { BeneficiosService } from 'src/app/services/beneficios.service';
import { Beneficios } from './../../models/beneficios.models';
import { Tramitacao } from './../../models/tramitacao.models';
import { Servidores } from './../../models/servidores.models';
import { HeaderService } from './../../services/header.service';
import { LocaisTramitacao } from 'src/app/models/locaisTramitacao.model';

@Component({
  selector: 'app-tramitacao',
  templateUrl: './tramitacao.component.html',
  styleUrls: ['./tramitacao.component.css']
})
export class TramitacaoComponent implements OnInit {

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

  locaisTramitacao: LocaisTramitacao[]

  tramitacoes: Tramitacao[]
  displayedColumns = ['idBeneficio', 'dtTramitacao', 'descricaoLocalTramitacaoOrigem', 'descricaoLocalTramitacaoDestino']


  constructor(private servServices: ServidoresService,
    private tramitServices: TramitacaoService,
    private benefService: BeneficiosService,
    private locTramitService: LocaisTramitacaoService,
    headerService: HeaderService) {
    headerService.headerData = {
      title: "Tramitação",
      icon: "list",
      routeUrl: '/tramitacao'
    }
  }

  ngOnInit(): void {
  }

  pesquisarServidorPorMatricula(): void {
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
    this.benefService.pesquisarBeneficioPorMatricula(this.servidor).subscribe(
      resp => {
        var matricula = this.servidor.matricula
        if (resp[0]) {
          this.beneficio = resp[0]
          this.benefService.beneficio = this.beneficio
          this.pesquisarTramitacaoPorBeneficio()
        } else {
          this.benefService.showMessage('Beneficio do servidor matricula ' + matricula + ' não localizado', true)
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

  pesquisarTramitacaoPorBeneficio(): void {
    this.tramitServices.pesquisarTramitacaoPorBeneficio(this.beneficio).subscribe(
      resp => {
        if (resp[0]) {
          this.tramitacoes = resp
          this.listarLocaisTramitacao()
        } else {
          this.servServices.showMessage('Tramitação não localizada', true)
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

  listarLocaisTramitacao(): void {
    this.locTramitService.listarLocaisTramitacao().subscribe(
      resp => {
        if (resp[0]) {
          this.locaisTramitacao = resp
          this.tramitacoes.map(
            item => {
              item.descricaoLocalTramitacaoOrigem = this.locaisTramitacao.find(i => i.idLocalTramitacao == item.idLocalTramitacaoOrigem).descricaoLocalTramitacao
              item.descricaoLocalTramitacaoDestino = this.locaisTramitacao.find(i => i.idLocalTramitacao == item.idLocalTramitacaoDestino).descricaoLocalTramitacao
            }
          )
        } else {
          this.servServices.showMessage('Locais de Tramitação não localizados', true)
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

  get cpf(): string { return this.servServices.servidor.cpf }
  get nome(): string { return this.servServices.servidor.nome }
  get orgao(): string { return this.servServices.servidor.orgao }
}
