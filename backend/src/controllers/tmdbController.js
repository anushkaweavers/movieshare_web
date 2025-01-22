const axios = require('axios');

const tmdbAxios = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  params: { api_key: process.env.TMDB_API_KEY },
});

exports.getMovies = async (req, res) => {
  try {
    const { endpoint } = req.params;
    const queryParams = req.query;

    const response = await tmdbAxios.get(endpoint, { params: queryParams });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('TMDB API Error:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('TMDB Request Error:', error.request);
      res.status(502).json({ error: 'No response from TMDB API.' });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
};
