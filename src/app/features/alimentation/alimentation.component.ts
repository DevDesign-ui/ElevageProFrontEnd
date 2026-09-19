import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-alimentation-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './alimentation.component.html',
  styleUrl: './alimentation.component.scss'
})
export class AlimentationPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  aliments = [
    { id: 1, nom: 'Maïs', type: 'Céréale', quantiteDisponible: 420, unite: 'kg', fournisseur: 'AgriSénégal', seuilAlerte: 120, dateExpiration: '2026-11-20' },
    { id: 2, nom: 'Tourteau', type: 'Complément', quantiteDisponible: 180, unite: 'kg', fournisseur: 'Sofal', seuilAlerte: 80, dateExpiration: '2026-10-15' }
  ];

  displayedColumns = ['nom', 'type', 'quantiteDisponible', 'fournisseur', 'seuilAlerte', 'actions'];

  ngOnInit(): void {
    this.api.list<any>('aliments').subscribe({ next: (items) => this.aliments = items, error: () => undefined });
  }

  delete(id: number): void {
    this.api.delete('aliments', id).subscribe({
      next: () => this.aliments = this.aliments.filter((aliment) => aliment.id !== id),
      error: () => undefined
    });
  }
}
