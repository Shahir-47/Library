class Library {

    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        this.books.splice(this.books.indexOf(book), 1);
    }
    
    displayBooks() {
        const booksShelf = document.querySelector('.books');
        booksShelf.innerHTML = '';
        myLibrary.forEach((book, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-index', index);

            const colorPane = document.createElement('div');
            colorPane.classList.add('color-pane');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const title = document.createElement('h2');
            title.textContent = book.title;

            const author = document.createElement('h3');
            author.textContent = "By: " + book.author;

            const description = document.createElement('div');
            description.classList.add('description');

            const pages = document.createElement('h3');
            pages.textContent = "Pages: " + book.pages;

            const span = document.createElement('span');

            const read = document.createElement('h3');
            book.read === 'yes' ? 'Read' : 'Not Read Yet';
            span.textContent = book.read ? 'Read' : 'Not Read Yet';
            if (span.textContent == "Read"){
                span.style.color = "green";
            } else {
                span.style.color = "red";
            }

            const statusBtn = document.createElement('div');
            statusBtn.classList.add('status-btn');

            const readButton = document.createElement('button');
            if (span.textContent == "Read"){
                readButton.classList.add('unread-button');
                readButton.textContent = 'Unread';
            } else {
                readButton.classList.add('read-button');
                readButton.textContent = 'Read';
            }

            readButton.addEventListener('click', () => {
                book.read = !book.read;
                displayBooks();
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                myLibrary.splice(index, 1);
                displayBooks();
            });
            
            read.textContent = "Status: ";
            statusBtn.appendChild(readButton);
            statusBtn.appendChild(deleteButton);
            read.appendChild(span);
            cardContent.appendChild(title);
            cardContent.appendChild(author);
            cardContent.appendChild(description);
            description.appendChild(pages);
            description.appendChild(read);
            cardContent.appendChild(statusBtn);
            card.appendChild(colorPane);
            card.appendChild(cardContent);
            booksShelf.appendChild(card);
        });
    }
}

class Book {
    
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    }
}

let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
let book2 = new Book("To Kill a Mockingbird", "Harper Lee", 324, true);
let book3 = new Book("1984", "George Orwell", 328, false);
let book4 = new Book("Pride and Prejudice", "Jane Austen", 279, true);

const myLibrary = new Library();
myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);
myLibrary.addBook(book4);

myLibrary.displayBooks();