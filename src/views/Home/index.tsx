import React, { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  const handleFilterTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
  };

  const toggleFavorite = (beerId: string) => {
    const updatedFavorites = favorites.includes(beerId)
      ? favorites.filter((id) => id !== beerId)
      : [...favorites, beerId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const undoFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const reloadList = () => {
    fetchData(setBeerList);
  };

  const renderBeerListItem = (beer: Beer, index: number) => (
    <li key={index.toString()}>
      <Checkbox
        checked={favorites.includes(beer.id)}
        onChange={() => toggleFavorite(beer.id)}
      />
      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label='Search'
                  variant='outlined'
                  value={filterText}
                  onChange={handleFilterTextChange}
                />
                <Button variant='contained' onClick={reloadList}>
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList
                  .filter((beer) =>
                    beer.name.toLowerCase().includes(filterText.toLowerCase())
                  )
                  .map(renderBeerListItem)}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favorites</h3>
                <Button
                  variant='contained'
                  size='small'
                  onClick={undoFavorites}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {beerList
                  .filter((beer) => favorites.includes(beer.id))
                  .map(renderBeerListItem)}
                {!favorites.length && <p>No items to show</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
