export interface Book {
    book_id: number;
    author: string | null;
    title: string;
    isbn: string | null;
    total_page: number;
}