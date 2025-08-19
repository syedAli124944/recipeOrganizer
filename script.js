// Select elements
const formPopup = document.getElementById("recipeFormPopup");
const recipeForm = document.getElementById("recipeForm");
const closeBtn = document.querySelector(".close");
const cardContent = document.querySelector(".card-content");
const recipeCount = document.getElementById("recipe-count");
const formTitle = document.getElementById("formTitle");
const editIndexInput = document.getElementById("edit");

// Open form
function openForm(index = null) {
  document.getElementById("recipeFormPopup").style.display = "flex";
  formTitle.textContent = index !== null ? "Edit Recipe" : "Add Recipe";

  if (index !== null) {
    // Editing existing recipe
    const card = document.querySelectorAll(".recipe-card")[index];
    document.getElementById("name").value =
      card.querySelector("h3").textContent;
    document.getElementById("ingredients").value =
      card.querySelector(".ingridients ul");
    document.getElementById("time").value = parseInt(
      card.querySelector(".cooking-time")
    );
    editIndexInput.value = index;
  } else {
    // Adding new recipe
    recipeForm.reset();
    editIndexInput.value = "";
  }
}

// Close form
function closeForm() {
  document.getElementById("recipeFormPopup").style.display = "none";
}

// Save recipe (add / edit)
function saveRecipe(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const ingredients = document.getElementById("ingredients").value;
  const time = document.getElementById("time").value;
  const editIndex = editIndexInput.value;

  if (editIndex) {
    // Update existing recipe
    const card = document.querySelectorAll(".recipe-card")[editIndex];
    card.querySelector("h3").textContent = name;
    card.querySelector(".ingridients ul").innerHTML = `<li>${ingredients}</li>`;
    card.querySelector(
      ".cooking-time"
    ).textContent = `Cooking Time: ${time} min`;
  } else {
    // Add new recipe card
    const newCard = document.createElement("div");
    newCard.classList.add("recipe-card");
    newCard.innerHTML = `
      <div class="recipe-img">
          <img class="Rimage" src="salad.jpg" alt="">
      </div>
      <h3>${name}</h3>
      <p class="price">Price : $1.00</p>
      <div class="details">
        <span class="cooking-time">Cooking Time: ${time} min</span>
        <span class="ingridients">
          <h3>Ingredients :</h3>
          <ul><li>${ingredients}</li></ul>
        </span>
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i> Delete</button>
      </div>
    `;
    cardContent.appendChild(newCard);

    // Add events to buttons
    newCard.querySelector(".edit").addEventListener("click", () => {
      const index = Array.from(
        document.querySelectorAll(".recipe-card")
      ).indexOf(newCard);
      openForm(index);
    });

    newCard.querySelector(".delete").addEventListener("click", () => {
      newCard.remove();
      updateCount();
    });
  }

  updateCount();
  closeForm();
}

// Delete recipe
function deleteRecipe(index) {
  const card = document.querySelectorAll(".recipe-card")[index];
  if (card) {
    card.remove();
    updateCount();
  }
}

// Update recipe count
function updateCount() {
  const count = document.querySelectorAll(".recipe-card").length;
  recipeCount.textContent = count + " recipes";
}

// Event listeners
closeBtn.addEventListener("click", closeForm);
recipeForm.addEventListener("submit", saveRecipe);

// Initialize count
updateCount();
