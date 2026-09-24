# Optimización responsive + paleta Neo-Tech

Se mantiene intacta la estructura: mismas páginas, secciones, textos, orden y componentes. Solo cambian colores y el comportamiento en pantallas pequeñas.

## 1. Nueva paleta Neo-Tech

- Fondo principal blanco `#FFFFFF`, superficies y tarjetas `#F8F9FA`.
- Texto principal `#0A192F`, texto secundario `#475569`.
- Azul `#2962FF` para acentos, íconos, enlaces activos y detalles destacados.
- Verde `#00E676` en todos los botones de llamada a la acción (CTA), con esquinas redondeadas y transición suave al pasar el cursor (leve elevación y cambio de tono, estilo Apple).
- Bordes y separadores en un gris azulado claro coherente con la paleta.
- Las secciones que hoy son negras (cabecera, portada, bloques de datos, pie de página) pasan a azul marino profundo `#0A192F` con texto claro, para conservar el mismo contraste y jerarquía visual sin volverlas blancas.
- Se elimina todo el rojo del sitio.

## 2. Ajustes responsive (sin mover elementos)

- Cabecera: filas con logo, buscador y botón que no se desborden ni recorten texto en móvil; menú lateral con áreas de toque cómodas.
- Títulos y textos con tamaños escalados por pantalla para evitar cortes o desbordes.
- Rejillas de tarjetas (ecosistema, noticias, aliados, eventos, podcast, etc.): una columna en móvil, dos en tablet, la disposición actual en escritorio.
- Directorio y filtros: controles apilados y a ancho completo en móvil, con desplazamiento horizontal solo donde haga falta.
- Mapa del ecosistema y gráficos: escalado al ancho disponible sin desbordar la pantalla.
- Tablas y listas largas: contenedor con desplazamiento horizontal en móvil.
- Imágenes y logos de aliados: tamaños proporcionales y sin deformarse.
- Botones y CTA: ancho completo en móvil cuando corresponde, altura mínima táctil de 44 px.

## 3. Verificación

Revisión de las páginas principales en tres anchos (móvil 390 px, tablet 768 px, escritorio 1440 px) con capturas, comprobando que no haya desbordes horizontales, textos cortados ni errores en consola.

## Detalles técnicos

- Reemplazo de los tokens de color en `src/styles.css` (`--background`, `--foreground`, `--muted-foreground`, `--primary`, `--accent`, `--border`, `--ink*`, `--node*`, `--chart-*`, `--sidebar-*`) por los valores Neo-Tech; se añade un token de CTA verde (`--cta` / `--cta-foreground`) y un radio base mayor.
- Nueva variante `cta` en `src/components/ui/button.tsx` y aplicación del token verde en los CTA escritos a mano (`primitives.tsx`, `Header.tsx`, `Footer.tsx`, secciones finales de cada página).
- Ajustes responsive con utilidades Tailwind (`grid-cols-[minmax(0,1fr)_auto]`, `min-w-0`, `shrink-0`, `truncate`, `overflow-x-auto`, escalas `text-*` por breakpoint) en `Header.tsx`, `Footer.tsx`, `primitives.tsx`, `DirectoryExplorer.tsx`, `EcosystemMap.tsx`, `GlobalSearch.tsx` y las rutas con rejillas propias.
- Sin cambios en datos, rutas, navegación ni lógica.
