import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  myPlaylists: any;
  token: string;
  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.spotifyService.getMyPlaylist(this.token).then(
      (data) => {
        this.myPlaylists = data.items;
        console.log(this.myPlaylists);
      },
      function (err) {
        console.error(err);
      }
    );
  }
}
