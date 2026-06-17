// Cl_vConcurso.ts

import I_vConcurso from "../interfaces/I_vConcurso.js";

export default class Cl_vConcurso implements I_vConcurso {

    // Botones de Cada Tabla
        private btVerListado: HTMLButtonElement;
        private btVerFormatoCO6: HTMLButtonElement;
        private btVerFormatoCO7: HTMLButtonElement;
        private btVerFormatoCO8: HTMLButtonElement;
    
    constructor() {
        
        this.btVerListado = document.getElementById("concurso_btVerListado") as HTMLButtonElement;
        this.btVerFormatoCO6 = document.getElementById("concurso_btVerFormatoCO6") as HTMLButtonElement;   
        this.btVerFormatoCO7 = document.getElementById("concurso_btVerFormatoCO7") as HTMLButtonElement;   
        this.btVerFormatoCO8 = document.getElementById("concurso_btVerFormatoCO8") as HTMLButtonElement;   

    }

    // Botones para Ver las Tablas del Evaluador
        onVerListado(callback: () => void): void {
            this.btVerListado.onclick = callback;     }

        onVerFormatoCO6(callback: () => void): void {
            this.btVerFormatoCO6.onclick = callback;    }

        onVerFormatoCO7(callback: () => void): void {
            this.btVerFormatoCO7.onclick = callback;    }

        onVerFormatoCO8(callback: () => void): void {
            this.btVerFormatoCO8.onclick = callback;    }

        deshabilitarBotones() {
            this.btVerListado.disabled = true;
            this.btVerFormatoCO6.disabled = true;
            this.btVerFormatoCO7.disabled = true;
            this.btVerFormatoCO8.disabled = true;
        }

        habilitarBotones() {
            this.btVerListado.disabled = false;
            this.btVerFormatoCO6.disabled = false;  
            this.btVerFormatoCO7.disabled = false;  
            this.btVerFormatoCO8.disabled = false;  
        }

}