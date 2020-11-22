import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { TramitacaoComponent } from './views/tramitacao/tramitacao.component';
import { BeneficiosComponent } from './views/beneficios/beneficios.component';
import { BeneficioNovoComponent } from './views/beneficio-novo/beneficio-novo.component';
import { BeneficioNovoUploadComponent } from './views/beneficio-novo-upload/beneficio-novo-upload.component';

const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "beneficios",
    component: BeneficiosComponent
  },
  {
    path: "beneficionovo",
    component: BeneficioNovoComponent
  },
  {
    path: "beneficionovo/upload:idCategoriaDocumento",
    component: BeneficioNovoUploadComponent
  },
  {
    path: "tramitacao",
    component: TramitacaoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
