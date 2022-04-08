import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberIt: boolean;
  passDesenc: string;
  passEnc: string;
  errorType: any;
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit() {
    init_plugins();
    if (localStorage.getItem('aa_strEmail') && localStorage.getItem('aa_strPassword')) {
      let desencPass = localStorage.getItem('aa_strPassword');
      let bytes = CryptoJS.AES.decrypt(desencPass, 'secretKey');
      this.passDesenc = bytes.toString(CryptoJS.enc.Utf8);
      this.user.setValue({
        strEmail: localStorage.getItem('aa_strEmail'),
        strPassword: this.passDesenc,
        rememberMe: true
      });
      this.rememberIt = true;
    }
    if (!this.rememberIt) {
      localStorage.removeItem('aa_strEmail');
      localStorage.removeItem('aa_strPassword');
    }
  }
  user = new FormGroup({
    strEmail: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9!@#$%^&*]*@gmail.com$")]),
    strPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rememberMe: new FormControl(this.rememberIt)
  });
  regexp = new RegExp('^[A-Za-z0-9!@#$%^&*]*@gmail.com$');
  get invalidEmail() {
    return this.user.get('strEmail').invalid && this.user.get('strEmail').touched;
  }
  get invalidPassword() {
    return this.user.get('strPassword').invalid && this.user.get('strPassword').touched;
  }
  get valueEmail() {
    return this.user.get('strEmail')
  }
  get valuePassword() {
    return this.user.get('strPassword')
  }
  login() {
    if (this.regexp.test(this.valueEmail.value)) {
      this.loginService.postLogin(this.user.value)
        .subscribe(res => {
          let data = JSON.stringify(res);
          let dataJson = JSON.parse(data);
          localStorage.setItem('aa_token', dataJson.token);
          if (dataJson.token) {
            if (this.user.value.rememberMe) {
              localStorage.setItem('aa_strEmail', this.user.value.strEmail);
              let pass = this.user.value.strPassword;
              this.passEnc = CryptoJS.AES.encrypt(pass, 'secretKey').toString();
              localStorage.setItem('aa_strPassword', this.passEnc);
            } else {
              localStorage.removeItem('aa_strEmail');
              localStorage.removeItem('aa_strPassword');
            }
            if (localStorage.getItem('aa_rutaTemporal')) {
              let user = jwt_decode(localStorage.getItem('aa_token'));
              let idUser = user.user._id;
              this.router.navigateByUrl(`${localStorage.getItem('aa_rutaTemporal')}/${idUser}`);
            } else {
              this.router.navigate(['/dashboard']);
            }
            Swal.fire({
              title: `Hola ${dataJson.cnt.strName} bienvenido`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              text: `Lo sentimos no encontramos la cuenta ${dataJson.cnt.strEmail}.`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
          err => {
            if (err.status !== 0) {
              this.errorType = err.error.msg;
            } else {
              //Este error puede surgir si el servidor no esta ejecutandose o por un mal consumo o llamado de la API.
              this.errorType = `${err.name}: ERROR_DE_CONEXIÓN Error al conectar con el servidor`;
            }
            Swal.fire({
              text: this.errorType,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Lo sentimos no encontramos la cuenta.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}