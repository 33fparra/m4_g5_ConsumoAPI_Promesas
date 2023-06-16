// Importar módulos necesarios
import {
  fetchCategories,
  fetchRecipesByCategory,
  fetchRecipesByName,
} from "./app.js"; //

// Obtener referencias a los elementos del DOM
const selectElement = document.getElementById("selectRecipes");
const cardContainer = document.getElementById("cardContainer");

// Función asíncrona para mostrar todas las categorías en el select
async function displayCategories() {
  try {
    const categories = await fetchCategories(); // Llamada a la API para obtener las categorías

    // Iterar sobre las categorías y crear las opciones del select
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.log("Error al obtener las categorías:", error);
  }
}

// Función asíncrona para mostrar las recetas filtradas por categoría o nombre
async function displayRecipes() {
  const selectedOption = selectElement.value; // Obtener la opción seleccionada del select

  try {
    let recipes;

    if (selectedOption === "all") {
      recipes = await fetchRecipesByName(""); // Obtener todas las recetas si se selecciona la opción 'all'
    } else {
      recipes = await fetchRecipesByCategory(selectedOption); // Obtener las recetas filtradas por categoría
    }

    // Limpiar el contenedor de las tarjetas
    cardContainer.innerHTML = "";

    // Iterar sobre las recetas y crear las tarjetas
    recipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = recipe.name;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = recipe.instructions;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log("Error al obtener las recetas:", error);
  }
}

// Event listener para el cambio en el select
selectElement.addEventListener("change", displayRecipes);

// Llamar a la función para mostrar las categorías al cargar la página
displayCategories();
