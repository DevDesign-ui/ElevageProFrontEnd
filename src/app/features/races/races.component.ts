import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-races-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './races.component.html',
  styleUrl: './races.component.scss'
})
export class RacesPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  races = [
    { id: 1, nom: 'Zébu', espece: 'Bovin' },
    { id: 2, nom: 'Taurin', espece: 'Bovin' },
    { id: 3, nom: 'Peul-Peul', espece: 'Ovin' },
    { id: 4, nom: 'Chèvre locale', espece: 'Caprin' }
  ];

  displayedColumns = ['nom', 'espece', 'actions'];

  ngOnInit(): void {
    this.api.list<any>('races').subscribe({ next: (items) => this.races = items, error: () => undefined });
  }

  delete(id: number): void {
    this.api.delete('races', id).subscribe({
      next: () => this.races = this.races.filter((item) => item.id !== id),
      error: () => undefined
    });
  }
}
