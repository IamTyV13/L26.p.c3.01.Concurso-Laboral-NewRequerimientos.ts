import I_vEntregas from "../interfaces/I_vEntregas.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_vEntregas implements I_vEntregas {

    // Secciones donde Estaran las tablas
        private uiListado: HTMLDivElement;
        private uiFormatoCO6: HTMLDivElement;
        private uiFormatoCO7: HTMLDivElement;
        private uiFormatoCO8: HTMLDivElement;
        private uiFormatoCO9: HTMLDivElement;

    // Tablas de las Secciones
        private tblListado: HTMLTableElement;
        private tblFormatoCO6: HTMLTableElement;
        private tblFormatoCO7: HTMLTableElement;
        private tblFormatoCO8: HTMLTableElement;
        private tblFormatoCO9: HTMLTableElement;

    // Botones de la tabla CO6
        private btBuscarCO6: HTMLButtonElement;
        private inCedulaBuscarCO6: HTMLInputElement;

    // Requerimientos 
        private lblPorcentAprobados: HTMLElement;
        private lblCalifMasAlta: HTMLElement;
        private lblCalifMasBaja: HTMLElement;

    // Métodos Para Recargar Pagina y Volver al Menu Principal
        private btRecargar: HTMLButtonElement;
        private btVolver: HTMLButtonElement;

    constructor() {
        this.uiListado = document.getElementById("listado") as HTMLDivElement;
        this.uiFormatoCO6 = document.getElementById("formatoCO6") as HTMLDivElement;
        this.uiFormatoCO7 = document.getElementById("formatoCO7") as HTMLDivElement;
        this.uiFormatoCO8 = document.getElementById("formatoCO8") as HTMLDivElement;
        this.uiFormatoCO9 = document.getElementById("formatoCO9") as HTMLDivElement;

        this.tblListado = document.getElementById("listado_tblListado") as HTMLTableElement;
        this.tblFormatoCO6 = document.getElementById("formatoCO6_tblFormatoCO6") as HTMLTableElement;
        this.tblFormatoCO7 = document.getElementById("formatoCO7_tblFormatoCO7") as HTMLTableElement;
        this.tblFormatoCO8 = document.getElementById("formatoCO8_tblFormatoCO8") as HTMLTableElement;
        this.tblFormatoCO9 = document.getElementById("formatoCO9_tblFormatoCO9") as HTMLTableElement;

        this.btBuscarCO6 = document.getElementById("formatoCO6_btBuscar") as HTMLButtonElement;
        this.inCedulaBuscarCO6 = document.getElementById("formatoCO6_inCedula") as HTMLInputElement;

        this.lblPorcentAprobados = document.getElementById("formatoCO6_lblPorcentAprobados") as HTMLElement;
        this.lblCalifMasAlta = document.getElementById("formatoCO6_lblCalifMasAlta") as HTMLElement;
        this.lblCalifMasBaja = document.getElementById("formatoCO6_lblCalifMasBaja") as HTMLElement;

        this.btRecargar = document.getElementById("entregas_btRecargar") as HTMLButtonElement;
        this.btVolver = document.getElementById("entregas_btVolver") as HTMLButtonElement;
    }
   
    // Metodos para la Pagina
        onRecargar(callback: () => void): void {
            this.btRecargar.onclick = callback;     }

        onVolver(callback: () => void): void {
            this.btVolver.onclick = callback;   }

        onBuscarCO6(callback: () => void): void {
            this.btBuscarCO6.onclick = callback;   }

        get cedulaBuscarCO6(): string {
            return this.inCedulaBuscarCO6.value;   }

    // Métodos para Mostrar las Tablas
        mostrarListado(aspirantes: Cl_mAspirante[]): void {
            const fragment = document.createDocumentFragment();
            if (aspirantes.length === 0) {
                const tr = document.createElement("tr");
                    tr.innerHTML = `<td colspan="2" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                fragment.appendChild(tr);
            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.nombre}</td>
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblListado.innerHTML = "";
            this.tblListado.appendChild(fragment);
        }

        mostrarFormatoCO6(aspirantes: Cl_mAspirante[], porcentAprobados: number, califMasAlta: number, califMasBaja: number): void {
            const fragment = document.createDocumentFragment();
                if (aspirantes.length === 0) {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `<td colspan="8" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                            fragment.appendChild(tr);
            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.sumaPtsFormatoCO5().toFixed(2)}</td>
                            <td>${aspirante.sumaPtsFormatoCO51().toFixed(2)}</td>
                            <td>${aspirante.sumaPtsFormatoCO52().toFixed(2)}</td>
                            <td>${aspirante.sumaPtsFormatoCO53().toFixed(2)}</td>
                            <td>${aspirante.totalObtenido().toFixed(2)}</td>
                            <td>${aspirante.calificacionFinal().toFixed(2)}</td>
                        `;
                        fragment.appendChild(tr);
                    });

                    this.lblPorcentAprobados.innerHTML = porcentAprobados.toFixed(2) + "%";
                    this.lblCalifMasAlta.innerHTML = califMasAlta.toFixed(2);
                    this.lblCalifMasBaja.innerHTML = califMasBaja.toFixed(2);
                }
            this.tblFormatoCO6.innerHTML = "";
            this.tblFormatoCO6.appendChild(fragment);
        }

        mostrarFormatoCO7(aspirantes: Cl_mAspirante[]): void {
            const fragment = document.createDocumentFragment();
                if (aspirantes.length === 0) {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `<td colspan="8" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                            fragment.appendChild(tr);
            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.calificacionFinal().toFixed(2)}</td>
                            <td>${aspirante.calificacion10Porciento().toFixed(2)}</td>
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblFormatoCO7.innerHTML = "";
            this.tblFormatoCO7.appendChild(fragment);
        }

        mostrarFormatoCO8(aspirantes: Cl_mAspirante[]): void {
            const fragment = document.createDocumentFragment();
                if (aspirantes.length === 0) {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `<td colspan="8" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                            fragment.appendChild(tr);

            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.notaExamenEscrito}</td>
                            <td>${aspirante.notaExamenPractico}</td>
                            <td>${aspirante.calificacionCO8().toFixed(2)}</td>
                            <td>${aspirante.calificacion60PorcientoCO8().toFixed(2)}</td>
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblFormatoCO8.innerHTML = "";
            this.tblFormatoCO8.appendChild(fragment);
        }

        mostrarFormatoCO9(aspirantes: Cl_mAspirante[]): void {
            const fragment = document.createDocumentFragment();
                if (aspirantes.length === 0) {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `<td colspan="8" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                            fragment.appendChild(tr);

            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.notaExamenAptitudes}</td>
                            <td>${aspirante.calificacion30PorcientoAptitudes().toFixed(2)}</td>
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblFormatoCO9.innerHTML = "";
            this.tblFormatoCO9.appendChild(fragment);
        }

    mostrarReporteCO6Individual(aspirante: Cl_mAspirante): void {
        const fragment = document.createDocumentFragment();
        const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${aspirante.nombre}</td>
                <td>${aspirante.cedula}</td>
                <td>${aspirante.sumaPtsFormatoCO5().toFixed(2)}</td>
                <td>${aspirante.sumaPtsFormatoCO51().toFixed(2)}</td>
                <td>${aspirante.sumaPtsFormatoCO52().toFixed(2)}</td>
                <td>${aspirante.sumaPtsFormatoCO53().toFixed(2)}</td>
                <td>${aspirante.totalObtenido().toFixed(2)}</td>
                <td>${aspirante.calificacionFinal().toFixed(2)}</td>
            `;
            fragment.appendChild(tr);
        this.tblFormatoCO6.innerHTML = "";
        this.tblFormatoCO6.appendChild(fragment);
    }

    mostrarMensajeSinResultados(mensaje: string): void {
        this.tblFormatoCO6.innerHTML = `<tr><td colspan="8" style="padding:24px;color:#888;">${mensaje}</td></tr>`;
    }

    mostrar(tipo: string) {

        switch (tipo) {
            case "listado": this.uiListado.removeAttribute("hidden"); break;
            case "formatoCO6": this.uiFormatoCO6.removeAttribute("hidden"); break;
            case "formatoCO7": this.uiFormatoCO7.removeAttribute("hidden"); break;
            case "formatoCO8": this.uiFormatoCO8.removeAttribute("hidden"); break;
            case "formatoCO9": this.uiFormatoCO9.removeAttribute("hidden"); break;

            default: console.error("No se ha Encontrado la Sección", tipo);

        }
    }

    ocultar() {
        this.uiListado.setAttribute("hidden", "true");
        this.uiFormatoCO6.setAttribute("hidden", "true");
        this.uiFormatoCO7.setAttribute("hidden", "true");
        this.uiFormatoCO8.setAttribute("hidden", "true");
        this.uiFormatoCO9.setAttribute("hidden", "true");
    }
}
