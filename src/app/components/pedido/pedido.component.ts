import { DatePipe, getLocaleDateFormat } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.css"],
})
export class PedidoComponent implements OnInit {
  Titulo = "Pedido";
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  AccionABMC = "L"; // inicialmente inicia en el Listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados...",
  };

  //Items: Articulo[] = null;
  //RegistrosTotal: number;
  //Familias: ArticuloFamilia[] = [];

  // opciones de combo

  OcionesCiudad = [
    { Id: null, Nombre: "" },
    { Id: 1, Nombre: "Cordoba" },
    { Id: 2, Nombre: "Carlos Paz" },
    { Id: 3, Nombre: "Jesus Maria" },
    { Id: 4, Nombre: "Calamuchita" },
  ];
  OpcionesFormaPago = [
    { Id: 1, Nombre: "Efectivo" },
    { Id: 2, Nombre: "Credito/Debito" },
  ];
  OpcionesFormaEntrega = [
    { Id: 1, Nombre: "Inmediata" },
    { Id: 2, Nombre: "Acordar Fecha y Hora" },
  ];

  public opSelec: number = 1;
  public opFormaEntrega: number = 1;

  public fechaActual: Date;
  public fechaStrActual: String;
  public horaStrActual: String;

  ngOnInit() {
    this.fechaActual = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes()
    );
    this.fechaStrActual = this.pd.transform(this.fechaActual, "yyyy-MM-dd");
    this.horaStrActual = this.pd.transform(this.fechaActual, "hh:mm");
  }
  FormRegistro = new FormGroup({
    Calle: new FormControl("", [Validators.required]),
    Altura: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{1,10}"),
    ]),

    Referencia: new FormControl("", [Validators.maxLength(300)]),

    FechaAlta: new FormControl("", [
      Validators.required,

      //Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'),
    ]),
    Hora: new FormControl("", [
      Validators.required,

      //Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](202)[2-9]{1}'),
    ]),
    Activo: new FormControl(1),

    Entrega: new FormControl(1),

    Ciudad: new FormControl(null, [Validators.required]),

    Monto: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{1,10}"),
    ]),

    Nombre: new FormControl("", [Validators.required]),
    Tarjeta: new FormControl(null, [
      Validators.required,
      Validators.pattern("5[0-9]{15,15}"),
    ]),

    CVV: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{3,3}"),
    ]),

    FechaVencimiento: new FormControl("", [
      Validators.required,
      Validators.pattern("(0[1-9]|1[012])[-/][2-9]{2}"),
    ]),
  });

  submitted = false;
  montoSelec: number;

  constructor(
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private modalDialogService: ModalDialogService,
    private pd: DatePipe
  ) {}

  Volver() {
    this.AccionABMC = "L";
  }
  confirmar() {
    this.setValidEntrega();
    this.setValidFormaPago();
  }
  setValidFormaPago() {
    if (this.opSelec == 1 && this.FormRegistro.controls.Monto.valid) {
      this.FormRegistro.controls.Nombre.setValue("JOHN DOE");
      this.FormRegistro.controls.Tarjeta.setValue(5555555555555555);
      this.FormRegistro.controls.CVV.setValue(999);
      this.FormRegistro.controls.FechaVencimiento.setValue("01/99");
    } else if (
      this.opSelec == 2 &&
      this.FormRegistro.controls["Nombre"].valid &&
      this.FormRegistro.controls["Tarjeta"].valid &&
      this.FormRegistro.controls["CVV"].valid &&
      this.FormRegistro.controls["FechaVencimiento"].valid
    ) {
      this.FormRegistro.controls.Monto.setValue(1000000);
    }
    this.montoSelec = this.FormRegistro.controls.Monto.value;
    this.mensajeConfirmacion();
  }

  setValidEntrega() {
    if (this.opFormaEntrega == 1) {
      this.FormRegistro.controls.FechaAlta.setValue(
        this.fechaStrActual.toString()
      );
      this.FormRegistro.controls.Hora.setValue(this.horaStrActual.toString());
    } else {
      return;
    }
  }

  mensajeConfirmacion() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }

    this.modalDialogService.Confirm(
      "Su pedido se ha realizado de forma exitosa."
    );
  }
}
