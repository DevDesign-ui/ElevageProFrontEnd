export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user?: User;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  enabled?: boolean;
}

export interface Animal {
  id?: number;
  identifiant?: string;
  nom?: string;
  espece?: string;
  race?: string;
  sexe?: string;
  dateNaissance?: string;
  poids?: number;
  couleur?: string;
  dateAcquisition?: string;
  prixAcquisition?: number;
  origine?: string;
  statut?: 'PRESENT' | 'VENDU' | 'DECEDE' | 'TRANSFERE';
  photo?: string;
  description?: string;
}

export interface Espece {
  id?: number;
  nom?: string;
  description?: string;
}

export interface Race {
  id?: number;
  nom?: string;
  especeId?: number;
  especeNom?: string;
}

export interface Aliment {
  id?: number;
  nom?: string;
  type?: string;
  quantiteDisponible?: number;
  unite?: string;
  prix?: number;
  fournisseur?: string;
  seuilAlerte?: number;
  dateExpiration?: string;
}

export interface Stock {
  id?: number;
  alimentId?: number;
  alimentNom?: string;
  quantiteDisponible?: number;
  unite?: string;
  seuilAlerte?: number;
}

export interface Sante {
  id?: number;
  animalId?: number;
  animalNom?: string;
  date?: string;
  maladie?: string;
  symptomes?: string;
  diagnostic?: string;
  traitement?: string;
  veterinaire?: string;
  observation?: string;
  statut?: string;
}

export interface Vaccination {
  id?: number;
  animalId?: number;
  animalNom?: string;
  vaccin?: string;
  date?: string;
  prochaineDate?: string;
  veterinaire?: string;
  observation?: string;
}

export interface Traitement {
  id?: number;
  animalId?: number;
  animalNom?: string;
  medicament?: string;
  dosage?: string;
  frequence?: string;
  dateDebut?: string;
  dateFin?: string;
  veterinaire?: string;
  observation?: string;
}

export interface Reproduction {
  id?: number;
  maleId?: number;
  femelleId?: number;
  dateAccouplement?: string;
  datePrevueMiseBas?: string;
  statut?: 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'ECHEC';
  observation?: string;
}

export interface Naissance {
  id?: number;
  mereId?: number;
  pereId?: number;
  dateNaissance?: string;
  nombrePetits?: number;
  sexe?: string;
  poids?: number;
  observation?: string;
}

export interface Achat {
  id?: number;
  fournisseur?: string;
  date?: string;
  montant?: number;
  description?: string;
  categorie?: string;
}

export interface Vente {
  id?: number;
  animalId?: number;
  animalNom?: string;
  client?: string;
  date?: string;
  prix?: number;
  quantite?: number;
  modePaiement?: string;
  statut?: string;
  observation?: string;
}

export interface Depense {
  id?: number;
  categorie?: string;
  montant?: number;
  date?: string;
  description?: string;
  justificatif?: string;
}

export interface Revenu {
  id?: number;
  type?: string;
  montant?: number;
  date?: string;
  description?: string;
}

export interface NotificationItem {
  id?: number;
  titre?: string;
  message?: string;
  type?: string;
  date?: string;
  lu?: boolean;
}

export interface DashboardStat {
  label: string;
  value: number | string;
  trend?: string;
  color?: string;
  icon?: string;
}

export interface DashboardData {
  totalAnimaux?: number;
  animauxPresent?: number;
  animauxVendus?: number;
  animauxDecedes?: number;
  naissances?: number;
  animauxMalades?: number;
  vaccinationsAVenir?: number;
  stockAliments?: number;
  depenses?: number;
  revenus?: number;
  benefice?: number;
}
