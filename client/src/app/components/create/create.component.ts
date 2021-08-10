import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TutorialActions from '../../actions/tutorial.actions';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild('name') nameElement!: ElementRef;
  @ViewChild('url') urlElement!: ElementRef;
  constructor(private store: Store<AppState>) {}

  addTutorial(name: string, url: string) {
    let id = Math.random();
    this.store.dispatch(new TutorialActions.AddTutorial({ name, url, id }));
    this.nameElement.nativeElement.value = '';
    this.urlElement.nativeElement.value = '';
  }

  ngOnInit(): void {}
}
