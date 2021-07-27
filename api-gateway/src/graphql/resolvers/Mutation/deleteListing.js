import ListingsService from '../../../adapters/ListingsService';

const deleteListingResolver = async (obj, { listingId }) => {
  await ListingsService.deleteListing({ listingId });

  return true;
};

export default deleteListingResolver;
