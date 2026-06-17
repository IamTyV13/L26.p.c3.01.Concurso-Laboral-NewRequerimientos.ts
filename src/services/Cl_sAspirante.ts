import Cl_mAspirante from "../models/Cl_mAspirante.js";
import Cl_sProyecto from "./Cl_sProyecto.js";

export default class Cl_sAspirante extends Cl_sProyecto {
  /**
   * Verifica si existe un Aspirante con la cédula indicada
   */
  static async existe(
    aspiranteId: string,  // ← string para que coincida con el modelo
  ): Promise<{ ok: boolean; existe: boolean }> {
    return super.existeId({
      tabla: "aspirante",
      tablaId: parseInt(aspiranteId), // ← convertimos string → number
      tablaIdName: "cedula",
    });
  }

  /**
   * Busca un aspirante por su cédula y devuelve sus datos completos
   */
  static async buscarPorCedula(
    cedula: string,
  ): Promise<{ ok: boolean; aspirante: any | null; mensaje: string }> {
    if (!cedula || cedula.trim() === "") {
      return { ok: false, aspirante: null, mensaje: "Ingrese una cédula para buscar" };
    }

    const uri = `${this.apiUrl}?tabla=aspirante&cedula=${encodeURIComponent(cedula)}`;
    const respuesta = await this.fetchMockApi({ method: "GET", uri });

    if (respuesta.status === 404) {
      return { ok: true, aspirante: null, mensaje: "No se encontró ningún aspirante con esa cédula" };
    }

    if (!respuesta.ok) {
      return { ok: false, aspirante: null, mensaje: "Error al buscar el aspirante" };
    }

    const data = respuesta.data;
    if (!Array.isArray(data) || data.length === 0) {
      return { ok: true, aspirante: null, mensaje: "No se encontró ningún aspirante con esa cédula" };
    }

    const aspirante = data.find((item: any) => item.cedula == cedula);
    if (!aspirante) {
      return { ok: true, aspirante: null, mensaje: "No se encontró ningún aspirante con esa cédula" };
    }

    return { ok: true, aspirante, mensaje: "Aspirante encontrado" };
  }

  /**
   * Agrega un nuevo Aspirante con validaciones completas
   * @param nuevoAspirante - Objeto Cl_mAspirante a guardar
   * @returns Promise con resultado de la operación
   */
  static async agregar(
    nuevoAspirante: Cl_mAspirante,
  ): Promise<{ ok: boolean; mensaje: string }> {
    // ✅ VALIDACIÓN 1: Cédula obligatoria
    if (!nuevoAspirante.cedula || nuevoAspirante.cedula.trim() === "") {
      return {
        ok: false,
        mensaje: "La cédula es obligatoria",
      };
    }

    // ✅ VALIDACIÓN 2: Cédula debe ser numérica
    if (isNaN(parseInt(nuevoAspirante.cedula))) {
      return {
        ok: false,
        mensaje: "La cédula debe ser un número válido",
      };
    }

    // ✅ VALIDACIÓN 3: Nombre obligatorio
    if (!nuevoAspirante.nombre || nuevoAspirante.nombre.trim() === "") {
      return {
        ok: false,
        mensaje: "El nombre es obligatorio",
      };
    }

    // ✅ VALIDACIÓN 4: Nota de Examen Escrito
    if (isNaN(nuevoAspirante.notaExamenEscrito) || nuevoAspirante.notaExamenEscrito <= 0) {
      return {
        ok: false,
        mensaje: "La nota del examen escrito debe ser un número válido mayor a 0",
      };
    }

    // ✅ VALIDACIÓN 5: Nota de Examen Práctico
    if (isNaN(nuevoAspirante.notaExamenPractico) || nuevoAspirante.notaExamenPractico <= 0) {
      return {
        ok: false,
        mensaje: "La nota del examen práctico debe ser un número válido mayor a 0",
      };
    }

    // ✅ VALIDACIÓN 6: Nota de Examen de Aptitudes
    if (isNaN(nuevoAspirante.notaExamenAptitudes) || nuevoAspirante.notaExamenAptitudes <= 0) {
      return {
        ok: false,
        mensaje: "La nota del examen de aptitudes debe ser un número válido mayor a 0",
      };
    }

    // ✅ VALIDACIÓN 7: Verificar unicidad de cédula
    const chkExiste = await super.existeId({
      tabla: "aspirante",                 // ← ¡minúscula!
      tablaId: parseInt(nuevoAspirante.cedula), // ← convertimos string → number
      tablaIdName: "cedula",
    });

    if (!chkExiste.ok) {
      return {
        ok: false,
        mensaje: "Error: No se pudo conectar con el servidor",
      };
    }

    if (chkExiste.existe) {
      return {
        ok: false,
        mensaje: "Ya existe un aspirante registrado con esa cédula",
      };
    }

    // ✅ VALIDACIÓN 8: Guardar en MockAPI
    return super.agregar(nuevoAspirante.toJSON());
  }
}