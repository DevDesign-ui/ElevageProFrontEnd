import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-depenses-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './depenses.component.html',
  styleUrl: './depenses.component.scss'
})
export class DepensesPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  depenses = [
    { categorie: 'Carburant', libelle: 'Essence tracteur', montant: 185000, date: '2026-02-09', statut: 'Payé' },
    { categorie: 'Vétérinaire', libelle: 'Consultation', montant: 64000, date: '2026-02-15', statut: 'En attente' }
  ];

  displayedColumns = ['categorie', 'libelle', 'montant', 'date', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('depenses').subscribe({ next: (items) => this.depenses = items, error: () => undefined });
  }
}
