import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import {
  getTypeString,
  getSortString,
  BeerFilterProps,
  sortingOptions,
} from './utils';

export type SORT = 'asc' | 'desc';

const BeerFilter: React.FC<BeerFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('by_name');
  const [sortOption, setSortOption] = useState<SORT>('asc');

  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value as string;
    const prevFilter = selectedFilter;
    setSelectedFilter(newFilter);
    const sortString = getSortString(
      getTypeString(newFilter),
      'name',
      sortOption
    );
    if (newFilter === 'by_type') {
      onFilterChange(newFilter, prevFilter, sortString);
    } else {
      onFilterChange(newFilter, prevFilter, sortString);
    }
  };

  const handleSortChange = (event: any) => {
    const newSortOption = event.target.value as SORT;
    setSortOption(newSortOption);
    const sortString = getSortString(
      getTypeString(selectedFilter),
      'name',
      newSortOption
    );
    onFilterChange(selectedFilter, '', sortString);
  };

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel htmlFor='filter-select'>Filter Items</InputLabel>
          <Select
            id='filter-select'
            value={selectedFilter}
            onChange={handleFilterChange}
            label='Filter Items'
          >
            {sortingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor='sort-select'>Sorting</InputLabel>
          <Select
            id='sort-select'
            value={sortOption}
            onChange={handleSortChange}
            label='Sort By'
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default BeerFilter;
