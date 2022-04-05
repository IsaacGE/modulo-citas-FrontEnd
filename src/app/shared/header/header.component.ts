import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
});

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  objUser: User = new User();
  tokenDecoded: any;
  userEmail: string;
  userName: string;
  surName: string = '';
  userId: any;

  constructor(private router: Router, private user: UserManagementService) { }

  ngOnInit() {
    let token = localStorage.aa_token;
    this.tokenDecoded = jwt_decode(token);
    this.userId = this.tokenDecoded.user._id;
    this.getUser(this.userId);
  }

  logout(){
    localStorage.removeItem('aa_token');
    this.router.navigate(['/login']);
  }

  getUser(id){
    this.user.getUsuariosByid(id).then((res:any) => {
      this.objUser = res.cnt[0];
      this.userName = `${this.objUser.strName} ${this.objUser.strLastName}`;
      this.userEmail = this.objUser.strEmail;
    }).catch(err => {
      Toast.fire({
        icon: 'warning',
        title: err.error ? err.error.msg : err
      });
    });
  }

}
