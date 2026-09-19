import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-vaccinations-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './vaccinations.component.html',
  styleUrl: './vaccinations.component.scss'
})
export class VaccinationsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  vaccinations = [
    { animal: 'V-003', vaccin: 'Pasteurellose', date: '2026-01-15', prochain: '2026-07-15', statut: 'À jour' },
    { animal: 'V-010', vaccin: 'PPR', date: '2026-02-04', prochain: '2026-08-04', statut: 'Planifié' }
  ];

  displayedColumns = ['animal', 'vaccin', 'date', 'prochain', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('vaccinations').subscribe({ next: (items) => this.vaccinations = items, error: () => undefined });
  }
}
