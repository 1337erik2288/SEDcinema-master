const sequelize = require('./../db/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Watchlist = sequelize.define('watchlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const WatchlistFilm = sequelize.define('watchlist_film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filmId: {type: DataTypes.INTEGER},
});

const Film = sequelize.define('film', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNonNegative(value) {
                if (value < 0) {
                    throw new Error('Budget must be non-negative.');
                }
            },
        },
    },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Moviemaker = sequelize.define('moviemaker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const FilmInfo = sequelize.define('film_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const GenreMoviemaker = sequelize.define('genre_moviemaker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Watchlist);
Watchlist.belongsTo(User);

Watchlist.hasMany(WatchlistFilm);
WatchlistFilm.belongsTo(Watchlist);

Genre.hasMany(Film);
Film.belongsTo(Genre);

Genre.hasMany(Film);
Film.belongsTo(Genre);

Moviemaker.hasMany(Film);
Film.belongsTo(Moviemaker);

Film.hasMany(FilmInfo, {as: 'info'});
FilmInfo.belongsTo(Film);

Genre.belongsToMany(Moviemaker, {through: GenreMoviemaker});
Moviemaker.belongsToMany(Genre, {through: GenreMoviemaker});


module.exports = {
    User,
    Watchlist,
    WatchlistFilm,
    Film,
    Genre,
    Moviemaker,
    GenreMoviemaker,
    FilmInfo,
}

