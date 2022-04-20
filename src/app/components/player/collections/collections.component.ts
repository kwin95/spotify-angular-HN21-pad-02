import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}
  likeCollection: any;
  totalSong: any;
  userName: string;
  ngOnInit() {
    this.spotifyService.getInforUser().then((data) => {
      this.userName = data.display_name;
    });
    this.getLikedSong();
  }
  getLikedSong() {
    this.spotifyService.getLikedSong().then(
      (data) => {
        this.likeCollection = data.items;
        this.totalSong = data.items.length;

        console.log(this.likeCollection);
      },
      function (err) {
        console.error(err);
      }
    );
  }
  removeLikeSongs(id: string[]) {
    console.log(id);
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);
    this.spotifyService.removeLikeSong(songId, token);
    this.getLikedSong();
  }

  checkLikeSong(id: string) {
    let songId: any = [];
    songId.push(id);
    this.spotifyService.checkLikedSong(songId).then(
      (data) => {},
      function (err) {
        console.error(err);
      }
    );
  }
}
