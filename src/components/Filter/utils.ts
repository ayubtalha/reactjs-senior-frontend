export const getTypeString = (filterType: string) => {
  switch (filterType) {
    case 'by_city':
      return 'city';
    case 'by_name':
      return 'name';
    case 'by_state':
      return 'state';
    case 'by_postal':
      return 'postal';
    case 'by_country':
      return 'country';
    case 'by_type':
      return 'type';
    default:
      return 'Unknown';
  }
};

export const getSortString = (
  filter: string,
  optionalFilter: string | undefined,
  sortOption: string
) => {
  if (optionalFilter) {
    return `${filter},${optionalFilter}:${sortOption}` as SORT;
  }
  return `${filter}:${sortOption}` as SORT;
};

export type SORT = 'asc' | 'desc';

export interface BeerFilterProps {
  onFilterChange: (
    selectedFilter: string,
    prevFilter: string,
    sortOption: SORT
  ) => void;
}

export const sortingOptions: {
  value: string;
  label: string;
}[] = [
  { value: 'by_name', label: 'Name' },
  { value: 'by_city', label: 'City' },
  { value: 'by_dist', label: 'Distance' },
  { value: 'by_state', label: 'State' },
  { value: 'by_postal', label: 'Postal' },
  { value: 'by_country', label: 'Country' },
  { value: 'by_type', label: 'Type' },
];
