import { FC } from 'react';
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import type { FollowOption } from '@/types/types';
import { FilterOptions } from '@/types/types';

export interface DropdownProps {
  onChange: (
    option: SingleValue<FollowOption> | null,
    actionMeta: ActionMeta<FollowOption>
  ) => void;
}

const options: FollowOption[] = [
  { value: FilterOptions.SHOW_ALL, label: 'Show all' },
  { value: FilterOptions.SHOW_FOLLOW, label: 'Follow' },
  { value: FilterOptions.SHOW_FOLLOWINGS, label: 'Followings' },
] as const;

const customStyles: StylesConfig<FollowOption, false> = {
  control: (provided) => ({
    ...provided,
    width: '150px',
  }),
};

export const Dropdown: FC<DropdownProps> = ({ onChange }) => {
  return (
    <div className='App'>
      <Select
        defaultValue={options[0]}
        onChange={onChange}
        options={options}
        isSearchable={false}
        name='filter'
        styles={customStyles}
      />
    </div>
  );
};
