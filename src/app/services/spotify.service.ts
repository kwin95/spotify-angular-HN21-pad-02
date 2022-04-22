import { Injectable } from "@angular/core";
import Spotify from "spotify-web-api-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  private client_Id = "ea0624f0dabe4280b66f8f3f257536b8";
  private client_Secret = "9af17883b2e14c10848f133f09bd9c6a";
  encoder = btoa(`${this.client_Id}:${this.client_Secret}`);
  public scope = [
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-top-read",
    "user-follow-read",
    " user-follow-modify",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  constructor(private http: HttpClient) {
    this.spotifyApi = new Spotify();
  }
  // getOAuthToken() {
  //   const authTokenUrl = `https://accounts.spotify.com/api/token`;
  //   const body = "grant_type=client_credentials";
  //   return this.http.post(authTokenUrl, body, {
  //     headers: new HttpHeaders({
  //       Authorization: "Basic  " + this.encoder,
  //       "Content-Type": "application/x-www-form-urlencoded;",
  //     }),
  //   });
  // }

  authozireAccount() {
    // let redirect_uri = "https://thanghk95-hn21-fr-pad-02.firebaseapp.com/login";
    let redirect_uri = "http://localhost:4200/login";
    let authEndPoint = "https://accounts.spotify.com/authorize?";
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

    return authEndPoint + queryString + endcodeScope + responseType;
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
  // Home Component
  getNewRealease() {
    return this.spotifyApi.getNewReleases();
  }
  getCategories() {
    return this.spotifyApi.getCategories();
  }

  getFeaturePlaylist() {
    return this.spotifyApi.getFeaturedPlaylists();
  }

  // Playlist Detail
  getPlaylistbyId(id: string) {
    return this.spotifyApi.getPlaylist(id);
  }
  getPlaylistCoverImg(id: string) {
    return this.spotifyApi.getPlaylistCoverImage(id);
  }
  getPlayListTrack(id: string) {
    return this.spotifyApi.getPlaylistTracks(id);
  }
  getInforUser() {
    return this.spotifyApi.getMe();
  }
  // Follow playlist
  followPlaylist(id: string) {
    return this.spotifyApi.followPlaylist(id);
  }
  unfollowPlaylist(id: string) {
    return this.spotifyApi.unfollowPlaylist(id);
  }
  checkPlaylistFollow(playlistId: string, userId: string[]) {
    return this.spotifyApi.areFollowingPlaylist(playlistId, userId);
  }

  // Artist detail
  getArtist(id: string) {
    return this.spotifyApi.getArtist(id);
  }

  getArtistTopTrack(id: string) {
    return this.spotifyApi.getArtistTopTracks(id, "VN");
  }

  // Album get
  getAlbum(id: string) {
    return this.spotifyApi.getAlbum(id);
  }
  getAlbumTracks(id: string) {
    return this.spotifyApi.getAlbumTracks(id);
  }
  createPlaylist(userId: string, playlistName: string, playlistDesc: string) {
    return this.spotifyApi.createPlaylist(userId, {
      name: playlistName,
      description: playlistDesc,
      public: false,
    });
  }
  search(queryString: string) {
    return this.spotifyApi.search(
      queryString,
      ["artist", "album", "track", "playlist"],
      { limit: 10 }
    );
  }
  searchSong(queryString: string) {
    return this.spotifyApi.searchTracks(queryString);
  }
  getTrack(id: string) {
    return this.spotifyApi.getTrack(id);
  }
  getLikedSong() {
    return this.spotifyApi.getMySavedTracks();
  }
  addLikeSong(id: string[], token: string) {
    localStorage.setItem("token", token);
    return this.spotifyApi.addToMySavedTracks(id);
  }
  removeLikeSong(id: string[], token: string) {
    localStorage.setItem("token", token);
    return this.spotifyApi.removeFromMySavedTracks(id);
  }
  checkLikedSong(id: string[]) {
    return this.spotifyApi.containsMySavedTracks(id);
  }

  getRecentlyPlay() {
    return this.spotifyApi.getMyRecentlyPlayedTracks();
  }
  //Follow artist
  followArtist(id: string[]) {
    return this.spotifyApi.followArtists(id);
  }
  unfollowArtist(id: string[]) {
    return this.spotifyApi.unfollowArtists(id);
  }
  isFollowArtist(id: string[]) {
    return this.spotifyApi.isFollowingArtists(id);
  }
}
