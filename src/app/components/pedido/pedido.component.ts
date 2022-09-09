import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'Efectivo' },
    { Id: false, Nombre: 'Devito/Credito' },
  ];
  OcionesCiudad = [
    { Id: null, Nombre: '' },
    { Id: 1, Nombre: 'Cordoba' },
    { Id: 2, Nombre: 'Carlos Paz' },
    { Id: 3, Nombre: 'Jesu Maria' },
    { Id: 4, Nombre: 'Calamuchita' },
  ];

  OpcionesFormaPago = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'Efectivo' },
    { Id: false, Nombre: 'Credito/Devito' },
  ];

  FormRegistro = new FormGroup({
    IdArticulo: new FormControl(0),

    Calle: new FormControl('', [Validators.required]),
    Altura: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,7}'),
    ]),

    Referencia: new FormControl('', [Validators.maxLength(300)]),

    FechaAlta: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'
      ),
    ]),
    Activo: new FormControl(null, [Validators.required]),
    Ciudad: new FormControl(null, [Validators.required]),
  });

  submitted = false;

  constructor(
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {}

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
