import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';
import { Animal } from '../../core/models/models';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './animal-detail.component.html',
  styleUrl: './animal-detail.component.scss'
})
export class AnimalDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiResourceService);

  animal = {
    id: 1,
    identifiant: 'A-001',
    nom: 'Mélina',
    espece: 'Bovin',
    race: 'Zébu',
    sexe: 'Femelle',
    dateNaissance: '2023-02-14',
    poids: 420,
    couleur: 'Brun',
    dateAcquisition: '2024-01-12',
    prixAcquisition: 800,
    origine: 'Élevage voisin',
    statut: 'PRESENT',
    description: 'Animal robuste, très productive.'
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.get<Animal>('animals', id).subscribe({
        next: (animal) => this.animal = { ...this.animal, ...animal },
        error: () => undefined
      });
    }
  }
}
