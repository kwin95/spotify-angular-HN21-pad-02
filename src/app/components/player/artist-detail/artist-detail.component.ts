import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-artist-detail",
  templateUrl: "./artist-detail.component.html",
  styleUrls: ["./artist-detail.component.scss"],
})
export class ArtistDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}
  artist: any;
  artistUrl: string;
  artistName: string;
  artistFollow: number;
  trackOfArtist: any;
  ngOnInit() {
    this.route.params.subscribe((p) => {
      let artistId = p.id;
      this.spotifyService.getArtist(artistId).then(
        (data) => {
          this.artist = data;
          this.artistUrl = data.images[1].url;
          this.artistName = data.name;
          this.artistFollow = data.followers.total;
          console.log(this.artist);
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getArtistTopTrack(artistId).then(
        (data) => {
          this.trackOfArtist = data.tracks;
          console.log(this.trackOfArtist);
        },
        function (err) {
          console.error(err);
        }
      );
    });
  }
}
