import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ExportImportService } from '../../../core/import-export/service/export-import.service';
import { PredictionType } from '../../../core/import-export/models/prediction.type.model';
import { Select } from "primeng/select";
import { PredictionConfigService } from '../../../core/import-export/service/prediction.config.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-export-import',
  standalone: true,
  imports: [Select, FormsModule],
  templateUrl: './export-import.html',
  styleUrl: './export-import.css',
})
export class ExportImport implements OnInit {

  exporting = false;
  importing = false;

  selectedFile: File | null = null;

  predictionTypes: PredictionType[] = [];
  selectedPredictionTypeId: string | null = null;

  constructor(
    private exportImportService: ExportImportService,
    private predictionConfigService: PredictionConfigService
  ) {}

  /* =========================
     INIT
     ========================= */
  ngOnInit(): void {
    this.loadPredictionTypes();
  }

  private loadPredictionTypes(): void {
    this.predictionConfigService.getActivePredictionTypes()
      .subscribe({
        next: (types) => {
          this.predictionTypes = types;
          console.log('Loaded prediction types:', types);
          
        },
        error: () => {
          alert('Failed to load prediction types.');
        }
      });
  }

  /* =========================
     EXPORT
     ========================= */
  exportStudentsSurveys(): void {
    this.exporting = true;

    this.exportImportService
      .downloadStudentsSurveysCsv()
      .pipe(finalize(() => this.exporting = false))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');

          a.href = url;
          a.download = 'students_surveys.csv';
          a.click();

          window.URL.revokeObjectURL(url);
        },
        error: () => {
          alert('Failed to export surveys.');
        }
      });
  }

  /* =========================
     IMPORT
     ========================= */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  importFile(): void {
    if (!this.selectedFile || !this.selectedPredictionTypeId) {
      return;
    }

    this.importing = true;

    console.log('selected PredictionTypeId:', this.selectedPredictionTypeId);

    this.exportImportService
      .importPredictionsCsv(
        this.selectedFile,
        this.selectedPredictionTypeId
      )
      .pipe(finalize(() => this.importing = false))
      .subscribe({
        next: () => {
          alert('Predictions imported successfully.');
          this.selectedFile = null;
          this.selectedPredictionTypeId = null;
        },
        error: () => {
          alert('Failed to import predictions.');
        }
      });
  }
}
