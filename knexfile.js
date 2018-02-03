module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'SDC'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
        directory: __dirname + '/seeds'
    }
  }
}