// Cl_cEntregas.ts

import I_vEntregas from "../interfaces/I_vEntregas.js";
import Cl_sEntregas from "../services/Cl_sEntregas.js";
import Cl_mConcurso from "../models/Cl_mConcurso.js";

export default class Cl_cEntregas {
    private modelo: Cl_mConcurso;
    private vista: I_vEntregas;
    private volverCallback: () => void;
    private tipo: string;

    constructor({modelo, vista, tipo, volverCallback}
        :{  
            modelo: Cl_mConcurso;
            vista: I_vEntregas;
            tipo: string;
            volverCallback: () => void;
        }) {
            this.modelo = modelo;
            this.vista = vista;
            this.tipo = tipo;
            this.volverCallback = volverCallback;
            this.vista.onRecargar(() => this.btRecargarOnClick());
            this.vista.onVolver(() => this.onVolver());
            this.vista.onBuscarCO6(() => this.btBuscarCO6OnClick());
            this.vista.mostrar(this.tipo);
            this.btRecargarOnClick();
    }

    onVolver() {
        this.vista.ocultar();
        this.volverCallback();
    }

    async btBuscarCO6OnClick() {
        const cedula = this.vista.cedulaBuscarCO6;

        if (!cedula || cedula.trim() === "") {
            alert("Ingrese una cédula para buscar");
            return;
        }

        const aspirante = this.modelo
            .getAspirantes()
            .find(a => a.cedula === cedula);

        if (!aspirante) {
            this.vista.mostrarMensajeSinResultados(
                "No se encontró ningún aspirante con esa cédula"
            );
            return;
        }

        this.vista.mostrarReporteCO6Individual(aspirante);
    }

    async btRecargarOnClick() {
        let resultado = await Cl_sEntregas.getEntregas();
            if (resultado.ok === false) {
                alert("Error: No se pudo conectar con el servidor");
                    return;
        }
        
        this.modelo.setAspirantes(resultado.tabla);
            switch (this.tipo) {

                case "listado": this.vista.mostrarListado(this.modelo.getAspirantes()); break;
                case "formatoCO6": this.vista.mostrarFormatoCO6(
                    this.modelo.getAspirantes(),
                    this.modelo.porcentajeAprobados(),
                    this.modelo.calificacionFinalMasAlta(),
                    this.modelo.calificacionFinalMasBaja()
                ); break;
                case "formatoCO7": this.vista.mostrarFormatoCO7(this.modelo.getAspirantes()); break;
                case "formatoCO8": this.vista.mostrarFormatoCO8(this.modelo.getAspirantes()); break;
                case "formatoCO9": this.vista.mostrarFormatoCO9(this.modelo.getAspirantes()); break;

                default: console.error("No se ha Encontrado la Sección", this.tipo);

            }
        }
        /* 
            if (this.tipo === "listado") {
                this.vista.mostrarListado(this.modelo.getAspirantes());     
            } 
            
            else if (this.tipo === "formatoCO6") {
                this.vista.mostrarFormatoCO6(this.modelo.getAspirantes());
            } 
                
        */
    
}
