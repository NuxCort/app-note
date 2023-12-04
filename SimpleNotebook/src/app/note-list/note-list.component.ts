import { Component } from '@angular/core';
import { NoteBase } from '../models/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  public notes: NoteBase[] = [];

  public createNote(noteMessage: string): void {
    localStorage.setItem("note", noteMessage);
  }
}
