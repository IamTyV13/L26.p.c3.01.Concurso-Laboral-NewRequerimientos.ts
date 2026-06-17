// I_vConcurso.ts

export default interface I_vConcurso {

    // Botones para Ver las entregas del Evaluador
        onVerListado(callback: () => void): void;
        onVerFormatoCO6(callback: () => void): void;
        onVerFormatoCO7(callback: () => void): void;
        onVerFormatoCO8(callback: () => void): void;
        onVerFormatoCO9(callback: () => void): void;

        /* deshabilitarBotones(): void;
        habilitarBotones(): void; */
}
