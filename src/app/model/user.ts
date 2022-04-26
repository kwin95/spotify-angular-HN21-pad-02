export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: any;
  total: number;
}

export interface User {
  display_name: string;
  external_urls?: ExternalUrls;
  followers?: Followers;
  href?: string;
  id: string;
  images?: any[];
  type: string;
  uri: string;
}
