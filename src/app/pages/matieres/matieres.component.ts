import { Component } from '@angular/core';
import { Matiere } from 'src/app/model/matiere';
import {
  MatieresService
} from 'src/app/shared/services/matieres.service';
@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent {
  matieres!: Matiere[];
  displayedColumns: string[] = ['imagePath', 'nom', 'professeur'];

  constructor(
    public matieresService: MatieresService,
  ) { }

  ngOnInit() {
    this.matieresService.getMatieres().subscribe(response => {
      this.matieres = response;
    })
  }
}
