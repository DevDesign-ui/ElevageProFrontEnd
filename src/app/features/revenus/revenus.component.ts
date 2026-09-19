import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-revenus-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './revenus.component.html',
  styleUrl: './revenus.component.scss'
})
export class RevenusPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  revenus = [
    { source: 'Ventes bovins', montant: 2350000, date: '2026-02-14', statut: 'Validé' },
    { source: 'Vente lait', montant: 940000, date: '2026-02-19', statut: 'En attente' }
  ];

  displayedColumns = ['source', 'montant', 'date', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('revenus').subscribe({ next: (items) => this.revenus = items, error: () => undefined });
  }
}
