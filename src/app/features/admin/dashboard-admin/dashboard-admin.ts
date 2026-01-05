import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../layout/service/layout.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    FluidModule,
    TableModule
  ],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin implements OnInit, OnDestroy {

  subscription!: Subscription;

  /* =========================
     KPI CARDS
     ========================= */
  kpis = [
    { label: 'Total Students', value: 1246, icon: 'pi pi-users' },
    { label: 'Teachers', value: 38, icon: 'pi pi-briefcase' },
    { label: 'Surveys', value: 64, icon: 'pi pi-file' },
    { label: 'AI Predictions', value: 3120, icon: 'pi pi-bolt' }
  ];

  /* =========================
     TABLES
     ========================= */
  recentImports = [
    { file: 'survey_export_01.csv', type: 'Grade Prediction', status: 'SUCCESS', rows: 420 },
    { file: 'survey_export_02.csv', type: 'Job Potential', status: 'SUCCESS', rows: 310 },
    { file: 'survey_export_03.csv', type: 'Field of Study', status: 'FAILED', rows: 0 }
  ];

  recentTeachers = [
    { name: 'Ahmed Hachimi', surveys: 12, lastActive: '2h ago' },
    { name: 'Sara El Fassi', surveys: 8, lastActive: '1d ago' },
    { name: 'Mohamed Benali', surveys: 5, lastActive: '3d ago' }
  ];

  /* =========================
     CHARTS
     ========================= */
  predictionTypeData: any;
  predictionTypeOptions: any;

  fieldTrendData: any;
  fieldTrendOptions: any;

  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => this.initCharts());
  }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-color');
    const borderColor = style.getPropertyValue('--surface-border');

    /* ---------------- Prediction types distribution ---------------- */
    this.predictionTypeData = {
      labels: ['Grade', 'Job Potential', 'Field of Study'],
      datasets: [
        {
          data: [45, 30, 25],
          backgroundColor: [
            style.getPropertyValue('--p-blue-500'),
            style.getPropertyValue('--p-green-500'),
            style.getPropertyValue('--p-orange-500')
          ]
        }
      ]
    };

    this.predictionTypeOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor }
        }
      }
    };

    /* ---------------- Field of study trends ---------------- */
    this.fieldTrendData = {
      labels: [
        'Computer Science',
        'AI',
        'Data Science',
        'Engineering',
        'Business'
      ],
      datasets: [
        {
          label: 'Predicted Students',
          data: [420, 310, 260, 190, 140],
          backgroundColor: style.getPropertyValue('--p-primary-500')
        }
      ]
    };

    this.fieldTrendOptions = {
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: { ticks: { color: textColor } },
        y: { ticks: { color: textColor }, grid: { color: borderColor } }
      }
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
