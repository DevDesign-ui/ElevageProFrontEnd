import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-traitements-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './traitements.component.html',
  styleUrl: './traitements.component.scss'
})
export class TraitementsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  traitements = [
    { animal: 'V-002', traitement: 'Traitement anti-parasitaire', date: '2026-02-12', duree: '7 jours', statut: 'En cours' },
    { animal: 'V-004', traitement: 'Vitamine A', date: '2026-02-10', duree: '3 jours', statut: 'Terminé' }
  ];

  displayedColumns = ['animal', 'traitement', 'date', 'duree', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('traitements').subscribe({ next: (items) => this.traitements = items, error: () => undefined });
  }
}
