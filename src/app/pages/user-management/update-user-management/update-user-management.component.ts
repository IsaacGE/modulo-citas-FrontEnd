import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-manegement/user-management.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-update-user-management',
  templateUrl: './update-user-management.component.html',
  styleUrls: ['./update-user-management.component.css']
})
export class UpdateUserManagementComponent implements OnInit {

  @Input() idUsuario: string;
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  usuario: User = new User();
  public role = '';
  idRolUser: string;

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.getUser();
  }

  updateCanceled() {
    this.optionCancel.emit(false);
  }





  getUser() {
    this.userManagementService.getUsuariosByid(this.idUsuario).then((res: any) => {
      this.usuario = res.cnt[0];
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }

  updateUser(form: NgForm) {
    this.userManagementService.putUsuarios(this.idUsuario, this.usuario).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡El usuario ${this.usuario.strName} se actualizó exitosamente!`
      });
      this.optionCancel.emit(false);
      this.refresh.emit(true);
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error ? err.error.msg : err
      });
    });
  }
}

