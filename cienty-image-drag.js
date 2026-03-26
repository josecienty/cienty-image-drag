// cienty-image-drag.js
// -------------------------------------------
// Desarrollado por: José Argüello
// GitHub: https://github.com/josecienty
// Licencia: MIT 
// Versión: 1.0.0
// Descripción: Drag & Drop de imágenes para web, sin frameworks, personalizable y listo para CDN
// -------------------------------------------
(function () {
    const makeDragArea = (config) => {
        let container = config.container || document.body;
        const text = config.text || "Arrastra o haz click para subir";
        
        const width = config.width || "100%";
        const minHeight = config.minHeight || "200px";
        const height = config.height || "300px";

        // Se valida si container tiene algo válido, sino chau
        container = actions.validations.container(container);
        if(!container) return;

        const dragArea = actions.make.dragArea();
        const fileInput = actions.make.fileInput(dragArea);

        dragArea.addEventListener('click', () => fileInput.click());
        dragArea.appendChild(fileInput);

        const span = document.createElement('span');
        span.innerText = text;
        span.style.pointerEvents = 'none';
        dragArea.appendChild(span);

        container.appendChild(dragArea);
    }


    const actions = {
        make: {
            dragArea: () => {
                const dragArea = document.createElement('div');
                dragArea.setAttribute('fcx-drag', 'area');

                // Drag & Drop
                dragArea.addEventListener('dragover', e => {
                    e.preventDefault();
                    dragArea.classList.add('hover');
                });

                dragArea.addEventListener('dragleave', e => {
                    e.preventDefault();
                    dragArea.classList.remove('hover');
                });

                dragArea.addEventListener('drop', e => {
                    e.preventDefault();
                    dragArea.classList.remove('hover');
                    if (e.dataTransfer.files.length) {
                        const file = e.dataTransfer.files[0];
                        if (file.type.startsWith('image/')) showImage(file);
                        else alert('Solo se permiten imágenes');
                    }

                });

                return dragArea;
            },
            fileInput: (dragArea) => {
                const fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');
                fileInput.setAttribute('fcx-drag', 'file');
                fileInput.style.display = 'none';

                fileInput.addEventListener('change', e => {
                    if (e.target.files.length) actions.image.showImage(e.target.files[0], dragArea);
                });
                return fileInput;
            }
        },
        image: {
            showImage: (file, dragArea) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    dragArea.innerHTML = `<img src="${e.target.result}" alt="Imagen">`;
                };
                reader.readAsDataURL(file);
            }
        },
        validations: {
            container: (container) => {
               let returnValue;
               
                if (typeof container === 'string') {
                    returnValue = document.querySelector(container);
                } else if (container instanceof HTMLElement) {
                    returnValue = container;
                } else {
                    console.error('El contenedor debe ser una etiqueta o una clase');
                    returnValue = undefined;
                }
                return returnValue;
            }
        }
    }

    window.ImageDrag = {
        make: makeDragArea
    }
})();