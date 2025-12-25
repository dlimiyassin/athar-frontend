import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../layout/service/layout.service';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-dashboard-teacher',
  standalone: true,
  imports: [CommonModule, ChartModule, FluidModule, TableModule],
  templateUrl: './dashboard-teacher.html',
  styleUrl: './dashboard-teacher.css',
})
export class DashboardTeacher implements OnInit, OnDestroy {

  // KPI values (mocked – later from API)
  totalSurveys = 12;
  activeSurveys = 5;
  totalResponses = 342;
  avgCompletionRate = 78;

  responsesLineData: any;
  surveyBarData: any;
  questionTypePieData: any;

  lineOptions: any;
  barOptions: any;
  pieOptions: any;

  subscription: Subscription;

kpis = [
  { label: 'My Surveys', value: 8, icon: 'pi pi-file' },
  { label: 'Total Responses', value: 463, icon: 'pi pi-chart-bar' },
  { label: 'Active Surveys', value: 3, icon: 'pi pi-bolt' },
  { label: 'Avg Satisfaction', value: '78%', icon: 'pi pi-star' }
];


mySurveys = [
  { title: 'Student Engagement', target: 'Students', responses: 76 },
  { title: 'Course Feedback', target: 'Students', responses: 42 },
  { title: 'Teaching Methods', target: 'Students', responses: 18 }
];


recentStudents = [
  { name: 'Yassine El Amrani', email: 'y.elamrani@...', answers: 27 },
  { name: 'Sofia Boukhari', email: 's.boukhari@...', answers: 24 },
  { name: 'Abdelhak Khaini', email: 'a.khaini@...', answers: 38 }
];

engagementData = {
  labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
  datasets: [
    {
      label: 'Responses',
      data: [43, 76, 34, 18, 12],
      backgroundColor: [
        '#22c55e',
        '#4ade80',
        '#facc15',
        '#fb7185',
        '#ef4444'
      ]
    }
  ]
};

engagementOptions = {
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};


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
    const textColorSecondary = style.getPropertyValue('--text-color-secondary');
    const borderColor = style.getPropertyValue('--surface-border');
    const primary = style.getPropertyValue('--p-primary-500');

    /* ---------------- Responses over time ---------------- */
    this.responsesLineData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Responses',
          data: [45, 89, 120, 88],
          borderColor: primary,
          backgroundColor: primary,
          tension: 0.4,
          fill: false
        }
      ]
    };

    this.lineOptions = {
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary } },
        y: { ticks: { color: textColorSecondary }, grid: { color: borderColor } }
      }
    };

    /* ---------------- Responses per survey ---------------- */
    this.surveyBarData = {
      labels: ['Survey A', 'Survey B', 'Survey C', 'Survey D'],
      datasets: [
        {
          label: 'Responses',
          data: [120, 90, 70, 62],
          backgroundColor: primary
        }
      ]
    };

    this.barOptions = {
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColorSecondary } },
        y: { ticks: { color: textColorSecondary }, grid: { color: borderColor } }
      }
    };

    /* ---------------- Question types distribution ---------------- */
    this.questionTypePieData = {
      labels: ['Text', 'Choice', 'Scale'],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: [
            style.getPropertyValue('--p-blue-500'),
            style.getPropertyValue('--p-green-500'),
            style.getPropertyValue('--p-orange-500')
          ]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor }
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
