import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_LISTINGS } from '../../gql/queries';
import { DELETE_LISTING } from '../../gql/mutations';

import AddListing from './components/AddListing';

const Listing = styled.div`
  position: relative;
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

const DeleteIcon = styled.span`
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  color: red;
  height: 32px;
  font-size: 24px;
  cursor: pointer;
`;
const Listings = () => {
  const { data, loading, error, refetch } = useQuery(GET_LISTINGS);
  const [deleteListing] = useMutation(DELETE_LISTING);

  const handleDelete = async (listingId) => {
    await deleteListing({ variables: { listingId } });
    refetch();
  };

  if (loading) return '...Loading';

  return (
    <div>
      <div>
        <h1>Listings</h1>
        {data?.listings?.map((listing) => (
          <Listing key={listing?.id}>
            <Title>{listing.title}</Title>
            <Description>{listing.description}</Description>
            <DeleteIcon onClick={() => handleDelete(listing.id)}>x</DeleteIcon>
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
