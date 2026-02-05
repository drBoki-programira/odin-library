const myLibrary = []
const bookshelf = document.querySelector(".bookshelf")

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.ID = crypto.randomUUID()
    this.info = function() {
        const stringRead = (this.read) ? "read" : "not read yet"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${stringRead}`
  }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

function display(book) {
    const bookCard = document.createElement("div")
    bookCard.setAttribute("class", "book-card")
    const bookTitle = document.createElement("h3")
    bookTitle.setAttribute("class", "book-title")
    bookTitle.textContent = `"${book.title}"`
    const bookAuthor = document.createElement("h4")
    bookAuthor.setAttribute("class", "book-author")
    bookAuthor.textContent = `by ${book.author}`
    const bookLength = document.createElement("p")
    bookLength.setAttribute("class", "book-length")
    bookLength.textContent = `${book.pages} pages`

    bookCard.appendChild(bookTitle)
    bookCard.appendChild(bookAuthor)
    bookCard.appendChild(bookLength)
    bookshelf.appendChild(bookCard)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("A Game of Thrones", "George R.R. Martin", 695, true)
addBookToLibrary("Foundation", "Isaac Asimov", 300, true)
addBookToLibrary("The Three-Body Problem", "Cixin Liu", 400, false)

myLibrary.forEach(display)