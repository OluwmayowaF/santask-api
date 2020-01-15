module.exports ={
    development: {
        port: process.env.PORT || 3000,
        dbhost: process.env.DB_CONN ,
        saltingRounds: 10,
    },

    production: {
        port: process.env.PORT || 5000,
        dbhost: process.env.DB_CONN ,
        saltingRounds: 10,
    }
}