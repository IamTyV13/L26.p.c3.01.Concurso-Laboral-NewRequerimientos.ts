// Cl_mAspirante.ts

export default class Cl_mAspirante {

    // Atributos del Aspirante
        private tabla: string = "aspirante";
        private _nombre: string = "";
        private _cedula: string = "";
        private _notaExamenEscrito: number = 0;
        private _notaExamenPractico: number = 0;
        private _notaExamenAptitudes: number = 0;
        private _fechaRegistro: Date = new Date();

    // Arrays de De las Secciones de Preguntas
        ptsFormatoCO5: number[] = [];
        ptsFormatoCO51: number[] = [];
        ptsFormatoCO52: number[] = [];
        ptsFormatoCO53: number[] = [];
    
    // Arrays de los Jurados para la Tabla CO10
        juradoACO10: number[] = [];
        juradoBCO10: number[] = [];
        juradoCCO10: number[] = [];

    constructor ({nombre, cedula, notaExamenEscrito, notaExamenPractico, notaExamenAptitudes, fechaRegistro}: 
        {nombre: string, cedula: string, notaExamenEscrito: number, notaExamenPractico: number, notaExamenAptitudes: number, fechaRegistro: string} = 
        {nombre: '', cedula: '', notaExamenEscrito: 0, notaExamenPractico: 0, notaExamenAptitudes: 0, fechaRegistro: ''}) {

        this.nombre = nombre;
        this.cedula = cedula;
        this.notaExamenEscrito = notaExamenEscrito;
        this.notaExamenPractico = notaExamenPractico;
        this.notaExamenAptitudes = notaExamenAptitudes;
        
        if (fechaRegistro) {
            this._fechaRegistro = new Date(fechaRegistro);
        } else {
            this._fechaRegistro = new Date();
        }
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

        get fechaRegistro(): Date {
            return this._fechaRegistro; }

        set fechaRegistro(f: string | Date) {
            console.log("Setter fechaRegistro recibiendo:", f);
            if (f) {
                this._fechaRegistro = new Date(f);
            } else {
                this._fechaRegistro = new Date();
            }
        }
    
    /* Metodos del Requerimiento con las Fechas */
        estadoRegistro(): string {
            const hoy = new Date();
            const diferenciaTiempo = hoy.getTime() - this.fechaRegistro.getTime();
            const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24 ) )

            if ( diferenciaDias > 7 ) {
                return "Hace más de 1 semana"  }

            else if ( diferenciaDias === 0 ) {
                return "Hoy"                   }

            else {
                return `Hace ${diferenciaDias} dias`
            }
        }

        estaMasDeUnaSemana(): boolean {
            const hoy = new Date();
            const diferenciaTiempo = hoy.getTime() - this.fechaRegistro.getTime();
            const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24 ) )
            return diferenciaDias > 7;
        }
    


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
            
            for (let b = 0; b < this.ptsFormatoCO5.length; b++) {   
                suma += this.ptsFormatoCO5[b];  }
            
            if (suma > tope) {
                return tope; }

            return suma;
    }

        sumaPtsFormatoCO51(): number{
            const tope = 30;
            let suma = 0;

                for (let b = 0; b < this.ptsFormatoCO51.length; b++) {   
                    suma += this.ptsFormatoCO51[b];  }

                if (suma > tope) {
                    return tope; }

            return suma;
        }
        
        sumaPtsFormatoCO52(): number{
            const suma = this.ptsFormatoCO52.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 15);
        }

        sumaPtsFormatoCO53(): number{
            const suma = this.ptsFormatoCO53.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 20);
        }
    
    // Metodo para sumar los puntos totales de las Secciones sobre el 100 puntos.
        totalObtenido(): number{
            return this.sumaPtsFormatoCO5() + this.sumaPtsFormatoCO51() + this.sumaPtsFormatoCO52() + this.sumaPtsFormatoCO53();    }

    // Metodo para calcular la Calificacion Final del Aspirante sobre 20 puntos.
        calificacionFinal(): number{
            return this.totalObtenido() / 5;    }

        /* ===Tabla CO7=== */
        calificacion10Porciento(): number{
            return ( this.calificacionFinal() * 10) / 100;   }

        /* ===Tabla CO8=== */
        calificacionCO8(): number{
            return (this.notaExamenEscrito + this.notaExamenPractico) / 2;  }

        calificacion60PorcientoCO8(): number{
            return (this.calificacionCO8() * 60) / 100;  }

        /* ===Tabla CO9=== */
        calificacion30PorcientoAptitudes(): number{
            return (this.notaExamenAptitudes * 30) / 100;   }

        /* ===Tabla CO10 === */
        agregarPtsJurado(jurado: string, puntos: number): void {
            switch (jurado) {

                case "juradoA": this.juradoACO10.push(puntos); break;
                case "juradoB": this.juradoBCO10.push(puntos); break;
                case "juradoC": this.juradoCCO10.push(puntos); break;

                default: console.error("Jurado no válido. No se han agregado puntos.", jurado);
            }
        }

        /* ===Tabla CO11 === */
        notaDefinitiva(): number{
            const c10Porcent = this.calificacion10Porciento();
            const c60Porcent = this.calificacion60PorcientoCO8();
            const c30Porcent = this.calificacion30PorcientoAptitudes();

            return c10Porcent + c60Porcent + c30Porcent;
        }

        veredictoFinal(): string {
            if ( this.notaDefinitiva() >= 16) {
                return "Aprobado";              
            }
                return "Reprobado";
        }

        sumaPtsJuradoA(): number{
            const suma = this.juradoACO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60);
        }

        sumaPtsJuradoB(): number{
            const suma = this.juradoBCO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60);
        }

        sumaPtsJuradoC(): number{
            const suma = this.juradoCCO10.reduce((suma, pts) => suma + pts, 0);
                return Math.min(suma, 60);
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
            fechaRegistro: this.fechaRegistro.toISOString(),
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