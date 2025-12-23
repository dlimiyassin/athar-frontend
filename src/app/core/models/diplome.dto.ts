import { Universite } from '../enums/universite.enum';
import { NiveauEtude } from '../enums/niveau-etude.enum';

export class DiplomeDto {
  universite!: Universite | null;;
  ecole!: string;
  niveauEtude!: NiveauEtude  | null;;
  filiere!: string;
  intitule!: string;
  year!: number  | null;;
  note!: number | null;
}
