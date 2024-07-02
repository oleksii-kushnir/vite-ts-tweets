import { FC } from 'react';
import {
  Container,
  FollowButton,
  FollowersCount,
  Logo,
  Stripe,
  TweetsCount,
  UserImg,
} from './Tweet.styled';
import goit_logo from '@/assets/goit_logo.svg';
import user_picture from '@/assets/user_picture.png';

interface ITweetProps {
  id: string;
  tweets: number;
  followers: number;
  toggleUserState: (id: string) => void;
  followedUsers: string[];
}

export const Tweet: FC<ITweetProps> = ({
  id,
  tweets,
  followers,

  toggleUserState,
  followedUsers,
}) => {
  return (
    <Container>
      <Logo src={goit_logo} alt='GoIt_logo' />
      <Stripe />
      <UserImg src={user_picture} alt='User_photo' />
      <TweetsCount>{tweets} TWEETS</TweetsCount>
      <FollowersCount>
        {Number(followers).toLocaleString()} FOLLOWERS
      </FollowersCount>
      <FollowButton
        type='button'
        onClick={() => toggleUserState(id)}
        $isFollowing={followedUsers.includes(id)}
      >
        {followedUsers.includes(id) ? 'FOLLOWING' : 'FOLLOW'}
      </FollowButton>
    </Container>
  );
};
