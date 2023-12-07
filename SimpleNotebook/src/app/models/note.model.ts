export interface NoteBase {
    id: string;
}
export interface Note extends NoteBase {
    message: string;
    createdOn: string;
}