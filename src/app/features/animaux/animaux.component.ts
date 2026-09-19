import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';
import { Animal } from '../../core/models/models';

@Component({
  selector: 'app-animaux-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './animaux.component.html',
  styleUrl: './animaux.component.scss'
})
export class AnimalsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);

  animals: Animal[] = [
    { id: 1, identifiant: 'A-001', nom: 'Mélina', espece: 'Bovin', race: 'Zébu', sexe: 'Femelle', statut: 'PRESENT' },
    { id: 2, identifiant: 'A-002', nom: 'Boubou', espece: 'Ovin', race: 'Peul', sexe: 'Mâle', statut: 'VENDU' },
    { id: 3, identifiant: 'A-003', nom: 'Coco', espece: 'Caprin', race: 'Chèvre locale', sexe: 'Femelle', statut: 'DECEDE' }
  ];

  displayedColumns = ['identifiant', 'nom', 'espece', 'race', 'sexe', 'statut', 'actions'];

  ngOnInit(): void {
    this.api.list<Animal>('animals').subscribe({
      next: (animals) => this.animals = animals,
      error: () => undefined
    });
  }

  delete(id: number): void {
    this.api.delete('animals', id).subscribe({
      next: () => this.animals = this.animals.filter((animal) => animal.id !== id),
      error: () => undefined
    });
  }
}
