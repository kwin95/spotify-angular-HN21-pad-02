import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    let token = this.spotifyService.getUrlParam();
    console.log(token);

    if (!!token) {
      this.spotifyService.defineAccessToken(token);
      this.spotifyService.getInforUser().then((data) => {
        if (!data.display_name) {
          localStorage.clear();
          console.log("aaa");

          this.router.navigateByUrl("/login");
        } else {
          this.router.navigate(["/player"]);
        }
      });
    }
  }
  login() {
    window.location.href = this.spotifyService.authozireAccount();
  }
}
