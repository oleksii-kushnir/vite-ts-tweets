import { FC, useEffect, useState } from 'react';
import { Container, LinkToHome, List, MenuCont } from './Tweets.styled';
import {
  axiosApiServiceGet,
  axiosApiServicePut,
} from '@/components/services/AxiosApiService';
import { Tweet } from '@/components/Tweet/Tweet';
import { LoadMoreButton } from '@/components/Button/LoadMoreButton';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { SingleValue } from 'react-select';
import { FilterOptions } from '@/types/types';
import type { FollowOption, ITweet } from '@/types/types';

const getFollowedUsers = (): string[] => {
  try {
    const followedUsers = JSON.parse(localStorage.getItem('followed') || '""');
    return followedUsers || [];
  } catch (error) {
    console.error('Failed to parse followed users from localStorage:', error);
    return [];
  }
};

const Tweets: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [followedUsers, setFollowedUsers] =
    useState<string[]>(getFollowedUsers);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.SHOW_ALL);

  useEffect(() => {
    const abortController = new AbortController();
    const getTweets = async () => {
      try {
        setIsLoading(true);
        const responseData = await axiosApiServiceGet(page, abortController);
        if (responseData.length > 0) {
          setItems((prevState) => [...prevState, ...responseData]);
          responseData.length < 3
            ? setHasMoreItems(false)
            : setHasMoreItems(true);
        }
      } catch (error) {
        console.error(`IsError: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getTweets();
    return () => abortController.abort();
  }, [page]);

  useEffect(() => {
    const prevFollowedUsers = () => {
      try {
        return JSON.parse(localStorage.getItem('followed') || '[]');
      } catch (error) {
        console.error(
          'Failed to parse followed users from localStorage:',
          error
        );
        return [];
      }
    };

    if (prevFollowedUsers.toString() !== followedUsers.toString()) {
      try {
        localStorage.setItem('followed', JSON.stringify(followedUsers));
      } catch (error) {
        console.error(
          'Failed to parse followed users from localStorage:',
          error
        );
      }
    }
  }, [followedUsers]);

  const toggleUserState = async (userId: string) => {
    const user: ITweet | undefined = items.find(({ id }) => id === userId);
    if (user) {
      let newFollowerCount: number;
      try {
        if (followedUsers.includes(userId)) {
          const result = followedUsers.filter((id) => id !== userId);
          setFollowedUsers(result);
          newFollowerCount = user.followers - 1;
        } else {
          setFollowedUsers((prevState) => [...prevState, userId]);
          newFollowerCount = user.followers + 1;
        }
        setItems((prevState) =>
          prevState.map((i) =>
            i.id === userId ? { ...i, followers: newFollowerCount } : i
          )
        );
        await axiosApiServicePut({
          ...user,
          followers: newFollowerCount,
        });
      } catch (error) {
        console.error(`IsError: ${error}`);
      }
    }
  };

  const filterChange = (option: SingleValue<FollowOption>) => {
    setFilter(option?.value || FilterOptions.SHOW_ALL);
  };

  const getVisibleTweets = () => {
    switch (filter) {
      case FilterOptions.SHOW_ALL:
        return items;
      case FilterOptions.SHOW_FOLLOW:
        return items.filter((tweet) => !followedUsers.includes(tweet.id));
      case FilterOptions.SHOW_FOLLOWINGS:
        return items.filter((tweet) => followedUsers.includes(tweet.id));
      default:
        return items;
    }
  };

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container>
      <MenuCont>
        <LinkToHome to='/'>Back</LinkToHome>
        <Dropdown onChange={filterChange} />
      </MenuCont>
      <List>
        {items.length > 0 &&
          getVisibleTweets().map(({ tweets, followers, id }) => {
            return (
              <Tweet
                key={id}
                id={id}
                tweets={tweets}
                followers={followers}
                toggleUserState={toggleUserState}
                followedUsers={followedUsers}
              />
            );
          })}
      </List>
      {isLoading && <p>Loading...</p>}
      {!isLoading && hasMoreItems && <LoadMoreButton onClick={loadMore} />}
    </Container>
  );
};

export default Tweets;
