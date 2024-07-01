import { FC, useEffect, useRef } from 'react';
import {
  Container,
  FollowButton,
  FollowersCount,
  Logo,
  Stripe,
  TweetsCount,
  UserImg,
} from './Tweet.styled';
import goit_logo from 'src/assets/goit_logo.svg';
import user_picture from 'src/assets/user_picture.png';

interface ITweetProps {
  id: string;
  tweets: number;
  followers: number;
  isFirstNewResultIndex: boolean;
  toggleUserState: (id: string) => void;
  followedUsers: string[];
}

export const Tweet: FC<ITweetProps> = ({
  id,
  tweets,
  followers,
  isFirstNewResultIndex,
  toggleUserState,
  followedUsers,
}) => {
  const firstNewResultRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    firstNewResultRef.current?.focus();
  }, []);

  return (
    <Container>
      <Logo src={goit_logo} alt='GoIt_logo' />
      <Stripe></Stripe>
      <UserImg src={user_picture} alt='User_photo' />
      <TweetsCount>{tweets} TWEETS</TweetsCount>
      <FollowersCount>
        {Number(followers).toLocaleString()} FOLLOWERS
      </FollowersCount>
      <FollowButton
        ref={isFirstNewResultIndex ? firstNewResultRef : undefined}
        type='button'
        onClick={() => toggleUserState(id)}
        $isFollowing={followedUsers.includes(id)}
      >
        {followedUsers.includes(id) ? 'FOLLOWING' : 'FOLLOW'}
      </FollowButton>
    </Container>
  );
};
