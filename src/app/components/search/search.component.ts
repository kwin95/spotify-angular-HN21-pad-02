import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  queryString: string;
  constructor(private spotifyService: SpotifyService) {}
  resultArtists: any;
  resultPlaylists: any;
  resultAlbums: any;
  resultTracks: any;
  ngOnInit() {}
  search() {
    this.spotifyService.search(this.queryString).then(
      (data) => {
        this.resultArtists = data.artists.items;
        this.resultPlaylists = data.playlists.items;
        this.resultAlbums = data.albums.items;
        this.resultTracks = data.tracks.items;
      },
      function (err) {
        console.error(err);
      }
    );
  }
  clear() {
    this.queryString = null;
  }
}
