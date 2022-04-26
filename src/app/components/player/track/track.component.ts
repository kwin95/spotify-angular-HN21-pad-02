import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { Track } from "src/app/model/track";

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
  track: Track;
  trackName: string;
  releaseDate: string;
  trackUrl: string;
  artistName: string;
  timeSong: number;
  isliked: boolean;
  ngOnInit() {
    this.route.params.subscribe((p) => {
      let trackId = p.id;
      this.spotifyService.getTrack(trackId).then((data) => {
        this.track = data;
        console.log(this.track);
      });
      let likeTrack: string[] = [];
      likeTrack.push(trackId);
      this.spotifyService.checkLikedSong(likeTrack).then((data) => {
        this.isliked = data[0];
      });
    });
  }
  // likeThisTrack(id: string, trackName: string) {
  //   console.log(id);
  //   let token = localStorage.getItem("token");
  //   let songId: any = [];
  //   songId.push(id);
  //   this.spotifyService.addLikeSong(songId, token);
  //   this.toastr.success("Added to liked Songs", trackName);
  // }
}
