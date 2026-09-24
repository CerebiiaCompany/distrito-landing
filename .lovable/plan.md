# Ajuste visual blanco, conexiones y logos dinámicos

## Objetivo
Hacer que el sitio se perciba principalmente blanco, especialmente al entrar, manteniendo la estructura, el contenido y la identidad Neo-Tech existentes.

## Cambios
1. **Más blanco al inicio**
   - Convertir el bloque inicial de la página principal a fondo blanco con texto azul marino.
   - Aplicar el mismo tratamiento claro a los encabezados interiores para que cada página empiece con mayor luminosidad.
   - Mantener el azul intenso en textos destacados, iconos, líneas, nodos y algunos bloques inferiores para conservar contraste e identidad.
   - Conservar el verde en todos los botones principales.

2. **Nueva conexión entre nodos**
   - Añadir una línea directa y animada entre los nodos “Inversión” y “Academia”.
   - Mantener la interacción actual al pasar el cursor o enfocar cada nodo.

3. **Logos sin difuminado azul**
   - Retirar por completo el halo azul detrás de cada logo.
   - Mostrar los logos limpios sobre superficies blancas o gris muy claro, conservando su color original.

4. **Fila dinámica de aliados**
   - Convertir la muestra de logos de la página principal en una fila continua que se desplace suavemente hacia la izquierda en un ciclo de aproximadamente 24 segundos.
   - Duplicar visualmente la secuencia para evitar saltos al reiniciar.
   - Pausar el movimiento al pasar el cursor y mostrar una versión estática cuando el dispositivo tenga activada la reducción de movimiento.
   - Mantener en la página de aliados los nombres, categorías y agrupación existentes; allí solo se quitará el difuminado.

## Verificación
- Revisar el inicio, Ecosistema y Aliados en móvil, tablet y escritorio.
- Confirmar que no haya cortes, desbordes ni saltos visibles en la fila de logos.
- Confirmar la nueva conexión Inversión–Academia y la legibilidad de los nodos sobre fondo blanco.
- Revisar que no aparezcan errores en la navegación ni en la consola.

## Detalles técnicos
- Los cambios se limitarán a estilos y presentación; no se alterarán rutas, contenido ni datos.
- Se reutilizarán los colores semánticos existentes y se adaptarán las variantes claras del gráfico de nodos.
