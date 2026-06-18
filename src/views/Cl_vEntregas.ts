import I_vEntregas from "../interfaces/I_vEntregas.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_vEntregas implements I_vEntregas {

    // Secciones donde Estaran las tablas
        private uiListado: HTMLDivElement;
        private uiFormatoCO6: HTMLDivElement;
        private uiFormatoCO7: HTMLDivElement;
        private uiFormatoCO8: HTMLDivElement;
        private uiFormatoCO9: HTMLDivElement;
        private uiFormatoCO10: HTMLDivElement;
        private uiFormatoCO11: HTMLDivElement;

    // Tablas de las Secciones
        private tblListado: HTMLTableElement;
        private tblFormatoCO6: HTMLTableElement;
        private tblFormatoCO7: HTMLTableElement;
        private tblFormatoCO8: HTMLTableElement;
        private tblFormatoCO9: HTMLTableElement;
        private tblFormatoCO10: HTMLTableElement;
        private tblFormatoCO11: HTMLTableElement;

    // Botones de la Tabla CO6
        private btBuscarCO6: HTMLButtonElement;
        private inCedulaBuscarCO6: HTMLInputElement;

    // Botones de la Tabla Listado
        private inCedulaListado: HTMLInputElement;
        private btBuscarAsp: HTMLButtonElement;

    // Requerimientos 
        private lblPorcentAprobados: HTMLElement;
        private lblCalifMasAlta: HTMLElement;
        private lblCalifMasBaja: HTMLElement;

    // Métodos Para Recargar Pagina y Volver al Menu Principal
        private btRecargar: HTMLButtonElement;
        /* private btVolver: HTMLButtonElement;
 */
    constructor() {
        this.uiListado = document.getElementById("listado") as HTMLDivElement;
        this.uiFormatoCO6 = document.getElementById("formatoCO6") as HTMLDivElement;
        this.uiFormatoCO7 = document.getElementById("formatoCO7") as HTMLDivElement;
        this.uiFormatoCO8 = document.getElementById("formatoCO8") as HTMLDivElement;
        this.uiFormatoCO9 = document.getElementById("formatoCO9") as HTMLDivElement;
        this.uiFormatoCO10 = document.getElementById("formatoCO10") as HTMLDivElement;
        this.uiFormatoCO11 = document.getElementById("formatoCO11") as HTMLDivElement;

        this.tblListado = document.getElementById("listado_tblListado") as HTMLTableElement;
        this.tblFormatoCO6 = document.getElementById("formatoCO6_tblFormatoCO6") as HTMLTableElement;
        this.tblFormatoCO7 = document.getElementById("formatoCO7_tblFormatoCO7") as HTMLTableElement;
        this.tblFormatoCO8 = document.getElementById("formatoCO8_tblFormatoCO8") as HTMLTableElement;
        this.tblFormatoCO9 = document.getElementById("formatoCO9_tblFormatoCO9") as HTMLTableElement;
        this.tblFormatoCO10 = document.getElementById("formatoCO10_tblFormatoCO10") as HTMLTableElement;
        this.tblFormatoCO11 = document.getElementById("formatoCO11_tblFormatoCO11") as HTMLTableElement;

        this.btBuscarCO6 = document.getElementById("formatoCO6_btBuscar") as HTMLButtonElement;
        this.inCedulaBuscarCO6 = document.getElementById("formatoCO6_inCedula") as HTMLInputElement;

        this.inCedulaListado = document.getElementById("listado_inCedula") as HTMLInputElement;
        this.btBuscarAsp = document.getElementById("listado_btBuscarAsp") as HTMLButtonElement;

        this.lblPorcentAprobados = document.getElementById("formatoCO6_lblPorcentAprobados") as HTMLElement;
        this.lblCalifMasAlta = document.getElementById("formatoCO6_lblCalifMasAlta") as HTMLElement;
        this.lblCalifMasBaja = document.getElementById("formatoCO6_lblCalifMasBaja") as HTMLElement;

        this.btRecargar = document.getElementById("entregas_btRecargar") as HTMLButtonElement;
        /* this.btVolver = document.getElementById("entregas_btVolver") as HTMLButtonElement; */
    }
   
    // Metodos para la Pagina
        onRecargar(callback: () => void): void {
            this.btRecargar.onclick = callback;     }

        /* onVolver(callback: () => void): void {
            this.btVolver.onclick = callback;   } */

        onBuscarCO6(callback: () => void): void {
            this.btBuscarCO6.onclick = callback;   }

        get cedulaBuscarCO6(): string {
            return this.inCedulaBuscarCO6.value;   }

        onBuscarListado(callback: () => void): void {
            this.btBuscarAsp.onclick = callback;   }

        get cedulaBuscarListado(): string {
            return this.inCedulaListado.value   }

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
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>  
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

        mostrarFormatoCO10(aspirantes: Cl_mAspirante[]): void {
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
                            <td>${aspirante.sumaPtsJuradoA().toFixed(2)}</td>
                            <td>${aspirante.sumaPtsJuradoB().toFixed(2)}</td>
                            <td>${aspirante.sumaPtsJuradoC().toFixed(2)}</td>
                            <td>${aspirante.puntajeTotalJurados().toFixed(2)}</td>
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblFormatoCO10.innerHTML = "";
            this.tblFormatoCO10.appendChild(fragment);
        }

        mostrarFormatoCO11(aspirantes: Cl_mAspirante[]): void {
            const fragment = document.createDocumentFragment();
                if (aspirantes.length === 0) {
                    const tr = document.createElement("tr");
                        tr.innerHTML = `<td colspan="8" style="padding: 24px; color: #888;">No hay aspirantes registrados</td>`;
                            fragment.appendChild(tr);

            } else {
                aspirantes.forEach((aspirante: Cl_mAspirante) => {
                    const tr = document.createElement("tr");

                    const veredicto = aspirante.veredictoFinal();

                    let color = "";
                    if (veredicto === "Aprobado") {
                        color = "#0ed33c"; // verde
                    }

                    else {
                        color = "#dc3545"; // rojo
                    }

                        tr.innerHTML = `
                            <td>${aspirante.nombre}</td>
                            <td>${aspirante.cedula}</td>
                            <td>${aspirante.calificacion10Porciento().toFixed(2)}</td>
                            <td>${aspirante.calificacion60PorcientoCO8().toFixed(2)}</td>
                            <td>${aspirante.calificacion30PorcientoAptitudes().toFixed(2)}</td>
                            <td>${aspirante.notaDefinitiva().toFixed(2)}</td>
                            <td style="color: ${color}; font-weight: bold;">${veredicto}</td
                        `;
                        fragment.appendChild(tr);
                    });
                }
            this.tblFormatoCO11.innerHTML = "";
            this.tblFormatoCO11.appendChild(fragment);
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

    mostrarRespuestas(aspirante: Cl_mAspirante): void {
        const html = `

        <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: #f9f9f9;">

        <h3>Nombre:${aspirante.nombre} - Cedula:${aspirante.cedula}</h3>
        
        <h4> Formato (CO-5) - Total: ${aspirante.sumaPtsFormatoCO5()}</h4>
            <ul>
                <li>Pregunta 5.a: <input type="text" value="${aspirante.ptsFormatoCO5[0] || 0}" disabled> pts</li>
                <li>Pregunta 5.b: <input type="text" value="${aspirante.ptsFormatoCO5[1] || 0}" disabled> pts</li>
                <li>Pregunta 5.c: <input type="text" value="${aspirante.ptsFormatoCO5[2] || 0}" disabled> pts</li>
                <li>Pregunta 5.d: <input type="text" value="${aspirante.ptsFormatoCO5[3] || 0}" disabled> pts</li>
            </ul>
        
        <h4> Formato (CO-5.1) - Total: ${aspirante.sumaPtsFormatoCO51()}</h4>
            <ul>
                <li>Pregunta 5.1.a: <input type="text" value="${aspirante.ptsFormatoCO51[0] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.b: <input type="text" value="${aspirante.ptsFormatoCO51[1] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.c: <input type="text" value="${aspirante.ptsFormatoCO51[2] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.d: <input type="text" value="${aspirante.ptsFormatoCO51[3] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.e: <input type="text" value="${aspirante.ptsFormatoCO51[4] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.f: <input type="text" value="${aspirante.ptsFormatoCO51[5] || 0}" disabled> pts</li>
                <li>Pregunta 5.1.g: <input type="text" value="${aspirante.ptsFormatoCO51[6] || 0}" disabled> pts</li>
            </ul>

        <h4> Formato (CO-5.2) - Total: ${aspirante.sumaPtsFormatoCO52()}</h4>
            <ul>
                <li>Pregunta 5.2.a: <input type="text" value="${aspirante.ptsFormatoCO51[0] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.b: <input type="text" value="${aspirante.ptsFormatoCO51[1] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.c: <input type="text" value="${aspirante.ptsFormatoCO51[2] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.d: <input type="text" value="${aspirante.ptsFormatoCO51[3] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.e: <input type="text" value="${aspirante.ptsFormatoCO51[4] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.f: <input type="text" value="${aspirante.ptsFormatoCO51[5] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.g: <input type="text" value="${aspirante.ptsFormatoCO51[6] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.h: <input type="text" value="${aspirante.ptsFormatoCO51[7] || 0}" disabled> pts</li>
                <li>Pregunta 5.2.i: <input type="text" value="${aspirante.ptsFormatoCO51[8] || 0}" disabled> pts</li>
            </ul>

        <h4> Formato (CO-5.3) - Total: ${aspirante.sumaPtsFormatoCO53()}</h4>
            <ul>
                <li>Pregunta 5.3.a: <input type="text" value="${aspirante.ptsFormatoCO51[0] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.b: <input type="text" value="${aspirante.ptsFormatoCO51[1] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.c: <input type="text" value="${aspirante.ptsFormatoCO51[2] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.d: <input type="text" value="${aspirante.ptsFormatoCO51[3] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.e: <input type="text" value="${aspirante.ptsFormatoCO51[4] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.f: <input type="text" value="${aspirante.ptsFormatoCO51[5] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.g: <input type="text" value="${aspirante.ptsFormatoCO51[6] || 0}" disabled> pts</li>
                <li>Pregunta 5.3.h: <input type="text" value="${aspirante.ptsFormatoCO51[7] || 0}" disabled> pts</li>
            </ul>
        
        </div>
    `;
    
        document.getElementById("listado_lblRespuestas")!.innerHTML = html;

    }

    mostrarMensajeSinResultados(mensaje: string): void {
        this.tblFormatoCO6.innerHTML = `<tr><td colspan="8" style="padding:24px;color:#888;">${mensaje}</td></tr>`;
    }

    mostrarMensajeSinResultados2(mensaje: string): void {
        this.tblListado.innerHTML = `<tr><td colspan="8" style="padding:24px;color:#888;">${mensaje}</td></tr>`;
    }

    mostrar(tipo: string) {

        switch (tipo) {
            case "listado": this.uiListado.removeAttribute("hidden"); break;
            case "formatoCO6": this.uiFormatoCO6.removeAttribute("hidden"); break;
            case "formatoCO7": this.uiFormatoCO7.removeAttribute("hidden"); break;
            case "formatoCO8": this.uiFormatoCO8.removeAttribute("hidden"); break;
            case "formatoCO9": this.uiFormatoCO9.removeAttribute("hidden"); break;
            case "formatoCO10": this.uiFormatoCO10.removeAttribute("hidden"); break;
            case "formatoCO11": this.uiFormatoCO11.removeAttribute("hidden"); break;

            default: console.error("No se ha Encontrado la Sección", tipo);

        }
    }

    ocultar() {
        this.uiListado.setAttribute("hidden", "true");
        this.uiFormatoCO6.setAttribute("hidden", "true");
        this.uiFormatoCO7.setAttribute("hidden", "true");
        this.uiFormatoCO8.setAttribute("hidden", "true");
        this.uiFormatoCO9.setAttribute("hidden", "true");
        this.uiFormatoCO10.setAttribute("hidden", "true");
        this.uiFormatoCO11.setAttribute("hidden", "true");
    }
}
