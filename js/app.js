
// aca esta la famosa función asíncrona para obtener las categorías de recetas
async function obtenerCategorias() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'; //aqui guardo la API en mi constante "url"

  try {
    const response = await fetch(url); //aqui llamo a la URL 
    const data = await response.json();
    const categorias = data.categories;  //guardo en categorias la data que entrega categories /si se pierden aca hagan console.log(categorias)

    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.strCategory;
      option.textContent = categoria.strCategory;
      selectRecetas.appendChild(option);
    });
    //aca atrapamos el error
  } catch (error) {
    console.log('Error al obtener las categorías:', error);
  }
}

// esta es otra función asíncrona para obtener las recetas filtradas por categoría o nombre pero no he hecho nada en el html asi que puede que eso me este fallando
async function obtenerRecetas(categoria, nombre) {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
  if (categoria) {
    url += c=${categoria};
    }
    
    if (nombre) {
    url += &i=${nombre};
    }
    //aqui entra intentando ejecutar
    try {
    const response = await fetch(url);
    const data = await response.json();
    const recetas = data.meals;
    cardContainer.innerHTML = ''; 

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
 // si no funciona lo atrapa el catch 

} catch (error) {
  console.log('Error al obtener las recetas:', error);
  }
  }
  
  // este es el evento para obtener las recetas al enviar el formulario
  form.addEventListener('submit', e => {
  e.preventDefault();
  const categoriaSeleccionada = selectRecetas.value;
  const nombreReceta = inputNombre.value;
  obtenerRecetas(categoriaSeleccionada, nombreReceta);
  });
  
  // este es el evento para traer múltiples recetas *(que no funciona XD revisar)
  btnMultipleRecetas.addEventListener('click', () => {
  obtenerRecetas();
  });
  
  // aqui obtengo las categorías al cargar la página
  obtenerCategorias();