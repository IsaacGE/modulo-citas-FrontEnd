import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'VISITAGS', icono: 'fa fa-exclamation-circle',
      submenu: [
        { titulo: 'Personas', icono: 'fa fa-users', url: '/personas', },

      ]
    },

  ];

  constructor() { }
}
