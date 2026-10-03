import { type FC, type MouseEventHandler } from 'react';
import { ButtonLoadMore } from './LoadMoreButton.styled';

interface LoadMoreButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <ButtonLoadMore type='button' onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};
