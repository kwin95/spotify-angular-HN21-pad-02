import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Artist } from "src/app/model/artist";

import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private spinner: NgxSpinnerService
  ) {}
  followedPlaylists: any = [];
  artists: Artist[] = [];
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    let token = localStorage.getItem("token");
    this.spotifyService.getMyPlaylist(token).then(
      (data) => {
        this.followedPlaylists = data.items;
      },
      function (err) {
        console.error(err);
      }
    );
    this.spotifyService.getArtistFollowed().then((data) => {
      this.artists = data.artists.items;
    });
  }
}
