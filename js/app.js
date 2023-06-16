//requerimiento principal

async function fetchAndDisplayCategories() {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
//hago el intento de despliegue  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    const data = await response.json();

    const categories = data.categories;

    const selectElement = document.getElementById('categorias');

    console.log('Categorías de recetas:');

//requerimiento opcional
    categories.forEach((category) => {
      console.log(category.strCategory);
    });
    categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory));

      console.log('Categorías de recetas ordenadas por "strCategory":');
      categories.forEach((category) => {
      console.log(category.strCategory);
    });

//muestro en el html
  categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.strCategory;
      option.textContent = category.strCategory;
      selectElement.appendChild(option);
    });

//atrapo el error      
  } catch (error) {
    console.error(error);
  }
}

//invoco la funcion
fetchAndDisplayCategories();

//-------------------------------------------------------------------------------------------

//Aqui revisen desde aca para abajo


// aca esta la famosa función asíncrona para obtener las categorías de recetas
// async function obtenerCategorias() {
//   const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const categorias = data.categories;

//     categorias.forEach(categoria => {
//       const option = document.createElement('option');
//       option.value = categoria.strCategory;
//       option.textContent = categoria.strCategory;
//       selectRecetas.appendChild(option);
//     });
//     //aca atrapamos el error
//   } catch (error) {
//     console.log('Error al obtener las categorías:', error);
//   }
// }

// esta es otra función asíncrona para obtener las recetas filtradas por categoría o nombre pero no he hecho nada en el html asi que puede que eso me este fallando
// async function obtenerRecetas(categoria, nombre) {
//   let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';

//   if (categoria) {
//     url += `c=${categoria}`;
//   }

//   if (nombre) {
//     if (categoria) {
//       url += '&';
//     }
//     url += `i=${nombre}`;
//   }
    //aqui entra intentando ejecutar
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const recetas = data.categories; // actualizamos la propiedad en función de la estructura de la respuesta
  
  //     cardContainer.innerHTML = '';
  
  //     recetas.forEach(receta => {
  //       const card = document.createElement('div');
  //       card.classList.add('card', 'col-md-4', 'mb-3');
  //       card.innerHTML = `
  //         <img src="${receta.strCategoryThumb}" class="card-img-top" alt="${receta.strCategory}">
  //         <div class="card-body">
  //           <h5 class="card-title">${receta.strCategory}</h5>
  //           <p class="card-text">${receta.strCategoryDescription}</p>
  //         </div>
  //       `;
  //       cardContainer.appendChild(card);
  //     });
  //   } catch (error) {
  //     console.log('Error al obtener las recetas:', error);
  //   }
  // }
  
  //definimos form o si no no funciona
  // const form = document.querySelector('#formulario');
  // const btnMultipleRecetas = document.querySelector('#btnMultipleRecetas');

  // este es el evento para obtener las recetas al enviar el formulario
  // form.addEventListener('submit', e => {
  //   e.preventDefault();
  //   const categoriaSeleccionada = selectRecetas.value;
  //   const nombreReceta = inputNombre.value;
  //   obtenerRecetas(categoriaSeleccionada, nombreReceta);
  // });
  
  // este es el evento para traer múltiples recetas *(que no funciona XD revisar)
  // btnMultipleRecetas.addEventListener('click', () => {
  //   obtenerRecetas();
  // });
  
  // aqui obtengo las categorías al cargar la página
  // obtenerCategorias();