// I_vEntregas.ts

import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default interface I_vEntregas {

    mostrarListado(aspirante: Cl_mAspirante[]): void;
    mostrarFormatoCO6(aspirante: Cl_mAspirante[], porcentAprobados: number, califMasAlta: number, califMasBaja: number): void;
    mostrarFormatoCO7(aspirante: Cl_mAspirante[]): void;
    mostrarFormatoCO8(aspirante: Cl_mAspirante[]): void;
    mostrarFormatoCO9(aspirante: Cl_mAspirante[]): void;
    mostrarFormatoCO10(aspirante: Cl_mAspirante[]): void;
    mostrarFormatoCO11(aspirante: Cl_mAspirante[]): void;

    onRecargar(callback: () => void): void;
    /* onVolver(callback: () => void): void; */

    onBuscarCO6(callback: () => void): void;
    onBuscarListado(callback: () => void): void;

    get cedulaBuscarCO6(): string;
    get cedulaBuscarListado(): string;
    
    mostrarReporteCO6Individual(aspirante: Cl_mAspirante): void;
    mostrarMensajeSinResultados(mensaje: string): void;
    mostrarMensajeSinResultados2(mensaje: string): void;
    mostrarRespuestas(aspirante: Cl_mAspirante): void;

    mostrar(tipo: string): void;
    ocultar(): void;

}