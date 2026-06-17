// Cl_mConcurso.ts

import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mConcurso {
    public aspirantes: Cl_mAspirante[] = [];

    public agregarAspirante(aspirante: Cl_mAspirante): void {
        this.aspirantes.push(aspirante);
    }
    
    setAspirantes(aspirante: any[]) {
        this.aspirantes = [];
            aspirante.forEach((item) => {
                const aspirante = new Cl_mAspirante({
                    nombre: item.nombre,
                    cedula: item.cedula,
                    notaExamenEscrito: item.notaExamenEscrito,
                    notaExamenPractico: item.notaExamenPractico,
                    notaExamenAptitudes: item.notaExamenAptitudes,
                });

                aspirante.ptsFormatoCO5 = item.ptsFormatoCO5 || [];
                aspirante.ptsFormatoCO51 = item.ptsFormatoCO51 || [];
                aspirante.ptsFormatoCO52 = item.ptsFormatoCO52 || [];
                aspirante.ptsFormatoCO53 = item.ptsFormatoCO53 || [];
                aspirante.juradoACO10 = item.juradoACO10 || [];
                aspirante.juradoBCO10 = item.juradoBCO10 || [];
                aspirante.juradoCCO10 = item.juradoCCO10 || [];

                this.aspirantes.push(aspirante);
            });
        }
    
    getAspirantes(): Cl_mAspirante[] {
        return this.aspirantes;
    }

    porcentajeAprobados(): number {
        if (this.aspirantes.length === 0) return 0;
        
        let aprobados = 0;
        const estaAprabado = 16 // mínima para aprobar Segun tabla CO-11

        for (let b of this.aspirantes) {
            if ( b.calificacionFinal() >= estaAprabado ) aprobados++;   }

        return (aprobados / this.aspirantes.length) * 100;
    }

    calificacionFinalMasAlta(): number {
        if (this.aspirantes.length === 0) return 0;
        return Math.max(...this.aspirantes.map(a => a.calificacionFinal()));
    }

    calificacionFinalMasBaja(): number {
        if (this.aspirantes.length === 0) return 0;
        return Math.min(...this.aspirantes.map(a => a.calificacionFinal()));
    }
    
}
/* 
        🏢 1. Concurso Laboral
	- Dada una cedula, obtener el formulario del participante
	- Calcular porcentaje del total que representan los "Aprobados"
	- Mostrar cuál fue la calificación más alta y cuál la más baja de todo el proceso de selección.
 */