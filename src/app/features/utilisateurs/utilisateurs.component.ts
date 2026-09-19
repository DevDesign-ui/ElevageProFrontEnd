import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-utilisateurs-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.scss'
})
export class UtilisateursPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  users = [
    { nom: 'Mamadou Diop', role: 'Gestionnaire', email: 'mamadou@eleveurpro.sn', actif: true },
    { nom: 'Awa Ndao', role: 'Vétérinaire', email: 'awa@eleveurpro.sn', actif: false }
  ];

  displayedColumns = ['nom', 'role', 'email', 'actif'];

  ngOnInit(): void {
    this.api.list<any>('users').subscribe({ next: (items) => this.users = items, error: () => undefined });
  }
}
