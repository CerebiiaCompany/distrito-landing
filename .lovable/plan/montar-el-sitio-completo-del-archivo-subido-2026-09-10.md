# Montar el sitio completo del archivo subido

El archivo que subiste contiene un sitio ya construido (tema negro y rojo) con 29 páginas en español, buscador global, directorio, mapa del ecosistema y logos de aliados. La idea es dejarlo funcionando tal cual en este proyecto.

## Qué se va a montar

**Páginas principales**
- Inicio, Nosotros, Contacto, Haz parte
- Ecosistema (índice + ficha por cada actor), Mapa, Directorio, Datos
- Actores: Startups, Empresas, Universidades, Instituciones, Aliados, Talento, Inversión, Innovación
- Contenido: Noticias, Historias, Eventos, Videos, Podcast (índice + ficha), Programas, Retos, Convocatorias, Oportunidades, Empleo

**Elementos compartidos**
- Cabecera con navegación y buscador global
- Pie de página
- Mapa visual del ecosistema y explorador del directorio
- Logos de los 8 aliados (VetCarePro, Cerebiia, Innguía, Kumo, Legal3UD, Motion Agency, TNS, Vixor) y el logo principal
- Ícono del sitio (favicon)

**Diseño**
- Se mantiene la paleta negro y rojo, tipografías y estilos del archivo, sin cambios.

## Detalles técnicos

- Se copian `src/` (rutas, componentes, datos, estilos), `public/`, `components.json` y la configuración del proyecto, excluyendo cualquier metadato de control de versiones.
- El archivo no incluye `.git`, así que la copia es segura.
- Las dependencias del archivo (Radix UI, recharts, embla, cmdk, sonner, react-hook-form, zod, date-fns, vaul, lucide) se instalan para igualar su `package.json`.
- Las imágenes vienen como punteros de asset (`*.asset.json`), así que no se copian binarios al repositorio.
- El archivo de rutas generado se regenera automáticamente; no se toca a mano.
- Se verifica que cada página tenga su propio título y descripción, y que ninguna quede con el texto de plantilla.

## Verificación antes de avisarte

- Abrir el sitio y revisar Inicio y varias páginas internas.
- Comprobar navegación, buscador y que se vean los logos.
- Revisar que no haya errores en la consola.
