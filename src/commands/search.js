function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function search(ctx){
    const Kitsu = require('kitsu');
    const api = new Kitsu()
    
    const info = await api.fetch("anime/" + getRandomIntInclusive(1, 46119));
    console.log(info["data"]["canonicalTitle"])
    return [info["data"]["posterImage"]["large"]+ "\n", info["data"]["synopsis"] ];

 
}
function retryForever(ctx) {
    return search(ctx).catch(function (err) {
        return retryForever(ctx);
    });
}
module.exports = retryForever;