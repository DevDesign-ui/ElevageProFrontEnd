import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-reproduction-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './reproduction.component.html',
  styleUrl: './reproduction.component.scss'
})
export class ReproductionPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  cycles = [
    { animal: 'V-006', type: 'Saillie', date: '2026-02-05', etat: 'En cours', dureeEstimee: '21 jours' },
    { animal: 'V-012', type: 'Mise bas prévue', date: '2026-03-18', etat: 'Prévision', dureeEstimee: '145 jours' }
  ];

  displayedColumns = ['animal', 'type', 'date', 'etat', 'dureeEstimee'];

  ngOnInit(): void {
    this.api.list<any>('reproductions').subscribe({ next: (items) => this.cycles = items, error: () => undefined });
  }
}
