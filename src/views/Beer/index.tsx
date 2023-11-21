import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(setBeer, id);
  }, [id]);

  return (
    <>
      <article>
        <section>
          <header>
            <h1>{beer?.name}</h1>
          </header>
          <main>
            <div>
              <ul>
                <ul>
                  <BeerDetail label='Type' value={beer?.brewery_type} />
                  <BeerDetail label='Street' value={beer?.address_1} />
                  <BeerDetail label='City' value={beer?.city} />
                  <BeerDetail label='Province' value={beer?.state_province} />
                  <BeerDetail label='Country' value={beer?.country} />
                  <BeerDetail label='Phone' value={beer?.phone} />
                  <Typography>
                    <a href={beer?.website_url}>Website Link</a>
                  </Typography>
                </ul>
              </ul>
            </div>
          </main>
        </section>
      </article>

      <ArrowBackIcon onClick={() => navigate(-1)} sx={{ cursor: 'pointer' }} />
    </>
  );
};

interface BeerDetailProps {
  label: string;
  value: React.ReactNode;
}

const BeerDetail: React.FC<BeerDetailProps> = ({ label, value }) => (
  <li>
    <b>{label}: </b> {value}
  </li>
);

export default Beer;
