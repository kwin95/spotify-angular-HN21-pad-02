import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  newRleases: any;
  categories: any;
  recentlyPlays: any;
  featurePlayLists: any;
  token: string;
  ngOnInit() {
    this.spotifyService.getNewRealease().then(
      (data) => {
        this.newRleases = data.albums.items;
        console.log(this.newRleases);
      },
      function (err) {
        console.error(err);
      }
    );
    this.spotifyService.getCategories().then(
      (data) => {
        this.categories = data.categories.items;
        console.log(this.categories);
      },
      function (err) {
        console.error(err);
      }
    );
    this.token = localStorage.getItem("token");
    this.spotifyService.getRecentlyPlay().then(
      (data) => {
        this.recentlyPlays = data.items;
        console.log(this.recentlyPlays);
      },
      function (err) {
        console.error(err);
      }
    );
    this.spotifyService.getFeaturePlaylist().then(
      (data) => {
        this.featurePlayLists = data.playlists.items;
        console.log(this.featurePlayLists);
      },
      function (err) {
        console.error(err);
      }
    );
  }
}
