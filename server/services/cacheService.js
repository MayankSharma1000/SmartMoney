const redis =
require("../config/redis");

async function getCache(key){

  const data =
    await redis.get(key);

  return data
    ? JSON.parse(data)
    : null;

}

async function setCache(

  key,

  value,

  ttl = 300

){

  await redis.set(

    key,

    JSON.stringify(value),

    {

      EX: ttl

    }

  );

}

module.exports={

getCache,

setCache

};