document.addEventListener("DOMContentLoaded", () => {
  const publishersList = document.getElementById("publishers-list");
  const publisherForm = document.getElementById("publisher-form");
  const cancelEditButton = document.createElement("button"); // Przycisk Anuluj
  const apiBaseUrl = "http://localhost:5000/api/v1/publisher";
  let editingPublisherId = null; // ID wydawcy, który jest aktualnie edytowany

  // Tworzenie przycisku "Cancel"
  cancelEditButton.textContent = "Cancel";
  cancelEditButton.classList.add("btn", "btn-secondary", "ms-2");
  cancelEditButton.style.display = "none"; // Ukryty na start
  publisherForm.appendChild(cancelEditButton);

  // Pobierz wydawców z API
  async function fetchPublishers() {
    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) throw new Error("Failed to fetch publishers.");
      const publishers = await response.json();

      // Wyświetl wydawców w tabeli
      publishersList.innerHTML = publishers
        .map(
          (publisher, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${publisher.name || "No name"}</td>
              <td>${publisher.description || "No description"}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick="editPublisher(${
                  publisher.id
                }, '${publisher.name}', '${
            publisher.description
          }')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deletePublisher(${
                  publisher.id
                })">Delete</button>
              </td>
            </tr>
          `
        )
        .join("");
    } catch (error) {
      console.error("Error fetching publishers:", error);
      publishersList.innerHTML = `<tr><td colspan="4">Error loading publishers. Check console for details.</td></tr>`;
    }
  }

  // Dodaj nowego wydawcę lub zaktualizuj istniejącego
  async function savePublisher(event) {
    event.preventDefault();
    const name = document.getElementById("publisher-name").value;
    const description =
      document.getElementById("publisher-description").value || null;

    const publisherData = { name, description };

    try {
      if (editingPublisherId) {
        // Aktualizacja istniejącego wydawcy
        const response = await fetch(`${apiBaseUrl}/${editingPublisherId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...publisherData,
            publisherId: editingPublisherId,
          }),
        });
        if (!response.ok) throw new Error("Failed to update publisher.");
        editingPublisherId = null; // Resetuj tryb edycji
        resetForm(); // Przywróć formularz do trybu dodawania
      } else {
        // Dodanie nowego wydawcy
        const response = await fetch(apiBaseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(publisherData),
        });
        if (!response.ok) throw new Error("Failed to add publisher.");
      }
      fetchPublishers();
      publisherForm.reset();
    } catch (error) {
      console.error("Error saving publisher:", error);
    }
  }

  // Usuń wydawcę
  window.deletePublisher = async function (publisherId) {
    try {
      const response = await fetch(`${apiBaseUrl}/${publisherId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete publisher.");
      editingPublisherId = null; // Resetuj tryb edycji w razie usunięcia
      resetForm(); // Przywróć formularz do trybu dodawania
      fetchPublishers();
    } catch (error) {
      console.error("Error deleting publisher:", error);
    }
  };

  // Edytuj wydawcę
  window.editPublisher = function (publisherId, name, description) {
    editingPublisherId = publisherId; // Ustaw ID wydawcy do edycji
    document.getElementById("publisher-name").value = name || "";
    document.getElementById("publisher-description").value = description || "";
    document.querySelector('button[type="submit"]').textContent =
      "Update Publisher";
    cancelEditButton.style.display = "inline-block"; // Pokaż przycisk Anuluj
  };

  // Anuluj edycję
  cancelEditButton.addEventListener("click", resetForm);

  // Resetuj formularz do trybu dodawania
  function resetForm() {
    editingPublisherId = null; // Resetuj ID edycji
    document.getElementById("publisher-name").value = "";
    document.getElementById("publisher-description").value = "";
    document.querySelector('button[type="submit"]').textContent =
      "Add Publisher";
    cancelEditButton.style.display = "none"; // Ukryj przycisk Anuluj
  }

  // Inicjalizacja
  publisherForm.addEventListener("submit", savePublisher);
  document
    .getElementById("fetch-publishers")
    .addEventListener("click", fetchPublishers);

  fetchPublishers(); // Załaduj wydawców przy starcie
});
