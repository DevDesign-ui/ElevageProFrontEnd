import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';
import { Animal } from '../../core/models/models';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.scss'
})
export class AnimalFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiResourceService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  animalId: number | null = null;

  form = this.fb.group({
    identifiant: ['', Validators.required],
    nom: ['', Validators.required],
    espece: ['', Validators.required],
    race: ['', Validators.required],
    sexe: ['FEMELLE', Validators.required],
    dateNaissance: ['', Validators.required],
    poids: [0, [Validators.required, Validators.min(0)]],
    couleur: ['', Validators.required],
    dateAcquisition: ['', Validators.required],
    prixAcquisition: [0, [Validators.required, Validators.min(0)]],
    origine: ['', Validators.required],
    statut: ['PRESENT', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.animalId = id ? Number(id) : null;
    if (this.animalId) {
      this.api.get<Animal>('animals', this.animalId).subscribe({
        next: (animal) => this.form.patchValue(animal as Partial<Animal>),
        error: () => undefined
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.animalId
      ? this.api.update<Animal>('animals', this.animalId, this.form.getRawValue() as Partial<Animal>)
      : this.api.create<Animal>('animals', this.form.getRawValue() as Partial<Animal>);

    request.subscribe({
      next: () => this.router.navigate(['/animaux']),
      error: () => undefined
    });
  }
}
