import { FC } from 'react';
import { ButtonLoadMore } from './LoadMoreButton.styled';

type Props = {
  onClick: () => void;
};

export const LoadMoreButton: FC<Props> = ({ onClick }) => {
  return (
    <ButtonLoadMore type='button' onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};
