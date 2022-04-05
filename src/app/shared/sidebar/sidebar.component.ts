import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { SidebarService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
});

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  objUser: User = new User();
  menu: any;
  arrFinal: any[] = [];
  rol: any;
  userId: any;
  userName: string;
  surName: string = '';
  dashboard = { icono: '', roles: '', titulo: '', url: '' };

  constructor(public _sidebarService: SidebarService, private user: UserManagementService) { }

  ngOnInit() {
    const tokenDecoded = jwt_decode(localStorage.getItem('aa_token'));
    this.rol = tokenDecoded.user.idRole;
    this.userId = tokenDecoded.user._id;
    this.getUser(this.userId);

    let m = {};
    for (let menu of this._sidebarService.menu) {
      let sub = [];
      if (menu.submenu) {
        for (let subMenu of menu.submenu) {
          console.log(subMenu);
          if (menu.submenu.length >= 1) {
            let subm = {
              icono: subMenu.icono,
              titulo: subMenu.titulo,
              url: subMenu.url
            }
            sub.push(subm);

          }
        }
        m = {
          titulo: menu.titulo,
          icono: menu.icono,
          submenus: sub,
          numSub: sub.length
        }
      } else {
        if (menu.roles.indexOf(this.rol) > -1) {
          this.dashboard = menu
        }
      }

      if (sub.length > 0) {
        this.arrFinal.push(m);
      }
    }
  }

  getUser(id) {
    this.user.getUsuariosByid(id).then((res: any) => {
      console.log(res, 'EAAAAAAA')
      this.objUser = res.cnt[0];

      this.userName = `${this.objUser.strName} ${this.objUser.strLastName}`;
    }).catch(err => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }
}
