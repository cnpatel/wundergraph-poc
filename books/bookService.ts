import { books } from "./data";

export class BookService {
  public getBooks() {
    try {
      return books;
    } catch (error) {
      console.log(`An error occurred in BookService.getBooks --> ${error}`)
    }
  }
  public getBookById(id: any) {
    try {
      return books.find((book) => book.id === id);
    } catch (error) {
      console.log(`An error occurred in BookService.getBookById --> ${error}`)
    }
  }
  public getbooksByAuthorId(authorId: any) {
    try {
      return books.filter((book) => book.authorId === authorId);
    } catch (error) {
      console.log(`An error occurred in BookService.getbooksByAuthorId --> ${error}`)
    }
  }
}