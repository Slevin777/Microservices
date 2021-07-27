import got from 'got';

const LISTINGS_SERVICE_URI = 'http://listings-service:7100';

export default class ListingsService {
  static async fetchAllListings() {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/listings`).json();
    return body;
  }

  static async createListing({ title, description }) {
    const body = await got
      .post(`${LISTINGS_SERVICE_URI}/listings`, {
        json: { title, description },
      })
      .json();

    return body;
  }

  static async deleteListing({ listingId }) {
    const body = await got
      .delete(`${LISTINGS_SERVICE_URI}/listings/${listingId}`)
      .json();

    return body;
  }
}
