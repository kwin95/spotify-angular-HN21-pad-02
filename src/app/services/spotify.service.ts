import { Injectable } from "@angular/core";
import Spotify from "spotify-web-api-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  private client_Id = "f143bfa6c67845d8a07602e8fb560312";
  private client_Secret = "60b16bff56814be3ba5d8010fbd6ff10";
  public scope = [
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];

  encoder = btoa(`${this.client_Id}:${this.client_Secret}`);
  constructor(private http: HttpClient) {
    this.spotifyApi = new Spotify();
  }
  getToken() {
    this.spotifyApi.getAccessToken();
  }

  authozireAccount() {
    let redirect_uri = "http://localhost:4200/login";
    let authEndPint = "https://accounts.spotify.com/authorize?";
    let responseType = "&response_type=token&show_dialog=true";
    let option = {
      response_type: "code",
      client_id: this.client_Id,
      redirect_uri: redirect_uri,
    };
    let endcodeScope = `scope=${this.scope.join("%20")}`;
    let queryString =
      Object.keys(option)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(option[key])
        )
        .join("&") + "&";

    return authEndPint + queryString + endcodeScope + responseType;
  }
  getUrlParam() {
    if (!window.location.hash) {
      return "";
    } else {
      let params = window.location.hash.substring(1).split("&");
      return params[0].split("=")[1];
    }
  }
  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem("token", token);
  }

  getMyPlaylist(token: string) {
    this.spotifyApi.setAccessToken(token);
    return this.spotifyApi.getUserPlaylists();
  }
  getNewRealease() {
    return this.spotifyApi.getNewReleases();
  }
  getCategories() {
    return this.spotifyApi.getCategories();
  }

  getFeaturePlaylist() {
    return this.spotifyApi.getFeaturedPlaylists();
  }
  getRecentlyPlay() {
    return this.spotifyApi.getMyRecentlyPlayedTracks();
  }
}
