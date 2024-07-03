import { FC, useEffect, useRef, useState } from 'react';
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
  const pageRef = useRef<number>(1);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<ITweet[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const [followedUsers, setFollowedUsers] =
    useState<string[]>(getFollowedUsers);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.SHOW_ALL);

  const fetchTweets = async (page: number, append: boolean = true) => {
    abortControllerRef.current = new AbortController();
    try {
      setIsLoading(true);
      const responseData = await axiosApiServiceGet(
        page,
        abortControllerRef.current.signal
      );
      if (responseData.length > 0) {
        setItems((prevState) =>
          append ? [...prevState, ...responseData] : responseData
        );
        setHasMoreItems(responseData.length >= 3);
      }
    } catch (error) {
      console.error(`IsError: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets(pageRef.current, false);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

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
    pageRef.current += 1;
    fetchTweets(pageRef.current);
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
