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
        span.textContent = book.read ? 'Read' : 'Not Read Yet';
        if (span.textContent == "Read"){
            span.style.color = "green";
        } else {
            span.style.color = "red";
        }
        // read.appendChild(span);
        read.textContent = "Status: ";
        read.appendChild(span);
        cardContent.appendChild(title);
        cardContent.appendChild(author);
        cardContent.appendChild(description);
        description.appendChild(pages);
        description.appendChild(read);
        card.appendChild(colorPane);
        card.appendChild(cardContent);
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

/*-------------------------------- FOR POP-UP FORM ONLY-------------------------------------------------*/

const form = document.documentElement.querySelector('#addBookButton');
form.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting
});

document.getElementById('openFormButton').addEventListener('click', function() {
    document.getElementById('popupFormContainer').style.display = 'block';
  });
  
//   document.getElementById('closeFormButton').addEventListener('click', function() {
//     document.getElementById('popupFormContainer').style.display = 'none';
//   });
  
let errorText = '';
const input = document.querySelector('#pages');
    input.addEventListener('keyup', () => {
        document.querySelector(`#${input.id}-error`).textContent = '';
        input.addEventListener("focus", function() {
            document.querySelector(`#${input.id}-error`).textContent = '';
        });

        input.addEventListener("blur", function() {
            console.log("Finished typing:", input.value);
            // Perform desired actions after finished typing
            console.log(input.checkValidity());

            if (/\D/.test(input.value)) {
                console.log(/\D/.test(input.value));
                input.setCustomValidity('wrong');
                console.log(input.checkValidity());
            }
            else {
                input.setCustomValidity('');
            }
            
            if (input.validationMessage != '' && input.value !== '') {
                errorText = 'Invalid Phone Number';
            }
            else {
                errorText = '';
            }
                document.querySelector(`#${input.id}-error`).textContent = errorText;
                document.querySelector(`#${input.id}-error`).style.color = 'red';
            });
    });
