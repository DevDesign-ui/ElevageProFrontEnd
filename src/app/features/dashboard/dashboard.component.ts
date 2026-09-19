import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiResourceService } from '../../core/services/api-resource.service';
import { DashboardStat } from '../../core/models/models';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardPageComponent implements OnInit {
  private readonly api = inject(ApiResourceService);
  stats: DashboardStat[] = [
    { label: 'Total animaux', value: 124, icon: 'pets', color: 'primary' },
    { label: 'Animaux présents', value: 98, icon: 'check_circle', color: 'success' },
    { label: 'Animaux vendus', value: 16, icon: 'sell', color: 'accent' },
    { label: 'Animaux décédés', value: 3, icon: 'warning', color: 'warn' },
    { label: 'Naissances', value: 12, icon: 'child_care', color: 'primary' },
    { label: 'Animaux malades', value: 7, icon: 'medical_services', color: 'warn' },
    { label: 'Vaccinations à venir', value: 19, icon: 'vaccines', color: 'accent' },
    { label: 'Stock aliments', value: '320 kg', icon: 'inventory_2', color: 'primary' },
    { label: 'Dépenses', value: '12 450 €', icon: 'payments', color: 'warn' },
    { label: 'Revenus', value: '18 900 €', icon: 'attach_money', color: 'success' },
    { label: 'Bénéfice', value: '6 450 €', icon: 'trending_up', color: 'success' }
  ];

  charts = {
    evolution: [42, 46, 48, 55, 58, 62, 66, 71, 75, 78, 83, 90],
    depenses: [1200, 900, 1100, 1300, 1400, 1270, 1500, 1450, 1600, 1550, 1700, 1800],
    revenus: [1000, 1100, 1250, 1350, 1450, 1500, 1600, 1650, 1750, 1820, 1900, 2100],
    ventes: [3, 5, 7, 6, 8, 9, 7, 10, 11, 9, 12, 15],
    naissances: [1, 2, 1, 3, 2, 4, 3, 2, 2, 4, 3, 5],
    mortalite: [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    alimentation: [22, 25, 24, 31, 35, 30, 36, 33, 38, 40, 41, 44]
  };

  ngOnInit(): void {
    this.api.fetch<any>('dashboard').subscribe({
      next: (data) => this.applyDashboardData(data),
      error: () => undefined
    });
  }

  private applyDashboardData(data: Record<string, number | string>): void {
    const labels: Record<string, string> = {
      totalAnimaux: 'Total animaux', animauxPresent: 'Animaux présents', animauxVendus: 'Animaux vendus',
      animauxDecedes: 'Animaux décédés', naissances: 'Naissances', animauxMalades: 'Animaux malades',
      vaccinationsAVenir: 'Vaccinations à venir', stockAliments: 'Stock aliments', depenses: 'Dépenses',
      revenus: 'Revenus', benefice: 'Bénéfice'
    };
    this.stats = Object.entries(data)
      .filter(([key]) => labels[key])
      .map(([key, value]) => ({ label: labels[key], value, icon: 'analytics', color: 'primary' }));
  }
}
