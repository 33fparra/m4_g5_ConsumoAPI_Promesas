// Función para mostrar las recetas en cards
function displayRecipes(recipes) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card", "col-md-4", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const recipeName = document.createElement("h5");
    recipeName.classList.add("card-title");
    recipeName.textContent = recipe.strMeal;

    const recipeInstructions = document.createElement("p");
    recipeInstructions.classList.add("card-text");
    recipeInstructions.textContent = recipe.strInstructions;

    cardBody.appendChild(recipeName);
    cardBody.appendChild(recipeInstructions);
    card.appendChild(cardBody);
    resultadoDiv.appendChild(card);
  });
}

// Función para filtrar las recetas por categoría
function filterRecipesByCategory(category, recipes) {
  return recipes.filter((recipe) => recipe.strCategory === category);
}

// Función para filtrar las recetas por nombre
function filterRecipesByName(name, recipes) {
  return recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(name.toLowerCase())
  );
}

// Función para manejar el evento de cambio en el select de categorías
function handleCategoryChange() {
  const selectElement = document.getElementById("categorias");
  const selectedCategory = selectElement.value;

  if (selectedCategory === "") {
    return; // No hacer nada si no se selecciona ninguna categoría
  }

  fetchRecipes()
    .then((recipes) => {
      const filteredRecipes = filterRecipesByCategory(
        selectedCategory,
        recipes
      );
      displayRecipes(filteredRecipes);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Función para manejar el evento de envío del formulario
function handleSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.trim();

  if (searchValue === "") {
    return; // No hacer nada si no se ingresa ningún valor de búsqueda
  }

  fetchRecipes()
    .then((recipes) => {
      const filteredRecipes = filterRecipesByName(searchValue, recipes);
      displayRecipes(filteredRecipes);
    })
    .catch((error) => {
      console.error(error);
    });

  searchInput.value = ""; // Limpiar el campo de búsqueda después de la búsqueda
}

// Obtengo categorías desde API
async function fetchCategories() {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener las categorías");
    }

    const data = await response.json();

    return data.categories || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Obtengo recetas desde API
async function fetchRecipes() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener las recetas");
    }

    const data = await response.json();

    return data.meals || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Función para generar las opciones de select en el formulario
function generateOptions(categories) {
  const selectElement = document.getElementById("categorias");

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    selectElement.appendChild(option);
  });
}

// Función principal para inicializar la aplicación
async function initApp() {
  try {
    const categories = await fetchCategories();

    // Ordenar las categorías (strCategory)
    categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory));

    generateOptions(categories);

    // cambio al select de categorías
    const selectElement = document.getElementById("categorias");
    selectElement.addEventListener("change", handleCategoryChange);

    // envío al formulario de búsqueda por nombre
    const formElement = document.querySelector("form");
    formElement.addEventListener("submit", handleSubmit);
  } catch (error) {
    console.error(error);
  }
}

// Inicializar la aplicación al cargar la página
initApp();
