import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public isNewNote: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
