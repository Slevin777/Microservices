import { Listing } from '../db/models';

const setupRoutes = (app) => {
  //
  app.get('/listings', async (req, res, next) => {
    const listings = await Listing.findAll();

    return res.json(listings);
  });

  app.post('/listings', async (req, res, next) => {
    console.log(req.body);
    if (!req.body.title || !req.body.description)
      return next(new Error('Invalid body'));

    try {
      const listing = await Listing.create({
        title: req.body.title,
        description: req.body.description,
      });

      return res.json(listing);
    } catch (e) {
      return next(e);
    }
  });

  app.delete('/listings/:listingId', async (req, res, next) => {
    try {
      const listing = await Listing.findByPk(req.params.listingId);
      if (!listing) return next(new Error('No listing with given ID'));

      await listing.destroy();

      return res.end();
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
