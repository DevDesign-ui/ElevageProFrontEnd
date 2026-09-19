import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly navItems = [
    { label: 'Tableau de bord', icon: 'home', route: '/dashboard' },
    { label: 'Animaux', icon: 'pets', route: '/animaux' },
    { label: 'Espèces', icon: 'category', route: '/especes' },
    { label: 'Races', icon: 'emoji_nature', route: '/races' },
    { label: 'Alimentation', icon: 'restaurant', route: '/alimentation' },
    { label: 'Stock', icon: 'inventory_2', route: '/stock' },
    { label: 'Santé', icon: 'medical_services', route: '/sante' },
    { label: 'Vaccinations', icon: 'vaccines', route: '/vaccinations' },
    { label: 'Traitements', icon: 'healing', route: '/traitements' },
    { label: 'Reproduction', icon: 'pregnant_woman', route: '/reproduction' },
    { label: 'Naissances', icon: 'child_care', route: '/naissances' },
    { label: 'Achats', icon: 'shopping_cart', route: '/achats' },
    { label: 'Ventes', icon: 'sell', route: '/ventes' },
    { label: 'Dépenses', icon: 'payments', route: '/depenses' },
    { label: 'Revenus', icon: 'attach_money', route: '/revenus' },
    { label: 'Rapports', icon: 'assessment', route: '/rapports' },
    { label: 'Notifications', icon: 'notifications', route: '/notifications' },
    { label: 'Utilisateurs', icon: 'group', route: '/utilisateurs' },
    { label: 'Paramètres', icon: 'settings', route: '/parametres' }
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
