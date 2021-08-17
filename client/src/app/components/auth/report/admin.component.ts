import { getReportAllTodoPending } from './../../../store/actions/report.action';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITutorial } from '../../../interface/todo.interface';
import { AppState } from '../../../store/app.state';
import { reportSelector } from './../../../store/selectors/report.selector';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class ReportComponent implements OnInit {
  tutorials$: Observable<ITutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials$ = store.pipe(select(reportSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(getReportAllTodoPending());
  }
}
