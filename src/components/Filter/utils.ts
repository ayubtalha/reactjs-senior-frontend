export const getTypeString = (filterType: string): string => {
  const typeMap: Record<string, string> = {
    by_city: 'city',
    by_name: 'name',
    by_state: 'state',
    by_postal: 'postal',
    by_country: 'country',
    by_type: 'type',
    default: 'Unknown',
  };

  return typeMap[filterType] || typeMap.default;
};

export const getSortString = (
  filter: string,
  optionalFilter: string | undefined,
  sortOption: string
): SORT => {
  const sortString = optionalFilter
    ? (`${filter},${optionalFilter}:${sortOption}` as SORT)
    : (`${filter}:${sortOption}` as SORT);

  return sortString as SORT;
};

export type SORT = 'asc' | 'desc';

export interface BeerFilterProps {
  onFilterChange: (
    selectedFilter: string,
    prevFilter: string,
    sortOption: SORT
  ) => void;
}

export const sortingOptions: { value: string; label: string }[] = [
  { value: 'by_name', label: 'Name' },
  { value: 'by_city', label: 'City' },
  { value: 'by_dist', label: 'Distance' },
  { value: 'by_state', label: 'State' },
  { value: 'by_postal', label: 'Postal' },
  { value: 'by_country', label: 'Country' },
  { value: 'by_type', label: 'Type' },
];
