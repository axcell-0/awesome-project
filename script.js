const books = JSON.parse(localStorage.getItem('books')) || [];
const few = document.getElementsByTagName('a');
const sec = document.getElementsByTagName('section');
const datedis = document.querySelector('.currentDate');


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

// Display sections according to the nav elements
window.addEventListener('DOMContentLoaded', () => {
  sec[0].classList.toggle('active');
});

for (let i = 0; i < few.length; i += 1) {
  few[i].addEventListener('click', () => {
    for (let j = 0; j < sec.length; j += 1) {
      if (i === j) {
        sec[j].style.display = 'block';
      } else {
        sec[j].style.display = 'none';
      }
    }
  });
}

// Adding current date to the page.
const d = new Date();
const year = d.getFullYear();
let date = d.getDate();
const hours = d.getHours();
let apm;
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
if (date === 1 || date === 21 || date === 31) {
  date += 'st';
} else if (date === 2 || date === 22) {
  date = `${date}nd`;
} else {
  date = `${date}th`;
}
if (hours < 12) {
  apm = 'am';
} else {
  apm = 'pm';
}
datedis.innerHTML = `${monthNames[d.getMonth()]} ${date} ${year}, ${hours}:${d.getMinutes()}:${d.getSeconds()} ${apm}`;