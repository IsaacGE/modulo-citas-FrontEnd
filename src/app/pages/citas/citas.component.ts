import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';

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
  FechaInicio: Date
  Descripcion: String
  PersonaUtags: String
  FechaFin: Date
  SearchText: any

  titleToDo: String
  editando: boolean
  idToUpdate: string
  userId: any

  constructor(private http: HttpClient) {
    this.consultaCitas()
    this.Empresa = ""
    this.Visitante = ""
    this.Hora = ""
    this.Descripcion = ""
    this.PersonaUtags = ""
    this.FechaInicio = null
    this.SearchText = ""
    this.FechaFin = null

    this.citasList = []

    this.titleToDo = "Nueva Cita"
    this.editando = false
    this.idToUpdate = ""
  }

  registrarCita() {
    let newCita = {
      idUsuario: this.userId,
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
        this.limpiarDatos('clear');
        this.consultaCitas();
      },
      err => {
        console.log(this.citasList)
        this.citasList = []
        console.log(err)
      }
    )
  }

  limpiarDatos(text) {
    if (text == "newCita") {
      this.titleToDo = "Nueva Cita"
      this.editando = false
    }
    this.Empresa = ""
    this.Visitante = ""
    this.Hora = ""
    this.FechaInicio = null
    this.Descripcion = ""
    this.PersonaUtags = ""
    this.FechaFin = null
  }

  consultaCitas() {
    const tokenDecoded = jwt_decode(localStorage.getItem('aa_token'));
    this.userId = tokenDecoded.user._id
    console.log("ID del usuario: "+this.userId)
    this.http.get('http://localhost:3000/api/citas/getCitas?idUsuario='+this.userId).subscribe(
      (res: any) => {
        this.citasList = res.citas
        console.log(res)
      },
      err => {
        this.citasList = []
        console.log(err)
      })
  }

  deleteCita(id, blnEstatus) {
    Swal.fire({
      title: '¿Desactivar / Activar cita?',
      text: "Estás a punto de deactivar/activar la cita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        let params = {
          idCita: id
        }
        this.http.delete('http://localhost:3000/api/citas/desactivarCita?idCita=' + params.idCita + '&blnActivo=' + blnEstatus).subscribe(
          (res: any) => {
            if (blnEstatus) {
              Swal.fire(
                'Cita Activada',
                'La cita se ha vuelto a activar',
                'success'
              )
            } else {
              Swal.fire(
                'Cita Desactivada',
                'La cita ha deactivado',
                'success'
              )
            }
            this.consultaCitas()
          },
          err => {
            console.log("Error Update status!")
            throw err
          })
      }
    })
  }

  getDataToUpdate(id, nombre, descripcion, visitante, prsnUtags, fechaInicio, fechaFin, hora) {
    this.idToUpdate = id,
    this.editando = true
    this.titleToDo = "Modificar Cita"
    this.Empresa = nombre
    this.Visitante = visitante
    this.Hora = hora
    this.FechaInicio = fechaInicio
    this.Descripcion = descripcion
    this.PersonaUtags = prsnUtags
    this.FechaFin = fechaFin
  }

  updateCita() {
    let citaUpdate = {
      _id: this.idToUpdate,
      strNombre: this.Empresa,
      strPersonaVisitante: this.Visitante,
      strHora: this.Hora,
      dteFechaInicio: this.FechaInicio,
      strDescripcion: this.Descripcion,
      strPersonaUtags: this.PersonaUtags,
      dteFechaFin: this.FechaFin
    }
    Swal.fire({
      title: 'Estas a punto de actualizar la cita',
      text: "¿Estas realmente seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put('http://localhost:3000/api/citas/updateCita', citaUpdate).subscribe(
          (res: any) => {
            Swal.fire(
              '¡Cita actualizada!',
              'Se ha actualizado la cita',
              'success'
            )
            console.log(res)
            this.limpiarDatos('clear');
            this.consultaCitas();
          },
          (err:any) => {
            console.log("Error al actualizar:")
            throw err
          }
        )
      }
    })
  }

  ngOnInit(): void {
    
  }

}