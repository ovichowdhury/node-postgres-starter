module.exports = {
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'ovi1234',
    port: 5432,
    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: 3000,
    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: 20000,
    // maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 20
}