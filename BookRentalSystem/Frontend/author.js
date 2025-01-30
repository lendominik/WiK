document.addEventListener("DOMContentLoaded", () => {
  const authorsList = document.getElementById("authors-list");
  const authorForm = document.getElementById("author-form");
  const saveButton = document.getElementById("save-button");
  const cancelEditButton = document.getElementById("cancel-edit");
  const apiBaseUrl = "http://localhost:5000/api/v1/author";
  let editingAuthorId = null; // ID autora, który jest aktualnie edytowany

  // Pobierz autorów z API
  async function fetchAuthors() {
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) throw new Error("Failed to fetch authors.");
      const authors = await response.json();

      // Wyświetl autorów w tabeli
      authorsList.innerHTML = authors
        .map(
          (author, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${author.firstName || "No first name"}</td>
              <td>${author.lastName || "No last name"}</td>
              <td>${author.nationality || "No nationality"}</td>
              <td>${
                author.dateOfBirth
                  ? new Date(author.dateOfBirth).toLocaleDateString()
                  : "-"
              }</td>
              <td>${
                author.dateOfDeath
                  ? new Date(author.dateOfDeath).toLocaleDateString()
                  : "-"
              }</td>
              <td>

                <button class="btn btn-danger btn-sm" onclick="deleteAuthor(${
                  author.id
                })">Delete</button>
              </td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      console.error("Error fetching authors:", error);
      authorsList.innerHTML = `<tr><td colspan="7">Error loading authors. Check console for details.</td></tr>`;
    }
  }

  // Dodaj nowego autora lub zaktualizuj istniejącego
  async function saveAuthor(event) {
    event.preventDefault();

    // Pobierz wartości z formularza
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const nationality = document.getElementById("nationality").value || null;
    const dateOfBirth = document.getElementById("date-of-birth").value || null;
    const dateOfDeath = document.getElementById("date-of-death").value || null;

    // Przygotuj dane autora
    const authorData = {
      firstName,
      lastName,
      nationality,
      dateOfBirth,
      dateOfDeath,
    };

    try {
      if (editingAuthorId) {
        // Aktualizacja istniejącego autora
        const response = await fetch(`${apiBaseUrl}/${editingAuthorId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(authorData),
        });

        if (!response.ok) {
          throw new Error("Failed to update author.");
        }
        // Resetuj ID edycji
        editingAuthorId = null;
      } else {
        // Dodanie nowego autora
        const response = await fetch(apiBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(authorData),
        });

        if (!response.ok) {
          throw new Error("Failed to add author.");
        }
      }

      // Odśwież listę autorów i zresetuj formularz
      fetchAuthors();
      resetForm();
    } catch (error) {
      console.error("Error saving author:", error);
      alert(
        "An error occurred while saving the author. Check the console for details."
      );
    }
  }

  // Usuń autora
  window.deleteAuthor = async function (authorId) {
    try {
      const response = await fetch(`${apiBaseUrl}/${authorId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete author.");
      fetchAuthors();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  window.editAuthor = function (
    authorId,
    firstName,
    lastName,
    nationality,
    dateOfBirth,
    dateOfDeath
  ) {
    editingAuthorId = authorId; // Ustaw ID autora do edycji
    document.getElementById("first-name").value = firstName || "";
    document.getElementById("last-name").value = lastName || "";
    document.getElementById("nationality").value = nationality || "";

    // Sprawdzanie i ustawianie daty urodzenia
    if (dateOfBirth && !isNaN(new Date(dateOfBirth))) {
      document.getElementById("date-of-birth").value = new Date(dateOfBirth)
        .toISOString()
        .split("T")[0];
    } else {
      document.getElementById("date-of-birth").value = "";
    }

    // Sprawdzanie i ustawianie daty śmierci
    if (dateOfDeath && !isNaN(new Date(dateOfDeath))) {
      document.getElementById("date-of-death").value = new Date(dateOfDeath)
        .toISOString()
        .split("T")[0];
    } else {
      document.getElementById("date-of-death").value = "";
    }

    // Zmiana tekstu przycisku i wyświetlenie "Cancel"
    document.getElementById("save-button").textContent = "Update Author";
    document.getElementById("cancel-edit").style.display = "inline-block";
  };

  // Anuluj edycję
  cancelEditButton.addEventListener("click", resetForm);

  // Resetuj formularz do trybu dodawania
  function resetForm() {
    editingAuthorId = null; // Resetuj ID edycji
    authorForm.reset();
    saveButton.textContent = "Add Author";
    cancelEditButton.style.display = "none"; // Ukryj przycisk anulowania
  }

  // Inicjalizacja
  authorForm.addEventListener("submit", saveAuthor);
  document
    .getElementById("fetch-authors")
    .addEventListener("click", fetchAuthors);

  fetchAuthors(); // Załaduj autorów przy starcie
});
console.log(document.getElementById("save-button")); // Powinno zwrócić element przycisku
console.log(document.getElementById("cancel-edit")); // Powinno zwrócić element przycisku
