import {  Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { routerTransition } from '../core/_configs/router-transition.config';
import { MonthlyReportService } from './monthly-report.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MonthlyReportComponent implements OnInit {
  columnNames = ['Mês', 'Entrada', 'Saída'];
  month: string;
  options: {
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    }
  };
  reports: any = [
      ['Germany', 10, 20],
      ['USA', 10, 20],
      ['Brazil', 10, 20],
      ['Canada', 10, 20]
  ];

  sub: any;
  year: string;

  constructor(
    private _reportService: MonthlyReportService,
    private activeRoute: ActivatedRoute
  ) { }

  getReports(month, year): void {
    this._reportService.getByMonthAndYear(month, year).subscribe(
      data => {
        // this.reports = data;
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe(params => {
      this.month = params['month'];
      this.year = params['year'];
      this.getReports(this.month, this.year);
    });
  }
}
