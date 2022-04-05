import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm, NgModel, AbstractControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-bootstrap-select',
  templateUrl: './bootstrap-select.component.html',
  styleUrls: ['./bootstrap-select.component.css']
})
export class BootstrapSelectComponent implements OnInit {

  @ViewChild('validModel') validModel: NgModel;
  modelo: any;
  arrDatos:any[];

  @Input() titulo: string = 'Seleccione un elemento.';
  @Input() dataLiveSearch: boolean = false;
  @Input() name: string = 'strSelect';
  @Input() ngForm: NgForm;
  @Input() mensajeValidacion = 'Es necesario seleccionar un valor.';
  @Input() required: boolean = true;
  @Input() multiple: boolean = false;
  @Input() disabled?: boolean;
  @Input() set default(value: string) {
    if ( value ) {
      this.modelo = value;
      this.refrescarSelect();
    }
  }
  @Input() set datos(value: any[]) {
    if ( value ) {
      this.arrDatos = value;
      this.modelo = undefined;
      this.refrescarSelect();
    }
  }

  @Output() model = new EventEmitter();
  @Output() ngModelChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ngForm.form.addControl(this.name, this.validModel.control);
    $(`#${this.name}`).selectpicker({
      liveSearch: this.dataLiveSearch
    });
    this.getButton().addEventListener('click', this.funcion.bind(this), false);
    this.refrescarSelect();
  }

  funcion(): void {
    this.ngForm.controls[this.name].markAsTouched();
    if (this.ngForm.controls[this.name].touched && this.ngForm.controls[this.name].invalid) {
      this.getButton().classList.add('invalido');
      this.refrescarSelect();
    }
  }

  retornarValor(event): void {

    this.getButton().classList.remove('invalido'); 
    this.refrescarSelect();
    this.model.emit(event);
    this.ngModelChange.emit(event);
  }

  refrescarSelect(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
      }, 0);
  }

  getButton() {
    const select = document.querySelectorAll(`[id="${this.name}"]`)[0];
    const padre = select.closest('div');
    return  padre.getElementsByTagName('button')[0];
  }
}

interface Select {
  _id: string;
  strNombre: string;
  strIcon?: string;
  strSubtext?: string;
}

