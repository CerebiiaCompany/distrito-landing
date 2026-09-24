# Logos locales

Copia aquí los archivos originales de imagen. Las rutas deben conservar exactamente estos nombres:

```text
public/assets/logo-distrito-nortech.png
public/assets/partners/cerebiia.png
public/assets/partners/innguia.png
public/assets/partners/kumo.png
public/assets/partners/legal3ud.png
public/assets/partners/motionagency.png
public/assets/partners/tns.png
public/assets/partners/VetCarePro.png
public/assets/partners/vixor.png
```

## Pasos en Windows

1. Crea la carpeta `public/assets/partners` si todavía no existe.
2. Copia el logo principal a `public/assets/logo-distrito-nortech.png`.
3. Copia los logos de aliados a `public/assets/partners` y renómbralos según la lista anterior.
4. Ejecuta `npm run dev` y abre `http://localhost:8080`.
5. Si el navegador conserva la versión anterior, pulsa `Ctrl + F5`.

Los archivos `.asset.json` que venían de Lovable solo contienen metadatos y URLs del servidor de Lovable; no son imágenes y no deben reemplazar a los PNG.