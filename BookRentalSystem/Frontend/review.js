document.addEventListener("DOMContentLoaded", () => {
  const reviewsList = document.getElementById("reviews-list");
  const reviewForm = document.getElementById("review-form");
  const apiBaseUrl = "http://localhost:5000/api/v1";
  let books = []; // Lista książek

  // Pobierz książki z API
  async function loadBooks() {
    console.log("Loading books...");
    try {
      const response = await fetch(`${apiBaseUrl}/book`);
      if (!response.ok) throw new Error("Failed to fetch books.");
      books = await response.json();
      console.log("Books fetched:", books);

      // Debug: Wyświetl każdą książkę
      books.forEach((book, index) => {
        console.log(`Book [${index + 1}]: ID=${book.id}, Title=${book.title}`);
      });
    } catch (error) {
      console.error("Error loading books:", error);
    }
  }

  // Pobierz recenzje z API
  async function fetchReviews() {
    console.log("Fetching reviews...");
    try {
      const response = await fetch(`${apiBaseUrl}/review`);
      if (!response.ok) throw new Error("Failed to fetch reviews.");
      const reviews = await response.json();
      console.log("Fetched reviews:", reviews);

      // Renderuj recenzje
      reviewsList.innerHTML = reviews
        .map((review, index) => {
          // Znajdź książkę po ID
          const book = books.find(
            (b) => parseInt(b.id) === parseInt(review.bookId)
          );
          const bookTitle = book ? book.title : "No Book";

          console.log(
            `Review ID: ${review.id}, Book ID: ${review.bookId}, Found Book:`,
            book
          );

          return `
            <tr>
              <td>${index + 1}</td>
              <td>${review.content || "No content"}</td>
              <td>${review.reviewerName || "Anonymous"}</td>
              <td>${
                review.createdDate
                  ? new Date(review.createdDate).toLocaleString()
                  : "No date"
              }</td>
              <td>${bookTitle}</td>
              <td>
                <button class="btn btn-danger btn-sm" onclick="deleteReview(${
                  review.id
                })">Delete</button>
              </td>
            </tr>
          `;
        })
        .join("");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      reviewsList.innerHTML = `<tr><td colspan="6">Error loading reviews. Check console for details.</td></tr>`;
    }
  }

  // Pobierz książki, a następnie recenzje
  async function loadBooksAndReviews() {
    await loadBooks(); // Upewnij się, że książki są załadowane
    await fetchReviews(); // Następnie załaduj recenzje
  }

  // Wyświetl książki w formularzu dodawania recenzji
  async function loadBooksForReviewForm() {
    try {
      const response = await fetch(`${apiBaseUrl}/book`);
      if (!response.ok) throw new Error("Failed to fetch books.");

      const books = await response.json();
      const bookSelect = document.getElementById("book-id");

      books.forEach((book) => {
        const option = document.createElement("option");
        option.value = book.id; // Ustaw wartość jako ID książki
        option.textContent = book.title; // Wyświetl nazwę książki
        bookSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading books for review form:", error);
    }
  }
  loadBooksForReviewForm();

  // Dodaj nową recenzję
  async function saveReview(event) {
    event.preventDefault();
    const content = document.getElementById("review-content").value;
    const reviewerName =
      document.getElementById("reviewer-name").value || "Anonymous";
    const bookId = parseInt(document.getElementById("book-id").value, 10);

    const reviewData = { content, reviewerName, bookId };

    try {
      const response = await fetch(`${apiBaseUrl}/review`, {
        // Poprawiono URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error("Failed to add review.");
      await loadBooksAndReviews(); // Odśwież dane po dodaniu recenzji
      reviewForm.reset();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  }

  // Usuń recenzję
  window.deleteReview = async function (reviewId) {
    try {
      const response = await fetch(`${apiBaseUrl}/review/${reviewId}`, {
        // Poprawiono URL
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete review.");
      await loadBooksAndReviews(); // Odśwież dane po usunięciu recenzji
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Inicjalizacja
  reviewForm.addEventListener("submit", saveReview);
  document
    .getElementById("fetch-reviews")
    .addEventListener("click", loadBooksAndReviews);

  loadBooksAndReviews(); // Załaduj książki i recenzje przy starcie
});
