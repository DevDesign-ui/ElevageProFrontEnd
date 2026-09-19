import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-achats-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.scss'
})
export class AchatsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  achats = [
    { fournisseur: 'AgriSénégal', reference: 'A-1201', montant: 1250000, date: '2026-02-01', statut: 'Payé' },
    { fournisseur: 'Sofal', reference: 'A-1207', montant: 760000, date: '2026-02-18', statut: 'En attente' }
  ];

  displayedColumns = ['fournisseur', 'reference', 'montant', 'date', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('achats').subscribe({ next: (items) => this.achats = items, error: () => undefined });
  }
}
