import { ToastrService } from "ngx-toastr";
import { Component, Input, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private toastr: ToastrService
  ) {}
  likeCollection: any;
  totalSong: any;
  userName: string;
  listId: any = [];
  isFollow: boolean[] = [];

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
      },
      function (err) {
        console.error(err);
      }
    );
  }
  removeLikeSongs(id: string[], trackName: string) {
    this.toastr.warning("have remove from liked", trackName);
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);

    this.spotifyService.removeLikeSong(songId, token);
    this.getLikedSong();
  }

  checkLikeSong(id: string[]) {
    let songId: any = [];
    songId.push(id);
    this.spotifyService.checkLikedSong(songId).then((data) => {
      this.isFollow.push(data[0]);
    });
    return this.isFollow[0];
  }
}
