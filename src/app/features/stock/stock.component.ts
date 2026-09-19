import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  stocks = [
    { aliment: 'Maïs', disponible: 420, seuil: 120, unite: 'kg', statut: 'OK' },
    { aliment: 'Tourteau', disponible: 80, seuil: 120, unite: 'kg', statut: 'ALERTE' },
    { aliment: 'Coton', disponible: 50, seuil: 60, unite: 'kg', statut: 'ALERTE' }
  ];

  displayedColumns = ['aliment', 'disponible', 'seuil', 'statut'];

  ngOnInit(): void {
    this.api.list<any>('stocks').subscribe({ next: (items) => this.stocks = items, error: () => undefined });
  }
}
