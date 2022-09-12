import { Component, ElementRef, OnInit } from "@angular/core";
import { Articulo } from "../../models/articulo";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
})
export class CarritoComponent implements OnInit {
  Titulo = "Carrito";
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

  Items: Articulo[] = [
    {
      IdArticulo: 0,
      Nombre: "Hamburguesa Completa",
      Precio: 900.0,
      CodigoDeBarra: "0693536405046",
      IdArticuloFamilia: 9,
      Stock: 898,
      FechaAlta: "2017-01-23T00:00:00",
      Activo: false,
    },
    {
      IdArticulo: 1,
      Nombre: "Pizza Especial",
      Precio: 950,
      CodigoDeBarra: "0779816944014",
      IdArticuloFamilia: 7,
      Stock: 668,
      FechaAlta: "2017-01-04T00:00:00",
      Activo: true,
    },
  ];

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: "" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" },
  ];

  Quitar(item) {
    this.Items.splice(item, 1);
    console.log("Carrito Actualizado");
  }

  RestaurarCarrito() {
    this.Items = [
      {
        IdArticulo: 0,
        Nombre: "Hamburguesa Completa",
        Precio: 900.0,
        CodigoDeBarra: "0693536405046",
        IdArticuloFamilia: 9,
        Stock: 898,
        FechaAlta: "2017-01-23T00:00:00",
        Activo: false,
      },
      {
        IdArticulo: 1,
        Nombre: "Pizza Especial",
        Precio: 950,
        CodigoDeBarra: "0779816944014",
        IdArticuloFamilia: 7,
        Stock: 668,
        FechaAlta: "2017-01-04T00:00:00",
        Activo: true,
      },
    ];
  }

  constructor(private modalDialogService: ModalDialogService) {}

  ngOnInit() {}
}
