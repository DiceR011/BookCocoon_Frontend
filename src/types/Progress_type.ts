export interface Progress{
    "book_id": number;
    "current_page": number;
    "read_time": number;
    "read_state":  "Unread" | "Reading" | "Finished";
    "start_date": string;
    "finish_date": string;
}