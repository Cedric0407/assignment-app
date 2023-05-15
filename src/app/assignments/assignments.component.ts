import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit{
  titre = "Liste des devoirs";
  assignments = [
    {
      nom: "DEvoir de mr Buffa",
      dateDeRendu: "2023-05-15",
      rendu: false
    },
    {
      nom: "DEvoir de mr Galli",
      dateDeRendu: "2023-02-15",
      rendu: true
    },
    {
      nom: "DEvoir de mr Mopolo",
      dateDeRendu: "2023-02-15",
      rendu: true
    },
    
  ]

  nomDevoir = "";

  ajoutActive = false;

  ngOnInit():void{
    setTimeout(()=> {
      this.ajoutActive = true;
    }, 3000)
  }

  onSubmit(event:any):void{
    console.log(event)
  }

}
