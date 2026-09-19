import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './features/auth/login.component';
import { RegisterPageComponent } from './features/auth/register.component';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';
import { DashboardPageComponent } from './features/dashboard/dashboard.component';
import { AnimalsPageComponent } from './features/animaux/animaux.component';
import { AnimalDetailComponent } from './features/animaux/animal-detail.component';
import { AnimalFormComponent } from './features/animaux/animal-form.component';
import { EspecesPageComponent } from './features/especes/especes.component';
import { RacesPageComponent } from './features/races/races.component';
import { AlimentationPageComponent } from './features/alimentation/alimentation.component';
import { StockPageComponent } from './features/stock/stock.component';
import { SantePageComponent } from './features/sante/sante.component';
import { VaccinationsPageComponent } from './features/vaccinations/vaccinations.component';
import { TraitementsPageComponent } from './features/traitements/traitements.component';
import { ReproductionPageComponent } from './features/reproduction/reproduction.component';
import { NaissancesPageComponent } from './features/naissances/naissances.component';
import { AchatsPageComponent } from './features/achats/achats.component';
import { VentesPageComponent } from './features/ventes/ventes.component';
import { DepensesPageComponent } from './features/depenses/depenses.component';
import { RevenusPageComponent } from './features/revenus/revenus.component';
import { RapportsPageComponent } from './features/rapports/rapports.component';
import { NotificationsPageComponent } from './features/notifications/notifications.component';
import { UtilisateursPageComponent } from './features/utilisateurs/utilisateurs.component';
import { SettingsPageComponent } from './features/parametres/settings.component';
import { EntityFormComponent } from './shared/components/entity-form/entity-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'animaux', component: AnimalsPageComponent },
      { path: 'animaux/nouveau', component: AnimalFormComponent },
      { path: 'animaux/:id', component: AnimalDetailComponent },
      { path: 'animaux/:id/modifier', component: AnimalFormComponent },
      { path: 'especes', component: EspecesPageComponent },
      { path: 'races', component: RacesPageComponent },
      { path: 'alimentation', component: AlimentationPageComponent },
      { path: 'stock', component: StockPageComponent },
      { path: 'sante', component: SantePageComponent },
      { path: 'vaccinations', component: VaccinationsPageComponent },
      { path: 'traitements', component: TraitementsPageComponent },
      { path: 'reproduction', component: ReproductionPageComponent },
      { path: 'naissances', component: NaissancesPageComponent },
      { path: 'achats', component: AchatsPageComponent },
      { path: 'ventes', component: VentesPageComponent },
      { path: 'depenses', component: DepensesPageComponent },
      { path: 'revenus', component: RevenusPageComponent },
      { path: 'rapports', component: RapportsPageComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'utilisateurs', component: UtilisateursPageComponent },
      { path: 'parametres', component: SettingsPageComponent }
      ,{ path: ':resource/nouveau', component: EntityFormComponent }
      ,{ path: ':resource/:id/modifier', component: EntityFormComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
