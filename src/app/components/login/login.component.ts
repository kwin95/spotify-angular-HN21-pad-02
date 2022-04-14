import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    let token = this.spotifyService.getUrlParam();
    console.log(token);

    if (!!token) {
      this.spotifyService.defineAccessToken(token);
      this.router.navigate(["/home"]);
    }
  }
  login() {
    window.location.href = this.spotifyService.authozireAccount();
  }
}
