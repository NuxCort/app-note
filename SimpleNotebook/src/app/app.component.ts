import { Component } from '@angular/core';
import { NoteListComponent } from './note-list/note-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [NoteListComponent]
})
export class AppComponent {
}
