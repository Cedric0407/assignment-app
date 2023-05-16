import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Application de gestion de devoirs à rendre';
  userConnected?: any;
  currentRoute = "";
  constructor(public authservice: AuthService, private router: Router, private assigmmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.authservice.getUserConnected().subscribe(user => {
      this.userConnected = user;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });
  }

  logoout(): void {
    this.authservice.logOut();
    this.router.navigate([""])
  }

  isLogged() {
    return this.authservice.loggedIn;
  }

  creerDonneesDeTest() {
    this.assigmmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("Opération terminée, les 1000 données ont été insérées")

        // on refresh la page pour que la liste apparaisse
        // plusieurs manières de faire....
        window.location.reload();
      });
  }
}
