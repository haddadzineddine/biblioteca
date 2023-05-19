import { books } from "../data/books";
import { Book } from "../types/book";

export class BookService {

    static getCurrentBook(): Book | null {
        const currentBookId = localStorage.getItem('current_book');

        if (!currentBookId) {
            return null;
        }

        const currentBook = this.getBookById(+currentBookId);

        if (!currentBook || this.isRead(currentBook)) {
            return null;
        }

        return currentBook;
    }

    static setCurrentBook(book: Book) {
        localStorage.setItem('current_book', book.id.toString());
    }

    static getBooks(): Book[] {
        return books;
    }

    static getLeftBooks(): Book[] {
        return this.getBooks().filter(book => !this.isRead(book) && !this.isCurrentBook(book));
    }

    static getBookById(id: number): Book | null {
        return books.find(book => book.id === id) as Book;
    }

    static markAsRead(book: Book) {
        localStorage.setItem('book_' + book.id, 'true');
    }

    static markAsUnread(book: Book) {
        localStorage.removeItem('book_' + book.id);
        localStorage.removeItem('book_' + book.id + '_page');
    }

    static isRead(book: Book): boolean {
        return localStorage.getItem('book_' + book.id) === 'true';
    }

    static isCurrentBook(book: Book): boolean {
        const currentBook = this.getCurrentBook();
        return book.id === currentBook?.id;
    }

    static setCurrentPage(page: number, book: Book) {
        localStorage.setItem('book_' + book.id + '_page', page.toString());
    }

    static getCurrentPage(book: Book): number {
        const page = localStorage.getItem('book_' + book.id + '_page');
        if (!page) {
            return 0;
        }

        return +page;
    }

    static getCompletedBooks(): Book[] {
        return this.getBooks().filter(book => this.isRead(book));
    }
}