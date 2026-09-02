# Fotos del local

Aquí va la fotografía real del negocio. El sitio espera:

| Archivo | Dónde se usa | Estado |
|---|---|---|
| `parrilla.webp` | Sección "¿Por qué 5ta Avenida?" del inicio | **Pendiente** |

La foto de la parrilla con el rótulo de madera es la que el cliente compartió el
2026-09-02. Para agregarla: guardarla en esta carpeta y optimizarla con

```
python scripts/optimizar-foto-local.py <archivo>
```

Mientras el archivo no exista, `next/image` no encuentra la fuente y la sección
muestra el recuadro vacío. No rompe el sitio, pero se ve incompleto.
