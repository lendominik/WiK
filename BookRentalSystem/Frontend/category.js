document.addEventListener("DOMContentLoaded", () => {
  const categoriesList = document.getElementById("categories-list");
  const categoryForm = document.getElementById("category-form");
  const apiBaseUrl = "http://localhost:5000/api/v1/category";
  let editingCategoryId = null; // ID kategorii, która jest aktualnie edytowana

  // Pobierz kategorie z API
  async function fetchCategories() {
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) throw new Error("Failed to fetch categories.");
      const categories = await response.json();

      // Wyświetl kategorie w tabeli
      categoriesList.innerHTML = categories
        .map(
          (category, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${category.name || "No name"}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick="editCategory(${
                  category.id
                }, '${category.name}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${
                  category.id
                })">Delete</button>
              </td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      console.error("Error fetching categories:", error);
      categoriesList.innerHTML = `<tr><td colspan="3">Error loading categories. Check console for details.</td></tr>`;
    }
  }

  // Dodaj nową kategorię lub zaktualizuj istniejącą
  async function saveCategory(event) {
    event.preventDefault();
    const name = document.getElementById("category-name").value;
    const categoryData = { name };

    try {
      if (editingCategoryId) {
        // Aktualizacja istniejącej kategorii
        const response = await fetch(`${apiBaseUrl}/${editingCategoryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });
        if (!response.ok) throw new Error("Failed to update category.");
        editingCategoryId = null; // Resetuj tryb edycji
        document.querySelector('button[type="submit"]').textContent =
          "Add Category";
      } else {
        // Dodanie nowej kategorii
        const response = await fetch(apiBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        });
        if (!response.ok) throw new Error("Failed to add category.");
      }
      categoryForm.reset();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }

  // Usuń kategorię
  window.deleteCategory = async function (categoryId) {
    try {
      const response = await fetch(`${apiBaseUrl}/${categoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category.");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Edytuj kategorię
  window.editCategory = function (categoryId, name) {
    editingCategoryId = categoryId; // Ustaw ID kategorii do edycji
    document.getElementById("category-name").value = name || "";
    document.querySelector('button[type="submit"]').textContent =
      "Update Category";
  };

  // Inicjalizacja
  categoryForm.addEventListener("submit", saveCategory);
  document
    .getElementById("fetch-categories")
    .addEventListener("click", fetchCategories);

  fetchCategories(); // Załaduj kategorie przy starcie
});
