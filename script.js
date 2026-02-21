class Book {
    ID = crypto.randomUUID()

    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    
    info() {
        const stringRead = (this.read) ? "read" : "not read yet"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${stringRead}`
    }

    static addToLibrary(book) {
        myLibrary.push(book)
    }
}

function addRemoveListener(bookCard) {
    const remove = bookCard.querySelector(".remove")

    remove.addEventListener("click", () => {
        const removeBookID = bookCard.getAttribute("data-ID")
        const indexToRemove = myLibrary.findIndex(book => book.ID == removeBookID)
        
        bookCard.remove()
        myLibrary.splice(indexToRemove, 1)
    })
}

function display(book) {
    const bookCard = document.createElement("div")
    bookCard.setAttribute("class", "book-card")
    bookCard.setAttribute("data-ID", book.ID)
    const readStatus = (book.read) ? "read" : "not-read"

    bookCard.innerHTML = `<button class="remove">X</button>
    <h3>"${book.title}"</h3>
    <h4>by ${book.author}</h4>
    <p>${book.pages} pages</p>
    <svg class="${readStatus}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>book-open-variant</title><path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8M13 11.5C14.11 10.82 15.6 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C15.73 9 14.23 9.28 13 9.84V11.5M17.5 11.67C15.79 11.67 14.29 11.93 13 12.46V14.15C14.11 13.5 15.6 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67M20 14.57C19.13 14.41 18.29 14.33 17.5 14.33C15.67 14.33 14.17 14.6 13 15.13V16.82C14.11 16.16 15.6 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57Z" /></svg>`

    addRemoveListener(bookCard)
    bookCard.addEventListener("click", () => {
        const bookSVG = bookCard.querySelector("svg")
        const status = bookSVG.getAttribute("class")

        if (status == "read") {
            bookSVG.setAttribute("class", "not-read")
        } else {
            bookSVG.setAttribute("class", "read")
        }
    })
    bookshelf.appendChild(bookCard)
}

const myLibrary = []
const bookshelf = document.querySelector(".bookshelf")

const openDialog = document.getElementById("open")
const closeDialog = document.getElementById("cancel")
const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

Book.addToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, false))
Book.addToLibrary(new Book("A Game of Thrones", "George R.R. Martin", 695, true))
Book.addToLibrary(new Book("Foundation", "Isaac Asimov", 300, true))
Book.addToLibrary(new Book("The Three-Body Problem", "Cixin Liu", 400, false))

myLibrary.forEach(display)

openDialog.addEventListener("click", () => dialog.showModal())
closeDialog.addEventListener("click", () => dialog.close())
dialog.addEventListener("close", () => {
    if (dialog.returnValue === "add") {
        const data = new FormData(form)
        const newBook = Object.fromEntries(data)
        const bookRead = newBook.read === "read"
        const book = new Book(newBook["title"], newBook["author"], newBook["pages"], bookRead)

        Book.addToLibrary(book)
        display(myLibrary.at(-1))
    }
})
