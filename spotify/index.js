const Either = require('data.either')
const Task = require('data.task')
const Spotify = require('./spotify')

const argv = new Task((rej, res) => res(process.argv))
const name = argv.map(args => args.slice(2, 3))

const main = name =>
  Spotify.findArtist(name)
    .map(artist => artist.id)
    .chain(Spotify.findArtistAlbums)
    .map(albums => albums.map(album => album.name))

name.chain(main).fork(console.error, console.log)
