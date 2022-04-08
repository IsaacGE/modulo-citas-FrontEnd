import { RegisterService } from '../services/login/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  checkB: Boolean;
  user: User = new User();
  repetPassword: String;
  clickRegistro: boolean = true;
  constructor(private registerService: RegisterService, private router: Router) { }
  ngOnInit() {
    init_plugins();
  }
  regexp = new RegExp('^[A-Za-z0-9!@#$%^&*]*@gmail.com$');
  check(event) {
    this.checkB = event.explicitOriginalTarget.checked;
  }
  addUser(form: NgForm) {
    this.clickRegistro = false;
    this.user.strName = this.capitalizarTexto(this.user.strName);
    this.user.strLastName = this.capitalizarTexto(this.user.strLastName);
    if (this.user.strMotherLastName) {
      this.user.strMotherLastName = this.capitalizarTexto(this.user.strMotherLastName);
    } else {
      this.user.strMotherLastName = '';
    }
    if (form.invalid) {
      Swal.fire({
        title: 'Error!',
        text: `Faltan campos por llenar en el formulario`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.clickRegistro = true;
    } else if (this.repetPassword != this.user.strPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Error las contraseñas no son iguales, no creamos tu usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.clickRegistro = true;
      this.router.navigate(['/register'])
    } else if (this.regexp.test(this.user.strEmail)) {
      this.registerService.postUser(this.user)
        .then(res => {
          Swal.fire({
            title: '¡Correcto!',
            text: 'Usuario registrado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.clickRegistro = true;
          this.router.navigate(['/login']);
        })
        .catch(err => {
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          this.clickRegistro = true;
          this.router.navigate(['/register']);
        });
    } else if (!this.regexp.test(this.user.strEmail)) {
      Swal.fire({
        title: 'Error!',
        text: `El correo ${this.user.strEmail} no es valido`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.clickRegistro = true;
    }
  }
  capitalizarTexto(texto) {
    let palabras = texto.split(' ');
    let textoCapitalizado = '';
    for (const palabra of palabras) {
      textoCapitalizado += palabra.substr(0, 1).toUpperCase() + palabra.substr(1).toLowerCase() + ' ';
    }
    return textoCapitalizado;
  }
  correoToLowerCase(correo: string) {
    this.user.strEmail = correo.toLowerCase();
  }
}