import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiResourceService } from '../../../core/services/api-resource.service';

interface EntityField {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'textarea' | 'select';
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface EntityFormConfig {
  title: string;
  resource: string;
  fields: EntityField[];
}

const text = (name: string, label: string, required = true): EntityField => ({ name, label, required });
const number = (name: string, label: string, required = true): EntityField => ({ name, label, type: 'number', required });
const date = (name: string, label: string, required = true): EntityField => ({ name, label, type: 'date', required });
const area = (name: string, label: string): EntityField => ({ name, label, type: 'textarea' });
const select = (name: string, label: string, options: { label: string; value: string }[], required = true): EntityField => ({ name, label, type: 'select', options, required });

const statusOptions = [
  { label: 'Présent', value: 'PRESENT' },
  { label: 'Vendu', value: 'VENDU' },
  { label: 'Décédé', value: 'DECEDE' },
  { label: 'Transféré', value: 'TRANSFERE' }
];

const formConfigs: Record<string, EntityFormConfig> = {
  aliments: { title: 'Aliment', resource: 'aliments', fields: [text('nom', 'Nom'), text('type', 'Type'), number('quantiteDisponible', 'Quantité disponible'), text('unite', 'Unité'), number('prix', 'Prix'), text('fournisseur', 'Fournisseur'), number('seuilAlerte', 'Seuil d’alerte'), date('dateExpiration', 'Date d’expiration', false)] },
  especes: { title: 'Espèce', resource: 'especes', fields: [text('nom', 'Nom'), area('description', 'Description')] },
  races: { title: 'Race', resource: 'races', fields: [text('nom', 'Nom'), number('especeId', 'Identifiant de l’espèce')] },
  sante: { title: 'Suivi de santé', resource: 'sante', fields: [number('animalId', 'Identifiant de l’animal'), date('date', 'Date'), text('maladie', 'Maladie'), area('symptomes', 'Symptômes'), area('diagnostic', 'Diagnostic'), text('veterinaire', 'Vétérinaire', false), area('observation', 'Observation')] },
  vaccinations: { title: 'Vaccination', resource: 'vaccinations', fields: [number('animalId', 'Identifiant de l’animal'), text('vaccin', 'Vaccin'), date('date', 'Date'), date('prochaineDate', 'Prochaine date', false), text('veterinaire', 'Vétérinaire', false), area('observation', 'Observation')] },
  traitements: { title: 'Traitement', resource: 'traitements', fields: [number('animalId', 'Identifiant de l’animal'), text('medicament', 'Médicament'), text('dosage', 'Dosage'), text('frequence', 'Fréquence'), date('dateDebut', 'Date de début'), date('dateFin', 'Date de fin', false), text('veterinaire', 'Vétérinaire', false), area('observation', 'Observation')] },
  reproductions: { title: 'Reproduction', resource: 'reproductions', fields: [number('maleId', 'Identifiant du mâle'), number('femelleId', 'Identifiant de la femelle'), date('dateAccouplement', 'Date d’accouplement'), date('datePrevueMiseBas', 'Mise bas prévue', false), select('statut', 'Statut', [{ label: 'Planifié', value: 'PLANIFIE' }, { label: 'En cours', value: 'EN_COURS' }, { label: 'Terminé', value: 'TERMINE' }, { label: 'Échec', value: 'ECHEC' }]), area('observation', 'Observation')] },
  naissances: { title: 'Naissance', resource: 'naissances', fields: [number('mereId', 'Identifiant de la mère'), number('pereId', 'Identifiant du père', false), date('dateNaissance', 'Date de naissance'), number('nombrePetits', 'Nombre de petits'), text('sexe', 'Sexe', false), number('poids', 'Poids', false), area('observation', 'Observation')] },
  achats: { title: 'Achat', resource: 'achats', fields: [text('fournisseur', 'Fournisseur'), date('date', 'Date'), number('montant', 'Montant'), text('categorie', 'Catégorie'), area('description', 'Description')] },
  ventes: { title: 'Vente', resource: 'ventes', fields: [number('animalId', 'Identifiant de l’animal'), text('client', 'Client'), date('date', 'Date'), number('prix', 'Prix'), number('quantite', 'Quantité', false), select('modePaiement', 'Mode de paiement', [{ label: 'Espèces', value: 'ESPECES' }, { label: 'Virement', value: 'VIREMENT' }, { label: 'Mobile money', value: 'MOBILE_MONEY' }], false), area('observation', 'Observation')] },
  depenses: { title: 'Dépense', resource: 'depenses', fields: [text('categorie', 'Catégorie'), number('montant', 'Montant'), date('date', 'Date'), area('description', 'Description')] },
  revenus: { title: 'Revenu', resource: 'revenus', fields: [text('type', 'Type'), number('montant', 'Montant'), date('date', 'Date'), area('description', 'Description')] },
  users: { title: 'Utilisateur', resource: 'users', fields: [text('firstName', 'Prénom'), text('lastName', 'Nom'), text('username', 'Nom utilisateur'), text('email', 'Email'), select('role', 'Rôle', [{ label: 'Administrateur', value: 'ADMIN' }, { label: 'Gestionnaire', value: 'GESTIONNAIRE' }, { label: 'Vétérinaire', value: 'VETERINAIRE' }]), select('enabled', 'Statut', [{ label: 'Actif', value: 'true' }, { label: 'Inactif', value: 'false' }])] }
};

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.scss'
})
export class EntityFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiResourceService);

  readonly form = this.fb.group<Record<string, any>>({});
  config!: EntityFormConfig;
  id: number | null = null;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    const resource = this.route.snapshot.paramMap.get('resource') ?? '';
    this.config = formConfigs[resource] ?? formConfigs['aliments'];
    this.config.fields.forEach((field) => {
      this.form.addControl(field.name, this.fb.control('', field.required ? Validators.required : []));
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id ? Number(id) : null;
    if (this.id) {
      this.loading = true;
      this.api.get<Record<string, unknown>>(this.config.resource, this.id).subscribe({
        next: (entity) => this.form.patchValue(entity),
        error: () => undefined,
        complete: () => this.loading = false
      });
    }
  }

  save(): void {
    this.submitted = true;
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const request = this.id
      ? this.api.update(this.config.resource, this.id, this.form.getRawValue())
      : this.api.create(this.config.resource, this.form.getRawValue());
    request.subscribe({
      next: () => this.router.navigate([this.listRoute]),
      error: () => this.loading = false
    });
  }

  get listRoute(): string {
    const route = this.config?.resource === 'users' ? 'utilisateurs' : this.config?.resource === 'aliments' ? 'alimentation' : this.config?.resource;
    return `/${route}`;
  }
}
