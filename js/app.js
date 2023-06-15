
// Función asíncrona para obtener las categorías de recetas
async function obtenerCategorias() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const categorias = data.categories;

    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.strCategory;
      option.textContent = categoria.strCategory;
      selectRecetas.appendChild(option);
    });
  } catch (error) {
    console.log('Error al obtener las categorías:', error);
  }
}

// Función asíncrona para obtener las recetas filtradas por categoría o nombre
async function obtenerRecetas(categoria, nombre) {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
  if (categoria) {
    url += c=${categoria};
    }
    
    if (nombre) {
    url += &i=${nombre};
    }
    
    try {
    const response = await fetch(url);
    const data = await response.json();
    const recetas = data.meals;
    cardContainer.innerHTML = ''; // Limpiar el contenedor de cards antes de mostrar las nuevas recetas

recetas.forEach(receta => {
  const card = document.createElement('div');
  card.classList.add('card', 'col-md-4', 'mb-3');
  card.innerHTML = `
    <img src="${receta.strMealThumb}" class="card-img-top" alt="${receta.strMeal}">
    <div class="card-body">
      <h5 class="card-title">${receta.strMeal}</h5>
      <p class="card-text">${receta.strInstructions}</p>
    </div>
  `;
  cardContainer.appendChild(card);
});
} catch (error) {
  console.log('Error al obtener las recetas:', error);
  }
  }
  
  // Evento para obtener las recetas al enviar el formulario
  form.addEventListener('submit', e => {
  e.preventDefault();
  const categoriaSeleccionada = selectRecetas.value;
  const nombreReceta = inputNombre.value;
  obtenerRecetas(categoriaSeleccionada, nombreReceta);
  });
  
  // Evento para traer múltiples recetas
  btnMultipleRecetas.addEventListener('click', () => {
  obtenerRecetas();
  });
  
  // Obtener las categorías al cargar la página
  obtenerCategorias();