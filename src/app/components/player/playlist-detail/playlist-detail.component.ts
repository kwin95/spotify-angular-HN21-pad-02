import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";
import { NavBarComponent } from "../../nav-bar/nav-bar.component";

@Component({
  selector: "app-playlist-detail",
  templateUrl: "./playlist-detail.component.html",
  styleUrls: ["./playlist-detail.component.scss"],
})
export class PlaylistDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private checkPlayList: NavBarComponent
  ) {}
  coverImg: any;
  isFollow: any;
  playlist: any = [];
  playlistType: string;
  playlistName: string;
  playlistDesc: string;
  playlistFollow: number;
  totalSong: number;
  type: string;
  tracks: any;
  bgImage: string = "";
  ngOnInit() {
    let token = localStorage.getItem("token");
    this.spotifyService.defineAccessToken(token);
    this.route.params.subscribe((p) => {
      let id = p.id;
      this.spotifyService.getPlaylistbyId(id).then(
        (data) => {
          this.playlist = data;
          this.playlistType = data.type;
          this.playlistName = data.name;
          this.playlistDesc = data.description;
          this.playlistFollow = data.followers.total;
          this.totalSong = data.tracks.items.length;
          console.log(this.playlist);
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getPlaylistCoverImg(id).then(
        (data) => {
          this.coverImg = data;
          if (data.length === 0) {
            this.bgImage = "../../../../assets/Music.jpg";
          } else {
            this.bgImage = data[0]["url"];
          }

          console.log(data);
        },
        function (err) {
          console.error(err);
        }
      );
      this.spotifyService.getPlayListTrack(id).then(
        (data) => {
          this.tracks = data.items;
          console.log(this.tracks);
        },
        function (err) {
          console.error(err);
        }
      );
    });
    this.checkFollowPlaylist();
  }
  followPlaylist(id: string) {
    this.spotifyService.followPlaylist(id);
    this.checkFollowPlaylist();
  }
  unfollowPlaylist(id: string) {
    this.spotifyService.unfollowPlaylist(id);
    this.checkFollowPlaylist();
  }
  addLikeTracks(id: string[]) {
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);
    return this.spotifyService.addLikeSong(songId, token);
  }
  checkFollowPlaylist() {
    this.route.params.subscribe((p) => {
      let id = p.id;
      this.spotifyService.getInforUser().then(
        (data) => {
          let userId: any = [];
          userId.push(data.id);
          this.spotifyService.checkPlaylistFollow(id, userId).then((data) => {
            {
              this.isFollow = data[0];
            }
          });
        },
        function (err) {
          console.error(err);
        }
      );
    });
  }
  likeThisTrack(id: string) {
    console.log(id);
    let token = localStorage.getItem("token");
    let songId: any = [];
    songId.push(id);
    this.spotifyService.addLikeSong(songId, token);
  }
}
