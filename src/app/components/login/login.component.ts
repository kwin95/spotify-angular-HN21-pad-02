import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SpotifyService } from "src/app/services/spotify.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "../../model/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  isSignUp: boolean = false;
  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    let token = this.authService.getUrlParam();
    if (!!token) {
      this.authService.defineAccessToken(token);
      this.authService.getInforUser().then((data) => {
        if (!data.display_name) {
          localStorage.clear();
          this.router.navigateByUrl("/login");
        } else {
          localStorage.setItem("userId", data.id);
          this.router.navigate(["/player"]);
        }
      });
    }
  }
  login() {
    window.location.href = this.authService.authozireAccount();
  }
}
