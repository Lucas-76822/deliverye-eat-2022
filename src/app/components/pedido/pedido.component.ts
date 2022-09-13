import { DatePipe, getLocaleDateFormat } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  Input,
  HostListener,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as Notiflix from "notiflix";
import { ModalDialogService } from "../../services/modal-dialog.service";
import { CarritoComponent } from "../carrito/carrito.component";

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

  // opciones de combo

  OcionesCiudad = [
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
  }
  FormRegistro = new FormGroup({
    Calle: new FormControl("", [Validators.required]),
    Altura: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9]{1,10}"),
    ]),

    Referencia: new FormControl("", [Validators.maxLength(300)]),

    FechaAlta: new FormControl("", [Validators.required]),

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
  montoCarrito: number;
  visionMapa: boolean = false;
  ciudadSeleccionada: number = 1;
  mapaParaCiudad: string;

  @HostListener("document:mousemove", ["$event"])
  cambiarMapa() {
    this.mapaParaCiudad =
      "../../../assets/img/" + this.ciudadSeleccionada + ".png";
  }

  constructor(
    private modalDialogService: ModalDialogService,
    private pd: DatePipe,
    private router: Router
  ) {}

  desplegarMapa() {
    this.visionMapa = !this.visionMapa;
  }
  asignarDireccion() {
    this.FormRegistro.controls.Calle.setValue("San Lorenzo");
    this.FormRegistro.controls.Altura.setValue(468);
  }

  Volver() {
    this.AccionABMC = "L";
  }
  confirmar() {
    console.log(this.montoCarrito + " - " + this.montoSelec);
    this.setValidEntrega();
    this.setValidFormaPago();
    this.validarMonto();

    if (this.FormRegistro.invalid) {
      Notiflix.Notify.failure(
        "No ha ingresado correctamente todos los parametros"
      );
    }
  }
  guardarMonto(event) {
    this.montoCarrito = event.monto;
  }
  validarMonto() {
    if (this.montoSelec >= this.montoCarrito) {
      this.mensajeConfirmacion();
    } else {
      this.FormRegistro.controls.Monto.setValue(null);
    }
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
  }

  setValidEntrega() {
    if (this.opFormaEntrega == 1) {
      this.FormRegistro.controls.FechaAlta.setValue(
        this.fechaStrActual.toString()
      );
    } else {
      return;
    }
  }

  mensajeConfirmacion() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    } else {
      Notiflix.Notify.success("Su pedido se ha realizado de forma exitosa.");
      setTimeout(() => {
        this.router.navigate(["/inicio"]);
      }, 750);

      setTimeout(() => {
        this.FormRegistro.reset();
      }, 800);
    }
  }
}
