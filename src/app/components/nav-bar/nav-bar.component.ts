import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  @Output() addPlaylist = new EventEmitter<string>();
  @Input() playlists: any;
  constructor(private spotifyService: SpotifyService) {}

  myPlaylists: any = [];
  token: string;
  ngOnInit() {
    this.myPlaylists = this.playlists;
    // let token = localStorage.getItem("token");
    // this.spotifyService.getMyPlaylist(token).then(
    //   (data) => {
    //     this.myPlaylists = data.items;
    //     console.log(this.myPlaylists);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );
  }
  ngOnChanges(changes: SimpleChanges) {
    this.myPlaylists = changes.playlists.currentValue;
  }

  addNewPlaylist() {
    this.addPlaylist.emit();
  }
}
