# `btBuscarCO6` — Reporte individual por cédula en Formato CO-6

## Requerimiento

Dado un número de cédula, mostrar el reporte **Formato CO-6** (puntajes de Postgrado, Pregrado, Producción, Méritos, Total y Calificación Final) del aspirante que tenga esa cédula, sin recargar todos los datos del servidor.

---

## Cambios realizados

### 1. `indexAdministrador.html`

Se agregó un campo de texto para la cédula al lado del botón "Buscar" existente en la sección CO-6:

```html
<div style="margin-top:12px; display:flex; gap:8px; align-items:center;">
    <label> Cédula:
        <input type="text" id="formatoCO6_inCedula" placeholder="Ej: 12345678">
    </label>
    <button id="formatoCO6_btBuscar">Buscar</button>
</div>
```

### 2. `I_vEntregas.ts` — Interfaz

Se agregaron los métodos que la vista debe implementar:

| Método | Descripción |
|---|---|
| `onBuscarCO6(callback)` | Enlaza el evento click del botón Buscar |
| `get cedulaBuscarCO6(): string` | Lee el valor del input de cédula |
| `mostrarReporteCO6Individual(aspirante)` | Pinta la fila del aspirante en la tabla |
| `mostrarMensajeSinResultados(mensaje)` | Muestra un mensaje si no se encontró |

### 3. `Cl_vEntregas.ts` — Vista

- Enlaza el botón `formatoCO6_btBuscar` y el input `formatoCO6_inCedula` del DOM.
- `mostrarReporteCO6Individual(aspirante)`: limpia la tabla y crea una sola fila con los datos calculados del aspirante.
- `mostrarMensajeSinResultados()`: muestra un mensaje en la tabla cuando no hay resultados.

### 4. `Cl_cEntregas.ts` — Controlador

Método `btBuscarCO6OnClick()`:

```ts
async btBuscarCO6OnClick() {
    const cedula = this.vista.cedulaBuscarCO6;

    if (!cedula || cedula.trim() === "") {
        alert("Ingrese una cédula para buscar");
        return;
    }

    const aspirante = this.modelo
        .getAspirantes()
        .find(a => a.cedula === cedula);

    if (!aspirante) {
        this.vista.mostrarMensajeSinResultados(
            "No se encontró ningún aspirante con esa cédula"
        );
        return;
    }

    this.vista.mostrarReporteCO6Individual(aspirante);
}
```

#### Lógica

| Condición | Acción |
|---|---|
| Cédula vacía | `alert()` pidiendo ingresar una cédula |
| No se encuentra en `this.modelo` | `mostrarMensajeSinResultados()` |
| Se encuentra | `mostrarReporteCO6Individual()` con el aspirante |

### 5. `Cl_sAspirante.ts` — Servicio (se conservó pero NO se usa en el reporte)

Se había creado `buscarPorCedula()` para consultar MockAPI directamente, pero no es necesaria porque los datos ya están cargados en `this.modelo` desde `btRecargarOnClick()`.

---

## Flujo completo

```
Admin abre "Formato CO-6"
  → click "Recargar" → se cargan TODOS los aspirantes en this.modelo
  → escribe una cédula en el input
  → click "Buscar"
  → btBuscarCO6OnClick()
      → busca en this.modelo.getAspirantes() con .find()
      → si existe: muestra la fila del aspirante en la tabla CO-6
      → si no: muestra "No se encontró ningún aspirante con esa cédula"
```

## Archivos modificados

- `indexAdministrador.html`
- `src/interfaces/I_vEntregas.ts`
- `src/views/Cl_vEntregas.ts`
- `src/controllers/Cl_cEntregas.ts`
