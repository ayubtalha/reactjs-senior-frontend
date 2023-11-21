import React, { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeerFilter from '../../components/Filter';

interface BeerListController {
  page: number;
  per_page: number;
  sort?: SORT;
  by_dist?: string;
  [key: string]: number | string | undefined; // Index signature
}

type SORT = 'asc' | 'desc';

const BeerList: React.FC = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [controller, setController] = useState<BeerListController>({
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    fetchData(setBeerList, setTotalPages, controller);
  }, [controller]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setController({ ...controller, page: value });
  };

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleFilterChange = (
    newFilter: string,
    prevFilter: string,
    sortOption: SORT
  ) => {
    const newController: BeerListController = {
      ...controller,
      sort: newFilter === 'by_dist' ? undefined : sortOption,
    };

    if (prevFilter) {
      delete newController[prevFilter];
    }

    setController(newController);
  };

  return (
    <article>
      <BeerFilter onFilterChange={handleFilterChange} />

      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={() => onBeerClick(beer.id)}
              >
                <ul>
                  <ListItemText
                    primary={beer.name}
                    secondary={beer.brewery_type}
                  />
                </ul>
              </ListItemButton>
            ))}
          </List>
          <Box my={2} display='flex' justifyContent='center'>
            <Pagination
              count={totalPages}
              page={controller.page}
              onChange={handleChangePage}
            />
          </Box>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
