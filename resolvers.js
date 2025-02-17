const Movie = require('./models/Movie');

const resolvers = {
  Query: {
    
    movies: async () => {
      try {
        return await Movie.find();
      } catch (err) {
        throw new Error('Error fetching movies');
      }
    },
    
    movie: async (_, { id }) => {
      try {
        return await Movie.findById(id);
      } catch (err) {
        throw new Error('Error fetching movie');
      }
    },
  },
  
  Mutation: {
    
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new Movie({
          name,
          director_name,
          production_house,
          release_date,
          rating,
        });
        return await newMovie.save();
      } catch (err) {
        throw new Error('Error adding movie');
      }
    },
    
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true }
        );
        return updatedMovie;
      } catch (err) {
        throw new Error('Error updating movie');
      }
    },
    
    deleteMovie: async (_, { id }) => {
      try {
        const deletedMovie = await Movie.findByIdAndRemove(id);
        return deletedMovie;
      } catch (err) {
        throw new Error('Error deleting movie');
      }
    },
  },
};

module.exports = resolvers;