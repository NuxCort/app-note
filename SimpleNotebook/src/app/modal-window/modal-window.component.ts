import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Note, NoteBase } from '../models/note.model';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject, toArray } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html'
})

export class ModalWindowComponent {
  
  public modalOptions?: NgbModalOptions;
  public LOCAL_STORAGE_KEY_CONST = "note";
  @Input() public message?: string;
  @ViewChild('inputMessage') public inputMessage?: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private noteService: NoteService
    ){}

  public createNote(): void {
    if (!this.inputMessage) { return; }
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentSeconds = new Date().getSeconds();
    const createdOn = `${currentHour}:${currentMinute}:${currentSeconds}`;
    const note: Note = {
      id: (Math.floor(Math.random() * 98) + 2).toString(),
      message: this.inputMessage.nativeElement.value,
      createdOn: createdOn
    }

    let existNotes = localStorage.getItem(this.LOCAL_STORAGE_KEY_CONST) || '';
    let notes: Note[] = [];

    if (existNotes) {
      notes = JSON.parse(existNotes);
    }

    notes.push(note);
    localStorage.setItem(this.LOCAL_STORAGE_KEY_CONST, JSON.stringify(notes));
    this.noteService.isNewNote.next(true);
    this.inputMessage.nativeElement.value = null;
  }
}

