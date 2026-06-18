// Cl_mAspirante.ts

export default class Cl_mAspirante {

    // Atributos del Aspirante
        private tabla: string = "aspirante";
        private _nombre: string = "";
        private _cedula: string = "";
        private _notaExamenEscrito: number = 0;
        private _notaExamenPractico: number = 0;
        private _notaExamenAptitudes: number = 0;

    // Arrays de De las Secciones de Preguntas
        ptsFormatoCO5: number[] = [];
        ptsFormatoCO51: number[] = [];
        ptsFormatoCO52: number[] = [];
        ptsFormatoCO53: number[] = [];
    
    // Arrays de los Jurados para la Tabla CO10
        juradoACO10: number[] = [];
        juradoBCO10: number[] = [];
        juradoCCO10: number[] = [];

    // trabajar los 31 atributos : respuestaForm5.1 y asì para todos o arrays 4 para ser preciso.

    constructor ({nombre, cedula, notaExamenEscrito, notaExamenPractico, notaExamenAptitudes}: 
        {nombre: string, cedula: string, notaExamenEscrito: number, notaExamenPractico: number, notaExamenAptitudes: number} = 
        {nombre: '', cedula: '', notaExamenEscrito: 0, notaExamenPractico: 0, notaExamenAptitudes: 0}) {

        this.nombre = nombre;
        this.cedula = cedula;
        this.notaExamenEscrito = notaExamenEscrito;
        this.notaExamenPractico = notaExamenPractico;
        this.notaExamenAptitudes = notaExamenAptitudes;

        }

    // Getters y Setters
        set nombre(n: string) {
            this._nombre = n; }

        get nombre(): string {
            return this._nombre; }

        set cedula(c: string) {
            this._cedula = c; }
        
        get cedula(): string {
            return this._cedula; }

        set notaExamenEscrito(n: number) {
            this._notaExamenEscrito = +n; }

        get notaExamenEscrito(): number {
            return this._notaExamenEscrito; }

        set notaExamenPractico(n: number) {
            this._notaExamenPractico = +n; }

        get notaExamenPractico(): number {
            return this._notaExamenPractico; }

        set notaExamenAptitudes(n: number) {
            this._notaExamenAptitudes = +n; }

        get notaExamenAptitudes(): number {
            return this._notaExamenAptitudes; }

    // Metodo para que lleguen los puntos de cada Seccion en especifico.
        agregarPuntos(seccion: string, puntos: number): void {
            switch (seccion) {

                case "formatoCO5": this.ptsFormatoCO5.push(puntos); break;
                case "formatoCO51": this.ptsFormatoCO51.push(puntos); break;
                case "formatoCO52": this.ptsFormatoCO52.push(puntos); break;
                case "formatoCO53": this.ptsFormatoCO53.push(puntos); break;

                default: console.error("Sección no válida. No se han agregado puntos.", seccion);
            }
        }
        
    // Metodos para sumar los puntos de cada Seccion en especifico.
        sumaPtsFormatoCO5(): number {
            const tope = 35;
            let suma = 0;
            
            // Sumar primero
            for (let b = 0; b < this.ptsFormatoCO5.length; b++) {   
                suma += this.ptsFormatoCO5[b];  }
            
            // Comparar después
            if (suma > tope) {
                return tope; }

            return suma;
    }

        sumaPtsFormatoCO51(): number{
            const tope = 30;
            let suma = 0;

            // Sumar primero
                for (let b = 0; b < this.ptsFormatoCO51.length; b++) {   
                    suma += this.ptsFormatoCO51[b];  }

            // Comparar después
                if (suma > tope) {
                    return tope; }

            return suma;
        }
        
        sumaPtsFormatoCO52(): number{
            const suma = this.ptsFormatoCO52.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 15); // Limitar la suma a un máximo de 15 puntos
        }

        sumaPtsFormatoCO53(): number{
            const suma = this.ptsFormatoCO53.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 20); // Limitar la suma a un máximo de 20 puntos
        }
    
    // Metodo para sumar los puntos totales de las Secciones sobre el 100 puntos.
        totalObtenido(): number{
            return this.sumaPtsFormatoCO5() + this.sumaPtsFormatoCO51() + this.sumaPtsFormatoCO52() + this.sumaPtsFormatoCO53();
        }

    // Metodo para calcular la Calificacion Final del Aspirante sobre 20 puntos.
        calificacionFinal(): number{
            return this.totalObtenido() / 5;    }

        /* ===Tabla CO7=== */

    // Metodos para calcular las Calificaciones de la Tabla CO7 sobre el 10%.
        calificacion10Porciento(): number{
            return ( this.calificacionFinal() * 10) / 100;   }

        /* ===Tabla CO8=== */

    // Metodos para calcular las Calificaciones de la Tabla CO8
        calificacionCO8(): number{
            return (this.notaExamenEscrito + this.notaExamenPractico) / 2;  }

    // Metodo para calcular las Calificaciones de cada Seccion CO8 sobre el 60%.
        calificacion60PorcientoCO8(): number{
            return (this.calificacionCO8() * 60) / 100;  }

        /* ===Tabla CO9=== */

    // Metodo para calcular la Calificacion de la prueba de aptitudes Tabla CO9 sobre el 30%.
        calificacion30PorcientoAptitudes(): number{
            return (this.notaExamenAptitudes * 30) / 100;   }

        /* ===Tabla CO10 === */

    // Metodo para que lleguen los puntos de cada Jurado en especifico.
        agregarPtsJurado(jurado: string, puntos: number): void {
            switch (jurado) {

                case "juradoA": this.juradoACO10.push(puntos); break;
                case "juradoB": this.juradoBCO10.push(puntos); break;
                case "juradoC": this.juradoCCO10.push(puntos); break;

                default: console.error("Jurado no válido. No se han agregado puntos.", jurado);
            }
        }

        /* ===Tabla CO11 === */

    // Acta Final del Veredicto, suma de calificaciones de las Tablas CO7, CO8 y CO9.
        notaDefinitiva(): number{
            const c10Porcent = this.calificacion10Porciento();
            const c60Porcent = this.calificacion60PorcientoCO8();
            const c30Porcent = this.calificacion30PorcientoAptitudes();

            return c10Porcent + c60Porcent + c30Porcent;
        }

    // Metodo de Veredicto
        veridictoFinal(): string {
            if ( this.notaDefinitiva() >= 16) {
                return "Aprobado";              
            }
                return "Reprobado";
        }

    // Suma de puntos de Cada Jurado en Especifico
        sumaPtsJuradoA(): number{
            const suma = this.juradoACO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60); // Limitar la suma a un máximo de 60 puntos
        }

        sumaPtsJuradoB(): number{
            const suma = this.juradoBCO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60); // Limitar la suma a un máximo de 60 puntos
        }

        sumaPtsJuradoC(): number{
            const suma = this.juradoCCO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60); // Limitar la suma a un máximo de 60 puntos
        }

        puntajeTotalJurados(): number{
            const sJuradoA = this.sumaPtsJuradoA();
            const sJuradoB = this.sumaPtsJuradoB();
            const sJuradoC = this.sumaPtsJuradoC();
 
            return (sJuradoA + sJuradoB + sJuradoC) / 9;
        }
    
/*  
     Convierte el objeto Cl_mAspirante a un JSON plano, para poder enviarlo a MockAPI 
    a través del service. Solo incluye los campos que queremos guardar en la base de datos.
*/
    toJSON() {
        return {
            tabla: this.tabla,
            nombre: this.nombre,
            cedula: this.cedula,
            notaExamenEscrito: this.notaExamenEscrito,
            notaExamenPractico: this.notaExamenPractico,
            notaExamenAptitudes: this.notaExamenAptitudes,
            ptsFormatoCO5: this.ptsFormatoCO5,
            ptsFormatoCO51: this.ptsFormatoCO51,
            ptsFormatoCO52: this.ptsFormatoCO52,
            ptsFormatoCO53: this.ptsFormatoCO53,
            juradoACO10: this.juradoACO10,
            juradoBCO10: this.juradoBCO10,
            juradoCCO10: this.juradoCCO10,
        };
    }

    
}