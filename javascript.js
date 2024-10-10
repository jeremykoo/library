const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let temp = "";
        if (this.read == true) {
            temp = "already read";
        }
        else {
            temp = "not read yet";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${temp}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const cinderella = new Book("Cinderella", "Some Person", 130, true);
const frozen = new Book("Frozen", "Olaf and Olaf", 75, true);

addBookToLibrary(theHobbit);
addBookToLibrary(cinderella);
addBookToLibrary(frozen);

const books = document.querySelector(".bookcase");
function addBook(book) {
    const newBook = document.createElement("div");
    newBook.classList.add("book");

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;
    newBook.appendChild(title);

    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = book.author;
    newBook.appendChild(author);

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    newBook.appendChild(pages);

    const read = document.createElement("div");
    read.classList.add("read");
    read.textContent = book.read;
    newBook.appendChild(read);

    const toggle = document.createElement("button");
    toggle.textContent = "Toggle"
    newBook.appendChild(toggle);
    newBook.classList.add(book.read == true ? "book-read" : "book-unread");

    toggle.addEventListener("click", () => {
        console.log("toggled", book.title, book.read);
        if (book.read == true) {
            newBook.classList.replace("book-read", "book-unread");
            book.read = false;
            read.textContent = false;
        }
        else if (book.read == false) {
            newBook.classList.replace("book-unread", "book-read");
            book.read = true;
            read.textContent = true;
        }
    });

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    newBook.setAttribute("index", book.index);
    newBook.appendChild(remove);

    remove.addEventListener("click", () => {
        const index = newBook.getAttribute("index");
        myLibrary.splice(index, 1);
        console.log(myLibrary);
        displayBooks();
    });

    books.appendChild(newBook);
}

function displayBooks() {
    console.log(myLibrary.length);
    books.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        book.index = i;
        addBook(book);
        console.log(book.info());
    }
}

const dialog = document.getElementById("myDialog");
const form = document.getElementById("myForm");
const showButton = document.querySelector(".show");
const confirmButton = dialog.querySelector(".confirm");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book_title');
    const author = formData.get('book_author');
    const pages = formData.get('book_pages');
    const read = formData.get('read');
    console.log(title, author, pages, read);

    let book = new Book(title, author, pages, Boolean(read));
    addBookToLibrary(book);
    addBook(book);
    dialog.close();
});

displayBooks();