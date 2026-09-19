import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-ventes-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './ventes.component.html',
  styleUrl: './ventes.component.scss'
})
export class VentesPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  ventes = [
    { client: 'M. Diop', reference: 'V-3001', montant: 2350000, date: '2026-02-14', statut: 'Payé' },
    { client: 'Coopérative Nioro', reference: 'V-3008', montant: 860000, date: '2026-02-20', statut: 'Livraison' }
  ];

  displayedColumns = ['client', 'reference', 'montant', 'date', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('ventes').subscribe({ next: (items) => this.ventes = items, error: () => undefined });
  }
}
