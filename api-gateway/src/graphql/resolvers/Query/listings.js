import ListingsService from '../../../adapters/ListingsService';

const listingsResolver = async () => {
  return await ListingsService.fetchAllListings();
};

export default listingsResolver;
