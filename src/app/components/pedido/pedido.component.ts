import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  Titulo = 'Pedido';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };

  AccionABMC = 'L'; // inicialmente inicia en el Listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  //Items: Articulo[] = null;
  //RegistrosTotal: number;
  //Familias: ArticuloFamilia[] = [];

  // opciones de combo

  OcionesCiudad = [
    { Id: null, Nombre: '' },
    { Id: 1, Nombre: 'Cordoba' },
    { Id: 2, Nombre: 'Carlos Paz' },
    { Id: 3, Nombre: 'Jesu Maria' },
    { Id: 4, Nombre: 'Calamuchita' },
  ];
  OpcionesFormaPago = [
    { Id: 1, Nombre: 'Efectivo' },
    { Id: 2, Nombre: 'Credito/Debito' },
  ];
  OpcionesFormaEntrega = [
    { Id: 1, Nombre: 'Inmediata' },
    { Id: 2, Nombre: 'Acordar Fecha y Hora' },
  ];

  pagoValidadorRequerido() {
    if (this.opSelec == 1) {
      this.FormRegistro.controls["Monto"].setValidators([Validators.required, Validators.pattern('[0-9]{1,10}')]);
      this.FormRegistro.controls["Monto"].updateValueAndValidity()
      this.FormRegistro.controls["Tarjeta"].setValidators(null);
      this.FormRegistro.controls["Tarjeta"].updateValueAndValidity()
      this.FormRegistro.controls["CVV"].setValidators(null);
      this.FormRegistro.controls["CVV"].updateValueAndValidity()
      this.FormRegistro.controls["FechaVencimiento"].setValidators(null);
      this.FormRegistro.controls["FechaVencimiento"].updateValueAndValidity()
      this.FormRegistro.controls["Nombre"].setValidators(null);
      this.FormRegistro.controls["Nombre"].updateValueAndValidity()

    }
    
    else {
      this.FormRegistro.controls["Monto"].setValidators(null);
      this.FormRegistro.controls["Monto"].updateValueAndValidity()
      this.FormRegistro.controls["Tarjeta"].setValidators([Validators.required, Validators.pattern('5[0-9]{15,15}')]); 
      this.FormRegistro.controls["Tarjeta"].updateValueAndValidity()
      this.FormRegistro.controls["CVV"].setValidators([Validators.required,Validators.pattern('[0-9]{3,3}')]); 
      this.FormRegistro.controls["CVV"].updateValueAndValidity()
      this.FormRegistro.controls["Nombre"].setValidators([Validators.required]); 
      this.FormRegistro.controls["Nombre"].updateValueAndValidity()
      this.FormRegistro.controls["FechaVencimiento"].setValidators([Validators.required, Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'
      )]); 
      this.FormRegistro.controls["FechaVencimiento"].updateValueAndValidity()
    }
  }
 
  entregaValidadorRequerido() {
    if (this.opFormaEntrega != 2) {
      this.FormRegistro.controls["FechaAlta"].setValidators(null);
      this.FormRegistro.controls["FechaAlta"].updateValueAndValidity()
      this.FormRegistro.controls["Hora"].setValidators(null);
      this.FormRegistro.controls["Hora"].updateValueAndValidity()
    }
    
    else {
      this.FormRegistro.controls["FechaAlta"].setValidators([Validators.required]); 
      this.FormRegistro.controls["FechaAlta"].updateValueAndValidity()
      this.FormRegistro.controls["Hora"].setValidators([Validators.required]);
      this.FormRegistro.controls["Hora"].updateValueAndValidity()
    }
  }

  public opSelec: number = 1;
  public opFormaEntrega: number = 1;


  public fechaActual:Date;
  public fechaStrActual:String;
  public horaStrActual:String;

  ngOnInit() {
    this.fechaActual = new Date( new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),new Date().getMinutes());
    this.fechaStrActual = this.pd.transform(this.fechaActual,"yyyy-MM-dd");
    this.horaStrActual = this.pd.transform(this.fechaActual,"hh:mm");
    
  }
  FormRegistro = new FormGroup({

    Calle: new FormControl('', [Validators.required]),
    Altura: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,10}'),
    ]),

    Referencia: new FormControl('', [Validators.maxLength(300)]),

    FechaAlta: new FormControl('', 
      //Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'),
    ),
    Hora: new FormControl('',
      //Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'),
    ),
    Activo: new FormControl(1, [Validators.required]),

    Entrega: new FormControl(1, [Validators.required]),

    Ciudad: new FormControl(null, [Validators.required]),

    Monto: new FormControl(null),
    
    Nombre: new FormControl(''),

    Tarjeta: new FormControl(null),

    CVV: new FormControl(null),

    FechaVencimiento: new FormControl(''),
  });

  submitted = false;

  constructor(
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private modalDialogService: ModalDialogService,
    private pd:DatePipe,
  ) {}

  Volver() {
    this.AccionABMC = 'L';
  }
  mensajeConfirmacion() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }

    this.modalDialogService.Confirm(
      'Su pedido se ha realizado de forma exitosa.'
    );
  }
}
