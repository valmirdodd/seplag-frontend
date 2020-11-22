import { Router } from '@angular/router';
import { Beneficios } from './../../models/beneficios.models';
import { CategoriasDocumentos } from './../../models/categoriasDocumentos.models';
import { CategoriasDocumentosService } from './../../services/categorias-documentos.service';
import { ServidoresService } from './../../services/servidores.service';
import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from 'src/app/services/beneficios.service';

@Component({
  selector: 'app-beneficio-novo',
  templateUrl: './beneficio-novo.component.html',
  styleUrls: ['./beneficio-novo.component.css']
})
export class BeneficioNovoComponent implements OnInit {

  beneficio: Beneficios = {
    idBeneficio: null,
    descricaoBeneficio: null,
    matricula: this.matricula
  }

  categoriasDocumentos: CategoriasDocumentos[]
  displayedColumns = ['idCategoriaDocumento', 'abreviacaoCategoria', 'descricaoCategoria', 'uploadPDF']

  constructor(private servServices: ServidoresService, private benefService: BeneficiosService, private catsDocsService: CategoriasDocumentosService, private router: Router) { }

  ngOnInit(): void {
    this.listarCategoriasDocumentos()
  }

  listarCategoriasDocumentos(): void {
    // console.log('listarCategoriasDocumentos()')
    this.catsDocsService.listarCategoriasDocumentos().subscribe(
      resp => {
        if (resp[0]) {
          this.catsDocsService.categoriasDocumentos = resp[0]
          this.categoriasDocumentos = resp
        } else {
          this.servServices.showMessage('Categorias de documentos não localizadas', true)
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

  beneficioNovoSalvar(): void {
    console.log('beneficioNovoSalvar()')
    console.log(this.beneficio)
    if (this.beneficio.descricaoBeneficio == null) {
      this.benefService.showMessage("Para salvar, informe a descrição do benefício", true)
    } else {
      this.benefService.criarBeneficio(this.beneficio).subscribe(
        resp => {
          if (resp[0]) {
            this.beneficio = resp[0]
            this.benefService.showMessage("Beneficio criado com sucesso", false)
          } else {
            this.servServices.showMessage('Benefício não foi inserido', true)
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
      this.router.navigate(['/beneficios'])
    }
  }

  get nome(): string { return this.servServices.servidor.nome }
  get matricula(): number { return this.servServices.servidor.matricula }

}
