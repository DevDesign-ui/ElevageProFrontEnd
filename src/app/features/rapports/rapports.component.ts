import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-rapports-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './rapports.component.html',
  styleUrl: './rapports.component.scss'
})
export class RapportsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  rapports = [
    { nom: 'Bilan mensuel', periode: 'Février 2026', type: 'Financier', etat: 'Généré' },
    { nom: 'Rapport sanitaire', periode: 'Semestre 1', type: 'Santé', etat: 'En attente' }
  ];

  displayedColumns = ['nom', 'periode', 'type', 'etat'];

  ngOnInit(): void {
    this.api.list<any>('rapports').subscribe({ next: (items) => this.rapports = items, error: () => undefined });
  }
}
