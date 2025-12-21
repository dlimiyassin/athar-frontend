import { Universite } from '../enums/universite.enum';
import { NiveauEtude } from '../enums/niveau-etude.enum';

export interface DiplomeDto {
  universite: Universite;
  ecole: string;
  niveauEtude: NiveauEtude;
  filiere: string;
  intitule: string;
  year: number;
  note: number;
}
