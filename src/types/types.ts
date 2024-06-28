export enum FilterOptions {
  SHOW_ALL = 'show all',
  SHOW_FOLLOW = 'follow',
  SHOW_FOLLOWINGS = 'followings',
}

export interface FollowOption {
  readonly value: FilterOptions;
  readonly label: string;
}

export interface ITweet {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  id: string;
}
