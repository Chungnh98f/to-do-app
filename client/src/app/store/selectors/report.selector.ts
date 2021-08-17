import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IReportState } from './../../interface/report.interface';

export const reportSelector = createSelector(
  (state: AppState) => state.report,
  (report: IReportState) => report.todos
);
