## Descripción

`cienty-image-drag.js` es un script ligero para implementar un área de **Drag & Drop** de imágenes en la web sin dependencias de frameworks. Permite subir imágenes mediante arrastre o clic, mostrar una imagen inicial y obtener la imagen cargada mediante JavaScript.

* **Autor:** José Argüello
* **GitHub:** [https://github.com/josecienty](https://github.com/josecienty)
* **Licencia:** MIT
* **Versión:** 1.0.0
* **Compatibilidad:** Navegadores modernos

---

## Instalación

Puedes incluir el script directamente en tu proyecto:

```html
<head>
    <!-- CDN de estilos -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/josecienty/cienty-image-drag@1.0.0/build/cienty-image-drag.min.css">
</head>
<body>
    <!-- Resto del código -->

    <script src="https://cdn.jsdelivr.net/gh/josecienty/cienty-image-drag@1.0.0/build/cienty-image-drag.min.js"></script>
</body>
```

Luego puedes inicializar un área de Drag & Drop con:

```javascript
const dragInstance = ImageDrag.make({
    container: '#mi-contenedor',
    text: 'Arrastra tu imagen aquí',
    height: '200px',
    image: 'ruta/de/imagen/inicial.jpg' // Opcional
});

// Obtener el archivo o URL cargado
const uploadedImage = dragInstance.getValue();
```

---

## Funciones Principales

### `ImageDrag.make(config)`

Crea un área de Drag & Drop con las siguientes opciones:

| Propiedad   | Tipo     | Descripción                                 |                                                 |
| ----------- | -------- | ------------------------------------------- | ----------------------------------------------- |
| `container` | `string  | HTMLElement`                                | Selector o elemento donde se insertará el área. |
| `text`      | `string` | Texto a mostrar dentro del área (opcional). |                                                 |
| `height`    | `string` | Altura del área (opcional).                 |                                                 |
| `image`     | `string` | URL de imagen inicial (opcional).           |                                                 |

**Retorna:** Objeto con la instancia del área y función `getValue()` para obtener la imagen cargada.

```javascript
const dragInstance = ImageDrag.make({ container: '#drop' });
dragInstance.getValue(); // File o URL de la imagen
```

---

## Estructura Interna

### `actions.make.dragArea(config)`

Crea el contenedor principal del área de arrastre con manejo de eventos `dragover`, `dragleave` y `drop`. Valida que el archivo sea una imagen antes de mostrarla.

### `actions.make.fileInput(dragArea)`

Crea un input tipo `file` oculto que se activa al hacer clic en el área de drag & drop.

### `actions.image.showImage(fileOrUrl, dragArea)`

Muestra la imagen cargada dentro del área.

* Si es URL, simplemente asigna `<img src=...>`
* Si es un `File`, lo convierte a DataURL usando `FileReader`

### `actions.validations.container(container)`

Valida que el contenedor exista y sea un selector válido o un elemento HTML.

---

## Ejemplo de Uso

```html
<div id="drag-container"></div>

<script src="cienty-image-drag.js"></script>
<script>
  const dragInstance = ImageDrag.make({
      container: '#drag-container',
      text: 'Arrastra o haz click para subir',
      height: '250px',
      image: 'https://via.placeholder.com/150'
  });

  console.log(dragInstance.getValue()); // Obtiene la imagen actual
</script>
```

---

## Personalización

* Se puede cambiar el texto mostrado en el área.
* Se puede establecer altura del área con `height`.
* Se puede mostrar una imagen inicial.
* Puedes añadir estilos CSS para `.hover` al arrastrar archivos.

---

## Consideraciones

* Solo permite imágenes (`image/*`).
* Requiere navegadores modernos para `FileReader`.
* Compatible con arrastrar y soltar o clic.

---

## Contribuciones

Se aceptan pull requests en [GitHub](https://github.com/josecienty).

---

## Licencia

MIT
