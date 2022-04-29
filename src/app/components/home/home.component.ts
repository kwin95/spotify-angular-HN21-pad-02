import { Component, OnInit } from "@angular/core";
import { Playlist } from "src/app/model/playlist";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  newRleases: any;
  topLists: any;
  featurePlayLists: any;
  token: string;

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.spotifyService.getNewRealease().then(
      (data) => {
        this.newRleases = data.albums.items;
      },
      function (err) {
        console.error(err);
      }
    );
    this.spotifyService.getTopLists().then(
      (data) => {
        this.topLists = data.playlists.items;
      },
      function (err) {
        console.error(err);
      }
    );

    this.spotifyService.getFeaturePlaylist().then(
      (data) => {
        this.featurePlayLists = data.playlists.items;
      },
      function (err) {
        console.error(err);
      }
    );
  }
}
