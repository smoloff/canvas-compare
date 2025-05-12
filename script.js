const materialSelector = document.getElementById('material-selector');
const comparisonGrid = document.getElementById('comparisonGrid');
const images = document.querySelectorAll('.comparison-image');
const imageWrap = document.querySelectorAll('.comparison-item');



const state = {
    materials: [],
    zoom: 1,
    position: { x: 0, y: 0 },
    positionMin: {x: 0, y: 0},
    positionMax: {x: 0, y: 0},
    isDragging: false,
    dragStart: null
};

// Заповнення матеріалів
for (const imgDiv of comparisonGrid.children) {
    state.materials.push(imgDiv);
}

// Обробка чекбоксів
materialSelector.addEventListener('change', (e) => {
    const materialId = e.target.getAttribute('data-material-id');
    e.target.checked ? addImg(materialId) : removeImg(materialId);
});

function addImg(id) {
    state.materials.forEach(el => {
        if (el.getAttribute('data-material-id') === id) {
            el.classList.replace('comparison-item-off', 'comparison-item');
        }
    });
}

function removeImg(id) {
    state.materials.forEach(el => {
        if (el.getAttribute('data-material-id') === id) {
            el.classList.replace('comparison-item', 'comparison-item-off');
        }
    });
}


    images.forEach(img => {
        img.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`;

        img.addEventListener('mousedown', (e) => {
            console.log('mousedown')
            e.preventDefault();
            state.dragStart = { x: e.clientX, y: e.clientY };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });
    });

    function onMouseMove(e) {
        if (!state.dragStart) return;
    
        const dx = e.clientX - state.dragStart.x;
        const dy = e.clientY - state.dragStart.y;
        
        // Обчислюємо нові координати
        const newX = state.position.x + dx;
        const newY = state.position.y + dy;
    
        // Оновлюємо позицію з урахуванням обмежень
        const imgWidth = images[0].naturalWidth * state.zoom; // Ширина зображення з масштабуванням
        const imgHeight = images[0].naturalHeight * state.zoom; // Висота зображення з масштабуванням
    
        const containerWidth = images[0].closest('.comparison-item').offsetWidth // Ширина контейнера
        const containerHeight = images[0].closest('.comparison-item').offsetHeight; // Висота контейнера
    
        // Обмеження на рух по X
        const minX = Math.min(0, containerWidth * 2  - imgWidth); // Мінімальна X позиція (не менше 0)
        const maxX = 0; // Максимальна X позиція (не більше 0)
        console.log(`minX = ${minX}`)
    
        // Обмеження на рух по Y
        const minY = Math.min(0, containerHeight * 2 - imgHeight); // Мінімальна Y позиція (не менше мінімуму)
        const maxY = 0; // Максимальна Y позиція (не більше 0)
        console.log(`minY = ${minY}`)
    
        // Обмежуємо рух по осі X та Y
        const boundedX = Math.max(minX, Math.min(maxX, newX));
        const boundedY = Math.max(minY, Math.min(maxY, newY));
    
        // Застосовуємо обмежену трансформацію
        document.querySelectorAll('.comparison-image').forEach(img => {
            img.style.transform = `translate(${boundedX}px, ${boundedY}px) scale(${state.zoom})`;
        });
    }
    
    document.getElementById('zoomIn').addEventListener('click', () => {
        updateZoom(0.1); // збільшити масштаб на 10%
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        updateZoom(-0.1); // зменшити масштаб на 10%
    });

    

    function onMouseUp(e) {
        if (!state.dragStart) return;

    // Додаємо зміщення до глобальної позиції
        state.position.x += e.clientX - state.dragStart.x;
        state.position.y += e.clientY - state.dragStart.y;
    
        state.dragStart = null;
    
        // Очищуємо слухачі
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);   
    }


    function updateZoom(delta) {
        const newZoom = Math.max(1, state.zoom + delta);
        state.zoom = newZoom;
    
        const img = document.querySelector('.comparison-image');
        const wrap = img.closest('.comparison-item');
    
        const imgWidth = img.naturalWidth * state.zoom;
        const imgHeight = img.naturalHeight * state.zoom;
        const wrapWidth = wrap.clientWidth;
        const wrapHeight = wrap.clientHeight;
    
        // Обчислюємо межі переміщення
        state.positionMin.x = Math.min(0, wrapWidth - imgWidth);
        state.positionMin.y = Math.min(0, wrapHeight - imgHeight);
        state.positionMax.x = 0;
        state.positionMax.y = 0;
    
        // Обмежуємо поточну позицію
        state.position.x = Math.max(state.positionMin.x, Math.min(state.position.x, state.positionMax.x));
        state.position.y = Math.max(state.positionMin.y, Math.min(state.position.y, state.positionMax.y));
    
        document.querySelectorAll('.comparison-image').forEach(img => {
            img.style.transform = `translate(${state.position.x}px, ${state.position.y}px) scale(${state.zoom})`;
        });
    }
    
