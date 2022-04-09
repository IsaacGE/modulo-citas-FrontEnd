import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citasList: any[]

  Empresa: String
  Visitante: String
  Hora: String
  FechaInicio: String
  Descripcion: String
  PersonaUtags: String
  FechaFin: String
  SearchText: String

  constructor(private http: HttpClient) {
    this.Empresa = ""
    this.Visitante = ""
    this.Hora = ""
    this.FechaInicio = ""
    this.Descripcion = ""
    this.PersonaUtags = ""
    this.FechaFin = ""

    this.SearchText = ""
    
    this.citasList = []
    this.consultaCitas()
  }

  registrarCita(){
    let newCita = {
      strNombre: this.Empresa,
      strPersonaVisitante: this.Visitante,
      strHora: this.Hora,
      dteFechaInicio: this.FechaInicio,
      strDescripcion: this.Descripcion,
      strPersonaUtags: this.PersonaUtags,
      dteFechaFin: this.FechaFin
    }
    this.http.post('http://localhost:3000/api/citas/nuevaCita', newCita).subscribe(
    (res: any) => {
      this.citasList = res.citas
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Tu cita a sido registrada',
        showConfirmButton: true,
        timer: 3000
      })
      this.limpiarDatos();
      this.consultaCitas();
    },
    err => {
      console.log(this.citasList)
      this.citasList = []
      console.log(err)
    }
    )
  }

  limpiarDatos() {
    this.Empresa = ""
    this.Visitante = ""
    this.Hora = ""
    this.FechaInicio = ""
    this.Descripcion = ""
    this.PersonaUtags = ""
    this.FechaFin = ""
  }

  consultaCitas() {
    this.http.get('http://localhost:3000/api/citas/getCitas').subscribe(
    (res: any) => {
      this.citasList = res.citas
      console.log(res.citas)
    },
    err => {
      this.citasList = []
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

}