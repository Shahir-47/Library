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
        this.books.forEach((book, index) => {
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
                myLibrary.displayBooks();
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                myLibrary.removeBook(book);
                myLibrary.displayBooks();
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

/*-------------------------------- FOR POP-UP FORM ONLY-------------------------------------------------*/


// Method for validation check and adding a new new Bookto the library
function validationCheck(e) {
    let isFormValid = true;

    e.preventDefault(); // Prevent the form from submitting
    
    // Validation check
    const inputs = document.querySelectorAll('form .box input');
        inputs.forEach(input => {
            if (input.value == '' ) {
                document.querySelector(`#${input.id}-error`).textContent = '*Please fill out this field';
                document.querySelector(`#${input.id}-error`).style.color = 'red';
                input.addEventListener('focus', () => {
                    document.querySelector(`#${input.id}-error`).textContent = '';
        
                });
                isFormValid = false
            } else if (input.checkValidity() == false) {
                document.querySelector(`#${input.id}-error`).textContent = '*Please enter a valid number of pages';
                document.querySelector(`#${input.id}-error`).style.color = 'red';
                isFormValid = false
            }
        });
    
    // If form is valid, add a new book to the library
    if (isFormValid) {
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const read = document.querySelector('input[name="read"]:checked').value === 'yes' ? true : false;
        console.log(read);
        const newBook = new Book(title, author, pages, read);
        myLibrary.addBook(newBook);
        myLibrary.displayBooks();
        clearForm();
        document.getElementById('popupFormContainer').style.display = 'none';
    }
}

// Method for real-time validation
function realTimeValidation(input , sign){
    let errorText = '';
    console.log("Finished typing:", input.value);
    // Perform desired actions after finished typing
    console.log(input.checkValidity());

    if (/\D/.test(input.value) || Number.isInteger(parseInt(input.value)) == false || input.value <= 0 || input.length >= Number.MAX_SAFE_INTEGER) {
        console.log(/\D/.test(input.value));
        input.setCustomValidity('wrong');
        console.log(input.checkValidity());
    }
    else {
        input.setCustomValidity('');
    }
    
    if (input.validationMessage != '' && input.value !== '') {
        errorText = '*Please enter a valid number of pages';
        sign.textContent = '❌';
        sign.style.cssText = 'color: red; transition: 0.5s ease-in-out;';
    }
    else {
        errorText = '';
        if (input.value == '') {
            sign.style.color = 'transparent';
        } else {
            sign.textContent = '✔';
            sign.style.color = 'green';
        }
    }
        document.querySelector(`#${input.id}-error`).textContent = errorText;
        document.querySelector(`#${input.id}-error`).style.color = 'red';
        return errorText;
}

// Method for clearing error messages 
function clearErrorMessages(input, sign) {
    document.querySelector(`#${input.id}-error`).textContent = '';

    input.addEventListener("focus", function() {
        document.querySelector(`#${input.id}-error`).textContent = '';
        sign.style.color = 'transparent';
    });
}

function clearForm() {
    const inputs = document.querySelectorAll('form .box input');
    const sign = document.querySelector(`.unique-box span`);
    inputs.forEach(input => {
            input.value = '';
            document.querySelector(`#${input.id}-error`).textContent = '';
            sign.style.color = 'transparent';

    });
}
//-------------------------Event Listeners for the pop-up form--------------------------------------------

// Event Listener for opening the form
document.getElementById('openFormButton').addEventListener('click', function() {
    document.getElementById('popupFormContainer').style.display = 'block';
});

// Event Listener for closing the form
document.getElementById('closeFormButton').addEventListener('click', function() {
    clearForm();
    document.getElementById('popupFormContainer').style.display = 'none';
});

// Event Listener for clearing the form
document.getElementById('clearButton').addEventListener('click', function() {
    clearForm();
});

// Event Listener for submitting the form
document.documentElement.querySelector('#addBookButton').addEventListener('click', validationCheck);


// Event Listener for clearing error messages when the user is typing and then...
// do validation check when the user is done typing
const input = document.querySelector('#pages');
const sign = document.querySelector(`.unique-box span`);
    input.addEventListener('keyup', () => {
        clearErrorMessages(input, sign);
        input.addEventListener('blur', () => {
            realTimeValidation(input, sign);
        });
    });