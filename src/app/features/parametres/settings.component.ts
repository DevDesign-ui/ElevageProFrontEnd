import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiResourceService } from '../../core/services/api-resource.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  settings = [
    { label: 'Langue', value: 'Français' },
    { label: 'Devise', value: 'FCFA' },
    { label: 'Zone horaire', value: 'GMT+0' },
    { label: 'Notifications email', value: 'Activées' }
  ];

  ngOnInit(): void {
    this.api.fetch<any[]>('settings').subscribe({
      next: (settings) => this.settings = settings,
      error: () => undefined
    });
  }
}
