const books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = '';

  if (books.length === 0) {
    booksDiv.textContent = 'No books in the collection.';
    return;
  }

  const removeBook = (index) => {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  };

  books.forEach((book, index) => {
    booksDiv.innerHTML += `
    <div class="book">
        <span class="book-title">${book.title}</span>
        <span class="book-author">by ${book.author}</span>
        <button class="remove-button" type="button" data-index="${index}">Remove</button>
      </div>`;
  });

  const removeButtons = document.getElementsByClassName('remove-button');
  Array.from(removeButtons).forEach((button, index) => {
    button.addEventListener('click', () => {
      removeBook(index);
    });
  });
}

function addBook(title, author) {
  const book = {
    title,
    author,
  };

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
}

const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');

  addBook(titleInput.value, authorInput.value);

  titleInput.value = '';
  authorInput.value = '';
});

displayBooks();