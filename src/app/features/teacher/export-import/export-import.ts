import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ExportImportService } from '../../../core/services/export-import.service';

@Component({
  selector: 'app-export-import',
  standalone: true,
  imports: [],
  templateUrl: './export-import.html',
  styleUrl: './export-import.css',
})
export class ExportImport {

  exporting = false;
  importing = false;

  selectedFile: File | null = null;

  constructor(
    private exportImportService: ExportImportService
  ) {}

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
     IMPORT (UI ONLY FOR NOW)
     ========================= */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  importFile(): void {
    if (!this.selectedFile) {
      return;
    }

    // Backend logic will be added later
    alert('Import logic will be implemented later.');
  }
}
