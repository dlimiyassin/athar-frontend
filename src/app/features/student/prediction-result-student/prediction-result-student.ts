import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { PredictionResult } from '../../../core/import-export/models/prediction.result.model';
import { PredictionResultService } from '../../../core/import-export/service/prediction.service';
import { AuthService } from '../../../zBase/security/service/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-prediction-result-student',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './prediction-result-student.html',
  styleUrl: './prediction-result-student.css'
})
export class PredictionResultStudent implements OnInit {

  predictions: PredictionResult[] = [];
  expandedId: string | null = null;

  constructor(
    private predictionService: PredictionResultService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPredictions();
  }

  loadPredictions(): void {
    this.predictionService.getByAuthenticatedStudent().subscribe({
      next: data => {
        this.predictions = data.sort(
          (a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
        );
      },
      error: err => {
        console.error('Error fetching prediction results:', err);
      }
    });
  }

  toggle(id: string): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  isNew(prediction: PredictionResult): boolean {
    const lastLogin = this.authService.authenticatedUser?.lastLogin;
    return lastLogin
      ? new Date(prediction.generatedAt) > new Date(lastLogin)
      : false;
  }
}
