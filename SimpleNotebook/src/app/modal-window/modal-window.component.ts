import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../models/note.model';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NoteService } from '../services/note.service';
import moment from 'moment';
import { LOCAL_STORAGE_KEY_CONST } from '../global-constants';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule]
})

export class ModalWindowComponent implements OnInit {
  
  public modalOptions?: NgbModalOptions;
  public message?: string;
  public noteEdit: boolean = false;
  @Input() public note?: Note;
  @ViewChild('inputMessage') public inputMessage?: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private noteService: NoteService,
    ){}

  public ngOnInit(): void {
    if (this.note?.message) {
      this.message = this.note.message;
    }
  }

  public createNote(): void {
    if (!this.inputMessage?.nativeElement.value) { return; }
    const dayOfCreated = new Date().getDay();
    const month = new Date().toLocaleString('default', { month: 'long' });
    const dayAndMinuts = moment(new Date()).format("HH:mm");
    const createdOn = `${dayAndMinuts}, ${month} ${dayOfCreated}`;
    let notes: Note[] = [];
    const note: Note = {
          id: (Math.floor(Math.random() * 98) + 2).toString(),
          message: this.inputMessage.nativeElement.value,
          createdOn: createdOn
        }
    let existNotes = localStorage.getItem(LOCAL_STORAGE_KEY_CONST) || '';
    if (existNotes) {
      notes = JSON.parse(existNotes);
    }
    notes.push(note);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONST, JSON.stringify(notes));
    this.noteService.isNewNote.next(true);
    this.inputMessage.nativeElement.value = null;
  }

  public save(): void {
    if (!this.inputMessage?.nativeElement.value) {return;}
    if (this.noteEdit && this.note?.message) {
      this.note.message = this.inputMessage?.nativeElement.value;
    }
  }
}

