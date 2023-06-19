let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    this.read = this.read ? 'read' : 'not read yet'
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function displayBooks() {
    const books = document.querySelector('#books');
    books.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.setAttribute('data-index', index);
        const bookInfo = document.createElement('p');
        bookInfo.textContent = book.info();
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', removeBook);
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(removeBtn);
        books.appendChild(bookDiv);
    })
}
