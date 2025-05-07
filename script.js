const materialSelector = document.getElementById('material-selector');
const comparisonGrid = document.getElementById('comparisonGrid');

const state = {
    materials: [],
    zoom: 1,
    position: { x: 0, y: 0 },
    positionMin: {x: -10, y: -10},
    isDragging: false,
    dragStart: { x: 0, y: 0 }
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

// Додавання обробників перетягування
function addDragHandlers() {
    const images = document.querySelectorAll('.comparison-image');

    images.forEach(img => {
        // Встановлюємо початкові координати
        img.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`;

        img.addEventListener('mousedown', (e) => {
            e.preventDefault();
            state.isDragging = true;
            state.dragStart.x = e.clientX;
            state.dragStart.y = e.clientY;
        });
    });

    // Рух мишки
    window.addEventListener('mousemove', (e) => {
        if (!state.isDragging) return;
        

        const dx = e.clientX - state.dragStart.x;
        const dy = e.clientY - state.dragStart.y;

        const newX = state.position.x + dx;
        const newY = state.position.y + dy;

        document.querySelectorAll('.comparison-image').forEach(img => {
            img.style.transform = `translate(${newX}px, ${newY}px)`;
        });

        console.log(`X: ${newX}, Y: ${newY}`);
    });

    // Відпускання мишки
    window.addEventListener('mouseup', (e) => {
        if (!state.isDragging) return;
        state.isDragging = false;
        state.position.x += e.clientX - state.dragStart.x;
        state.position.y += e.clientY - state.dragStart.y;
    });
}

// Виклик після завантаження
addDragHandlers();
