import { Component } from '@angular/core';
import { Note, NoteFieldType } from '../models/note.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { NoteService } from '../services/note.service';
import { LOCAL_STORAGE_KEY_CONST } from '../global-constants';
import { ArraySortingService } from '../services/array-sorting.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrl: './note-list.component.scss',
    standalone: true,
    imports: [CommonModule, MatMenuModule, TranslateModule],
})
export class NoteListComponent {
  public notes: Note[] = [];
  public modalOptions?: NgbModalOptions;
  protected noteFieldType: typeof NoteFieldType = NoteFieldType;
  protected isNewNote?: boolean;

  constructor(
    public arraySortingService: ArraySortingService,
    private modalService: NgbModal,
    private noteService: NoteService,
  ){ 
    this.modalOptions = { backdrop:'static', backdropClass:'customBackdrop'}
    this.getNotes();
    this.noteService.isNewNote.subscribe(value => {
      if (value) {
        this.getNotes();
      }
    });
    if (typeof window !== "undefined") {
      window.addEventListener('storage', event => {
        this.notes = JSON.parse(event.newValue ?? '') ?? this.getNotes();
      });
    }   
  }

  public getNotes(): Note[] {
    let allNotesInString: string = "";
    if (typeof window !== "undefined") {
      allNotesInString = localStorage.getItem(LOCAL_STORAGE_KEY_CONST) || "";
      if (allNotesInString) {
      this.notes = JSON.parse(allNotesInString);
      return this.notes;
      }
    }
    return [];
  }

  public deleteNote(removedNote?: Note): void {
    this.notes = this.notes.filter(note => note.id !== removedNote?.id);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CONST);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONST, JSON.stringify(this.notes));
  }

  public createOrEditNote(note?: Note): void {
    const modalRef = this.modalService.open(ModalWindowComponent, this.modalOptions);
    modalRef.componentInstance.note = note;
    if (modalRef.closed && note?.message) {
      modalRef.componentInstance.noteEdit = true;
      note.message = modalRef.componentInstance.note.message;
    }
  }
}
