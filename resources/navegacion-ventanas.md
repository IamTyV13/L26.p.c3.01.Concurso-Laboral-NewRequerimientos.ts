# Navegación entre Ventanas (volver + toggle)

## `Cl_cConcurso.ts`

### `abrirVentana(tipo: string)`

Controla abrir/cerrar/cambiar entre las secciones (listado, formatoCO6, etc.).

```ts
private abrirVentana(tipo: string) {
    // Si ya hay una ventana abierta
    if (this.cEntregasActual) {
        // Si es el MISMO tipo → toggle: cerrar y salir
        if (this.tipoActual === tipo) {
            this.cEntregasActual.onVolver();
            this.cEntregasActual = null;
            this.tipoActual = null;
            return;
        }
        // Si es OTRO tipo → cerrar la actual (sigue abajo para abrir la nueva)
        this.cEntregasActual.onVolver();
    }

    // Abrir nueva ventana del tipo solicitado
    const vEntregas = new Cl_vEntregas();
    const mConcurso = new Cl_mConcurso();

    this.tipoActual = tipo;
    this.cEntregasActual = new Cl_cEntregas({
        modelo: mConcurso,
        vista: vEntregas,
        tipo: tipo,
        volverCallback: () => {
            this.cEntregasActual = null;
            this.tipoActual = null;
        },
    });
}
```

#### Lógica
| Estado actual | Botón presionado | Acción |
|---|---|---|
| Ninguna | "Listado" | Abre listado |
| Listado abierto | "Listado" | Cierra listado (toggle) |
| Listado abierto | "Formato CO-6" | Cierra listado, abre formatoCO6 |
| Listado abierto | "Volver" | Cierra listado |

### `onVerFormatoCO6()` y `onVerListado()`

Delegan en `abrirVentana` con el tipo correspondiente:

```ts
onVerFormatoCO6() { this.abrirVentana("formatoCO6"); }
onVerListado()   { this.abrirVentana("listado");      }
```

### Propiedades nuevas

- **`cEntregasActual`**: referencia al controlador de la ventana abierta (o `null`).
- **`tipoActual`**: string con el tipo de ventana abierta ("listado", "formatoCO6") o `null`.

### `Cl_cEntregas.onVolver()`

Método ya existente que:
1. Oculta las secciones (`this.vista.ocultar()`)
2. Ejecuta el `volverCallback` (que limpia `cEntregasActual` y `tipoActual`)

```ts
onVolver() {
    this.vista.ocultar();
    this.volverCallback();
}
```

### Flujo completo

```
Usuario                    Cl_cConcurso                Cl_cEntregas (viejo)    Cl_cEntregas (nuevo)
  │                              │                              │                      │
  │  click "Formato CO-6"        │                              │                      │
  ├─────────────────────────────>│                              │                      │
  │                              │                              │                      │
  │                              │  onVolver()                  │                      │
  │                              ├─────────────────────────────>│                      │
  │                              │                              │  ocultar()            │
  │                              │                              │  volverCallback()     │
  │                              │<─────────────────────────────│                      │
  │                              │                              │                      │
  │                              │  new Cl_cEntregas("formatoCO6")                      │
  │                              ├─────────────────────────────────────────────────────>│
  │                              │                              │                      │
  │                              │                              │                      │  mostrar("formatoCO6")
  │                              │                              │                      │  btRecargarOnClick()
```
