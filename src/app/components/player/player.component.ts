import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SpotifyService } from "src/app/services/spotify.service";
import { Option } from "../player/dropdown-menu/dropdown-menu.component";
@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  options: Option[] = [
    {
      name: "Account Infor",
      value: 1,
    },
    {
      name: "Logout",
      value: 2,
    },
  ];
  constructor(private spotifyService: SpotifyService, private router: Router) {}
  userInfo: any;
  ngOnInit() {
    let token = localStorage.getItem("token");
    this.spotifyService.defineAccessToken(token);
    this.spotifyService
      .getInforUser()
      .then(
        (data) => {
          console.log(data);

          this.userInfo = data.display_name;
          return data;
        },
        function (err) {
          console.error(err);
        }
      )
      .then((data) => {
        let id = data["id"];

        // this.spotifyService.getRecent( id);
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
  onSelect(value) {
    if (value === 2) {
      this.logout();
    }
  }
}
