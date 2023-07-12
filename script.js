class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksDiv = document.getElementById('books');
    this.addBookForm = document.getElementById('addBookForm');
    this.titleInput = document.getElementById('titleInput');
    this.authorInput = document.getElementById('authorInput');

    this.addBookForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.displayBooks();
  }

  displayBooks() {
    this.booksDiv.innerHTML = '';

    if (this.books.length === 0) {
      this.booksDiv.textContent = 'No books in the collection.';
      return;
    }

    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const titleSpan = document.createElement('span');
      titleSpan.classList.add('book-title');
      titleSpan.textContent = book.title;

      const authorSpan = document.createElement('span');
      authorSpan.classList.add('book-author');
      authorSpan.textContent = `by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-button');
      removeButton.setAttribute('type', 'button');
      removeButton.setAttribute('data-index', index);
      removeButton.textContent = 'Remove';

      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      bookDiv.appendChild(titleSpan);
      bookDiv.appendChild(authorSpan);
      bookDiv.appendChild(removeButton);
      this.booksDiv.appendChild(bookDiv);
    });
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  addBook(title, author) {
    const book = {
      title,
      author,
    };

    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.addBook(this.titleInput.value, this.authorInput.value);

    this.titleInput.value = '';
    this.authorInput.value = '';
  }
}

const library = new Library();
<<<<<<< HEAD

library.addEventListener('click');
=======
library.addEventListener('click');
>>>>>>> 749c898b95f5c2f4492831549c64b35f03ea79d8
