export interface NoteBase {
    id: string;
}
export interface Note extends NoteBase {
    message: string;
    createdOn: string;
}

export enum NoteFieldType {
    message = 'message',
    createdOn = 'createdOn'
}