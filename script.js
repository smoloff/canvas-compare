
const materialSelector = document.getElementById('material-selector')
const comparisonGrid = document.getElementById('comparisonGrid')
const comparisonGallery = []

for (const imgDiv of comparisonGrid.children) {
    comparisonGallery.push(imgDiv)
}
console.log(comparisonGallery)

materialSelector.addEventListener('change', (e)=> {
    let checkboxVal = e.target.attributes[1].value;
    e.target.checked == true? addImg(checkboxVal) : removeImg(checkboxVal);
    });

function addImg(a) {
    comparisonGallery.forEach (el => {
        if (el.attributes[1].value == a) {
            console.log(`add ${el}`)
        }
    })
}

function removeImg(a) {
    comparisonGallery.forEach (el => {
        if (el.attributes[1].value == a) {
            console.log(`remove ${el}`)
        }
    })
}





