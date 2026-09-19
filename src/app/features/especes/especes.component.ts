import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-especes-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './especes.component.html',
  styleUrl: './especes.component.scss'
})
export class EspecesPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  especes = [
    { id: 1, nom: 'Bovin', description: 'Bovins de production et de reproduction' },
    { id: 2, nom: 'Ovin', description: 'Ovins de viande et de lait' },
    { id: 3, nom: 'Caprin', description: 'Caprins de race locale et améliorée' }
  ];

  displayedColumns = ['nom', 'description', 'actions'];

  ngOnInit(): void {
    this.api.list<any>('especes').subscribe({ next: (items) => this.especes = items, error: () => undefined });
  }

  delete(id: number): void {
    this.api.delete('especes', id).subscribe({
      next: () => this.especes = this.especes.filter((item) => item.id !== id),
      error: () => undefined
    });
  }
}
