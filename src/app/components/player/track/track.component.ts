import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-track",
  templateUrl: "./track.component.html",
  styleUrls: ["./track.component.scss"],
})
export class TrackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}
  track: any;
  trackName: string;
  releaseDate: string;
  trackUrl: string;
  artistName: string;
  timeSong: number;
  ngOnInit() {
    this.route.params.subscribe((p) => {
      let trackId = p.id;
      this.spotifyService.getTrack(trackId).then((data) => {
        this.track = data;
        this.trackUrl = data.album.images[1].url;
        this.trackName = data.name;
        this.artistName = data.artists[0].name;
        this.timeSong = data.duration_ms;
        this.releaseDate = data.album["release_date"];

        console.log(this.track);
      });
    });
  }
}
