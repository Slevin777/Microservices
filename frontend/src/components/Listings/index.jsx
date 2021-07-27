import { useQuery } from '@apollo/client';
import { GET_LISTINGS } from '../../gql/queries';

import styled from 'styled-components';
import AddListing from './components/AddListing';

const Listing = styled.div`
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.veryLightGray};
  }
`;

const Description = styled.p`
  margin-bottom: 0;
`;

const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;
const Listings = () => {
  const { data, loading, error, refetch } = useQuery(GET_LISTINGS);

  if (loading) return '...Loading';

  return (
    <div>
      <div>
        {data?.listings?.map((listing) => (
          <Listing key={listing?.id}>
            <Title>{listing.title}</Title>
            <Description>{listing.description}</Description>
          </Listing>
        ))}
      </div>
      <div>
        <AddListing onAddListing={() => refetch()} />
      </div>
    </div>
  );
};

export default Listings;
