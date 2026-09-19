import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  notifications = [
    { titre: 'Stock d’aliment faible', date: '2026-02-22', niveau: 'Important' },
    { titre: 'Vaccination prévue', date: '2026-02-24', niveau: 'Info' }
  ];

  displayedColumns = ['titre', 'date', 'niveau'];

  ngOnInit(): void {
    this.api.list<any>('notifications').subscribe({ next: (items) => this.notifications = items, error: () => undefined });
  }
}
