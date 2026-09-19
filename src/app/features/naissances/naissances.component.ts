import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-naissances-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './naissances.component.html',
  styleUrl: './naissances.component.scss'
})
export class NaissancesPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  naissances = [
    { animal: 'V-007', sexe: 'Mâle', date: '2026-02-16', poids: '28 kg', statut: 'Sain' },
    { animal: 'V-009', sexe: 'Femelle', date: '2026-02-21', poids: '26 kg', statut: 'Surveillance' }
  ];

  displayedColumns = ['animal', 'sexe', 'date', 'poids', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('naissances').subscribe({ next: (items) => this.naissances = items, error: () => undefined });
  }
}
