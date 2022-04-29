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
  }
  ngOnChanges(changes: SimpleChanges) {
    this.myPlaylists = changes.playlists.currentValue;
  }

  addNewPlaylist() {
    this.addPlaylist.emit();
  }
}
