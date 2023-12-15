import { Injectable } from '@angular/core';
import { Note, NoteFieldType } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ArraySortingService {
  private sortDirection: string = 'asc';

  constructor() { 
    this.sortTableData(); 
  }

  sortTableData(notes?: Note[], fieldType?: NoteFieldType): void {
    if (notes) {
      switch (fieldType) {
        case 'message':
          this.sortDirection === 'asc'
            ? notes.sort((a, b) => a.message.localeCompare(b.message))
            : notes.sort((a, b) => b.message.localeCompare(a.message));
          break;
        case 'createdOn':
            notes && this.sortDirection === 'asc'
            ? notes.sort((a, b) => a.message.localeCompare(b.message))
            : notes.sort((a, b) => b.message.localeCompare(a.message));
          break;
      }
    }
  }

  toggleSortDirection(notes: Note[], fieldType: NoteFieldType): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortTableData(notes, fieldType);
  }
}
