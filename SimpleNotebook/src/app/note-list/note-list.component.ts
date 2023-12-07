import { Component, ElementRef, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Note, NoteBase } from '../models/note.model';
import { EventEmitter } from 'stream';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  public notes: Note[] = [];
  public modalOptions?: NgbModalOptions;
  public readonly LOCAL_STORAGE_KEY_CONST: string = "note";

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ){ 
    this.modalOptions = { backdrop:'static', backdropClass:'customBackdrop'}
    this.getNotes();
   }

  public getNotes(): void {
    let allNotesInString: string = "";
    if (typeof window !== "undefined") {
      allNotesInString = localStorage.getItem(this.LOCAL_STORAGE_KEY_CONST) || "";
      if (allNotesInString) {
      this.notes = JSON.parse(allNotesInString);
      }
    }
  }

  public deleteNote(removedNote?: Note) {
    this.notes = this.notes.filter(note => note.id !== removedNote?.id);
    console.log(this.notes);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY_CONST);
    localStorage.setItem(this.LOCAL_STORAGE_KEY_CONST, JSON.stringify(this.notes));
  }

  public openCreateDialog(note?: Note) {
    const modalRef = this.modalService.open(ModalWindowComponent, this.modalOptions);
    modalRef.componentInstance.message = note?.message;
  }

  public sortOfMessage() {
    this.notes?.sort((a, b) => {
      if (a.message < b.message) {
        return -1;
      } else if (a.message > b.message) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public sortOfDate() {
    this.notes?.sort((a, b) => {
      if (a.createdOn < b.createdOn) {
        return -1;
      } else if (a.createdOn > b.createdOn) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
