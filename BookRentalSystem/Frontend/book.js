document.addEventListener("DOMContentLoaded", () => {
  const booksList = document.getElementById("books-list");
  const bookForm = document.getElementById("book-form");
  const categorySelect = document.getElementById("book-category");
  const authorSelect = document.getElementById("book-author");
  const publisherSelect = document.getElementById("book-publisher");
  const saveBookButton = document.getElementById("save-book-button");
  const cancelEditButton = document.getElementById("cancel-book-edit");
  const apiBaseUrl = "http://localhost:5000/api/v1";
  let editingBookId = null;

  let categories = [];
  let authors = [];
  let publishers = [];

  // Pobierz książki z API
  async function fetchBooks() {
    try {
      const response = await fetch(`${apiBaseUrl}/book`);
      if (!response.ok) throw new Error("Failed to fetch books.");
      const books = await response.json();

      // Wyświetl książki w tabeli
      booksList.innerHTML = books
        .map((book, index) => {
          const categoryName =
            categories.find((category) => category.id === book.categoryId)
              ?.name || "N/A";
          const authorName = authors.find(
            (author) => author.id === book.authorId
          )
            ? `${
                authors.find((author) => author.id === book.authorId).lastName
              }, ${
                authors.find((author) => author.id === book.authorId).firstName
              }`
            : "N/A";
          const publisherName =
            publishers.find((publisher) => publisher.id === book.publisherId)
              ?.name || "N/A";

          return `
            <tr>
              <td>${index + 1}</td>
              <td>${book.title || "No title"}</td>
              <td>${book.description || "No description"}</td>
              <td>${categoryName}</td>
              <td>${authorName}</td>
              <td>${publisherName}</td>
              <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${
                  book.id
                }" 
                  data-title="${book.title}" 
                  data-description="${book.description}" 
                  data-category="${book.categoryId}" 
                  data-author="${book.authorId}" 
                  data-publisher="${book.publisherId}">Edit</button>
                <button class="btn btn-danger btn-sm delete-button" data-id="${
                  book.id
                }">Delete</button>
              </td>
            </tr>
          `;
        })
        .join("");

      attachEventListeners(); // Po wyrenderowaniu przypnij eventy
    } catch (error) {
      console.error("Error fetching books:", error);
      booksList.innerHTML = `<tr><td colspan="7">Error loading books. Check console for details.</td></tr>`;
    }
  }

  // Funkcja do przypinania eventów do przycisków po wyrenderowaniu tabeli
  function attachEventListeners() {
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.getAttribute("data-id");
        const title = button.getAttribute("data-title");
        const description = button.getAttribute("data-description");
        const categoryId = button.getAttribute("data-category");
        const authorId = button.getAttribute("data-author");
        const publisherId = button.getAttribute("data-publisher");

        editBook(bookId, title, description, categoryId, authorId, publisherId);
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.getAttribute("data-id");
        deleteBook(bookId);
      });
    });
  }

  function editBook(
    bookId,
    title,
    description,
    categoryId,
    authorId,
    publisherId
  ) {
    editingBookId = bookId;

    // Wypełnij formularz danymi książki
    document.getElementById("book-title").value = title || "";
    document.getElementById("book-description").value = description || "";

    // Wypełnij listy rozwijane i ustaw wybrane wartości
    Promise.all([loadCategories(), loadAuthors(), loadPublishers()])
      .then(() => {
        // Sprawdź, czy wartości istnieją na listach rozwijanych
        if (categorySelect.querySelector(`option[value="${categoryId}"]`)) {
          categorySelect.value = categoryId;
        } else {
          console.warn(
            `Category ID ${categoryId} not found in the category list.`
          );
          categorySelect.value = ""; // Domyślna wartość
        }

        if (authorSelect.querySelector(`option[value="${authorId}"]`)) {
          authorSelect.value = authorId;
        } else {
          console.warn(`Author ID ${authorId} not found in the author list.`);
          authorSelect.value = ""; // Domyślna wartość
        }

        if (publisherSelect.querySelector(`option[value="${publisherId}"]`)) {
          publisherSelect.value = publisherId;
        } else {
          console.warn(
            `Publisher ID ${publisherId} not found in the publisher list.`
          );
          publisherSelect.value = ""; // Domyślna wartość
        }

        // Zmień tekst przycisku i pokaż opcję anulowania edycji
        // saveBookButton.textContent = "Update Book";
        cancelEditButton.style.display = "inline-block";
      })
      .catch((error) => {
        console.error("Error loading data for editing:", error);
        alert("Failed to load data for editing. Please try again.");
      });
  }

  // Usuń książkę
  async function deleteBook(bookId) {
    try {
      const response = await fetch(`${apiBaseUrl}/book/${bookId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete book.");
      fetchBooks(); // Odśwież listę książek
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  // Resetuj formularz
  cancelEditButton.addEventListener("click", () => {
    editingBookId = null;
    bookForm.reset();
    saveBookButton.textContent = "Add Book";
    cancelEditButton.style.display = "none";
  });

  // Dodaj nową książkę lub zaktualizuj istniejącą
  async function saveBook(event) {
    event.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const description = document
      .getElementById("book-description")
      .value.trim();
    const categoryId = parseInt(categorySelect.value, 10) || null;
    const authorId = parseInt(authorSelect.value, 10) || null;
    const publisherId = parseInt(publisherSelect.value, 10) || null;

    // Debugging
    console.log("Book data:", {
      title,
      description,
      categoryId,
      authorId,
      publisherId,
    });

    if (!title || !description || !categoryId || !authorId || !publisherId) {
      alert("Please fill in all fields and select valid options.");
      return;
    }

    const bookData = {
      title,
      description,
      categoryId,
      authorId,
      publisherId,
    };

    try {
      if (editingBookId) {
        // Aktualizacja książki
        const response = await fetch(`${apiBaseUrl}/book/${editingBookId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        });
        if (!response.ok) throw new Error("Failed to update book.");
        editingBookId = null;
      } else {
        // Dodanie nowej książki
        const response = await fetch(`${apiBaseUrl}/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        });
        if (!response.ok) throw new Error("Failed to add book.");
      }

      bookForm.reset();
      saveBookButton.textContent = "Add Book";
      cancelEditButton.style.display = "none";
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  }

  // Pobierz kategorie, autorów i wydawców
  async function loadCategories() {
    try {
      const response = await fetch(`${apiBaseUrl}/category`);
      if (!response.ok) throw new Error("Failed to fetch categories.");
      categories = await response.json();

      categorySelect.innerHTML = '<option value="">Select a category</option>';
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  async function loadAuthors() {
    try {
      const response = await fetch(`${apiBaseUrl}/author`);
      if (!response.ok) throw new Error("Failed to fetch authors.");
      authors = await response.json();

      authorSelect.innerHTML = '<option value="">Select an author</option>';
      authors.forEach((author) => {
        const option = document.createElement("option");
        option.value = author.id;
        option.textContent = `${author.lastName}, ${author.firstName}`;
        authorSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading authors:", error);
    }
  }

  async function loadPublishers() {
    try {
      const response = await fetch(`${apiBaseUrl}/publisher`);
      if (!response.ok) throw new Error("Failed to fetch publishers.");
      publishers = await response.json();

      publisherSelect.innerHTML =
        '<option value="">Select a publisher</option>';
      publishers.forEach((publisher) => {
        const option = document.createElement("option");
        option.value = publisher.id;
        option.textContent = publisher.name;
        publisherSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading publishers:", error);
    }
  }

  // Inicjalizacja
  bookForm.addEventListener("submit", saveBook);
  loadCategories().then(fetchBooks);
  loadAuthors();
  loadPublishers();
});
