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
    const booksShelf = document.querySelector('.books');
    booksShelf.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-index', index);
        const title = document.createElement('h2');
        title.textContent = book.title;

        const description = document.createElement('div');
        description.classList.add('description');

        const author = document.createElement('h3');
        author.textContent = book.author;
        const pages = document.createElement('h3');
        pages.textContent = book.pages;
        const read = document.createElement('h3');
        read.textContent = book.read ? 'read' : 'not read yet';

        card.appendChild(title);
        card.appendChild(description);
        description.appendChild(author);
        description.appendChild(pages);
        card.appendChild(read);
        booksShelf.appendChild(card);
    })
}

let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
let book2 = new Book("To Kill a Mockingbird", "Harper Lee", 324, true);
let book3 = new Book("1984", "George Orwell", 328, false);
let book4 = new Book("Pride and Prejudice", "Jane Austen", 279, true);

// Adding books to myLibrary array
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

displayBooks();