// Cl_cConConcurso.ts

import vConcurso from "../interfaces/I_vConcurso.js";
import Cl_mConcurso from "../models/Cl_mConcurso.js";
import Cl_vEntregas from "../views/Cl_vEntregas.js";
import Cl_cEntregas from "./Cl_cEntregas.js";

export default class Cl_cConcurso {
    private vista: vConcurso;
    private cEntregasActual: Cl_cEntregas | null = null;
    private tipoActual: string | null = null;

    constructor({  vista }: { vista: vConcurso }) {
        this.vista = vista;
        this.vista.onVerListado(() => this.onVerListado());
        this.vista.onVerFormatoCO6(() => this.onVerFormatoCO6());
        this.vista.onVerFormatoCO7(() => this.onVerFormatoCO7());
        this.vista.onVerFormatoCO8(() => this.onVerFormatoCO8());
        this.vista.onVerFormatoCO9(() => this.onVerFormatoCO9());
        this.vista.onVerFormatoCO11(() => this.onVerFormatoCO11());
        
    }

    private abrirVentana(tipo: string) {
        if (this.cEntregasActual) {
            if (this.tipoActual === tipo) {
                this.cEntregasActual.onVolver();
                this.cEntregasActual = null;
                this.tipoActual = null;
                return;
            }
            this.cEntregasActual.onVolver();
        }

        const vEntregas = new Cl_vEntregas();
        const mConcurso = new Cl_mConcurso();

        this.tipoActual = tipo;
        this.cEntregasActual = new Cl_cEntregas({
            modelo: mConcurso,
            vista: vEntregas,
            tipo: tipo,
            volverCallback: () => {
                this.cEntregasActual = null;
                this.tipoActual = null;
            },
        });
    }

    onVerListado() {
        this.abrirVentana("listado");   }

    onVerFormatoCO6() {
        this.abrirVentana("formatoCO6");    }

    onVerFormatoCO7() {
        this.abrirVentana("formatoCO7");     }

    onVerFormatoCO8() {
        this.abrirVentana("formatoCO8");    } 

    onVerFormatoCO9() {
        this.abrirVentana("formatoCO9");    } 
    
    onVerFormatoCO11() {
        this.abrirVentana("formatoCO11");    } 

    



}


/* 
    🏢 1. ConConcurso Laboral

        APP evaluador
        - Cargar evaluaciones de Concursos
        - Grabarlas en mockapi
        - Permitir carga asíncrona (no todas las evaluaciones a la vez)

        Ej:
            + Permite que hoy se cargue los resultados del Form-CO5
            + Mañana los demás Forms
            + Sin tener que volver a cargar todo cada vez
            
        APP Empresa
        - Reportar los resultados de los Forms de cálculo
        - Ej: Form-CO6, Form-CO7, Form-CO8
        
 */