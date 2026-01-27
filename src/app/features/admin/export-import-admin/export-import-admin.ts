import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ExportImportService } from '../../../core/import-export/service/export-import.service';
import { PredictionType } from '../../../core/import-export/models/prediction.type.model';
import { Select } from "primeng/select";
import { PredictionConfigService } from '../../../core/import-export/service/prediction.config.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ElementRef, ViewChild } from '@angular/core';
import { Toast } from "primeng/toast";
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-export-import-admin',
  standalone: true,
  imports: [Select, FormsModule, TooltipModule, Toast],
  templateUrl: './export-import-admin.html',
  styleUrl: './export-import-admin.css',
})
export class ExportImportAdmin implements OnInit {

  exporting = false;
  importing = false;

  
  predictionTypes: PredictionType[] = [];
  selectedPredictionTypeId: string | null = null;
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private exportImportService: ExportImportService,
    private predictionConfigService: PredictionConfigService,
    private messageService: MessageService
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
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to export students surveys.'});
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
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Predictions imported successfully.'});
          this.resetComponent();
        },
        error: (err) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
          this.resetComponent();
        }
      });
  }

  resetComponent(): void {
    this.selectedFile = null;
    this.selectedPredictionTypeId = null;
    this.importing = false;
    this.exporting = false;
    
    this.resetFileInput();
    this.loadPredictionTypes();
  }

  resetFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

}
