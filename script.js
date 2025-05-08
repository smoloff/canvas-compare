const materialSelector = document.getElementById('material-selector');
const comparisonGrid = document.getElementById('comparisonGrid');

const state = {
    materials: [],
    zoom: 1,
    position: { x: 0, y: 0 },
    positionMin: {x: -10, y: -10},
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

    const images = document.querySelectorAll('.comparison-image');
    const imageWrap = document.querySelectorAll('.comparison-item');
    

    images.forEach(img => {
        img.style.transform = `translate(${state.position.x}px, ${state.position.y}px)`;

        img.addEventListener('mousedown', (e) => {
            e.preventDefault();
            console.log(img.offsetWidth)
            console.log(imageWrap[1])
            state.dragStart = { x: e.clientX, y: e.clientY };
            
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });
    });

    function onMouseMove(e) {
        if (!state.dragStart) return;

        // Обчислюємо різницю між поточним і стартовим положенням миші
        const dx = e.clientX - state.dragStart.x;
        const dy = e.clientY - state.dragStart.y;

         // Поточне зміщення = глобальна позиція + нова зміна
        const newX = state.position.x + dx;
        const newY = state.position.y + dy;
        // Застосовуємо зміщення до всіх зображень
        document.querySelectorAll('.comparison-image').forEach(img => {
        img.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }

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
