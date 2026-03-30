(function () {

    const makeDragArea = (config) => {
        const container = actions.validations.container(config.container);
        if (!container) return null;

        const dragArea = actions.make.dragArea(config);
        const fileInput = actions.make.fileInput(dragArea);

        dragArea.addEventListener('click', () => fileInput.click());
        dragArea.appendChild(fileInput);

        const span = document.createElement('span');
        span.innerText = config.text || "Arrastra o haz click para subir";
        span.style.pointerEvents = 'none';
        dragArea.appendChild(span);

        // Si viene imagen inicial
        if (config.image) {
            actions.image.showImage(config.image, dragArea);
        }

        container.appendChild(dragArea);

        // Retornamos objeto "instancia"
        return {
            dragArea,
            getValue: () => dragArea._currentImage || null
        };
    }

    const actions = {
        make: {
            dragArea: (config) => {
                const { height } = config;
                const dragArea = document.createElement('div');
                dragArea.setAttribute('fcx-drag', 'area');
                dragArea.setAttribute('draggable', true);
                if (height) dragArea.style.height = height;

                // Eventos Drag & Drop
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
                        if (file.type.startsWith('image/')) {
                            actions.image.showImage(file, dragArea);
                        } else alert('Solo se permiten imágenes');
                    }
                });

                return dragArea;
            },
            fileInput: (dragArea) => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';

                fileInput.addEventListener('change', e => {
                    if (e.target.files.length) {
                        const file = e.target.files[0];
                        actions.image.showImage(file, dragArea);
                    }
                });

                return fileInput;
            }
        },
        image: {
            showImage: (fileOrUrl, dragArea) => {
                if (typeof fileOrUrl === 'string') {
                    // Es URL
                    dragArea.innerHTML = `<img src="${fileOrUrl}" alt="Imagen">`;
                    dragArea._currentImage = fileOrUrl;
                } else {
                    // Es File
                    const reader = new FileReader();
                    reader.onload = e => {
                        dragArea.innerHTML = `<img src="${e.target.result}" alt="Imagen">`;
                        dragArea._currentImage = fileOrUrl; // guardamos el File
                    };
                    reader.readAsDataURL(fileOrUrl);
                }
            }
        },
        validations: {
            container: (container) => {
                if (typeof container === 'string') return document.querySelector(container);
                if (container instanceof HTMLElement) return container;
                console.error('El contenedor debe ser una etiqueta o una clase');
                return null;
            }
        }
    }

    window.ImageDrag = { make: makeDragArea };

})();