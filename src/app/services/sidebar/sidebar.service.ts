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
        { titulo: 'Citas', icono: 'fa fa-book', url: '/citas', }
      ]
    },

  ];

  constructor() { }
}
