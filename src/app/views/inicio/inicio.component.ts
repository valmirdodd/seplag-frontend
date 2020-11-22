import { HeaderService } from './../../services/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: "Inicio",
      icon: "home",
      routeUrl: ''
    }
  }

  ngOnInit(): void {
  }

}
