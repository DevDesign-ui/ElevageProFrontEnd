import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-sante-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './sante.component.html',
  styleUrl: './sante.component.scss'
})
export class SantePageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  items = [
    { animal: 'V-001', type: 'Contrôle annuel', date: '2026-02-10', statut: 'OK' },
    { animal: 'V-008', type: 'Évaluation placentaire', date: '2026-02-18', statut: 'À surveiller' },
    { animal: 'V-014', type: 'Suivi reproductif', date: '2026-03-02', statut: 'OK' }
  ];

  displayedColumns = ['animal', 'type', 'date', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('sante').subscribe({ next: (items) => this.items = items, error: () => undefined });
  }
}
