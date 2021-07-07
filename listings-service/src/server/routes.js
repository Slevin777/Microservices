import { Listing } from '../db/models';

const setupRoutes = (app) => {
  //
  app.get('/listings', async (req, res, next) => {
    const listings = await Listing.findAll();

    return res.json(listings);
    // res.json({ message: 'lfsjd' });
  });
};

export default setupRoutes;
