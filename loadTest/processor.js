function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

let user=1

function generatePayload(requestParams, ctx, ee, next) {
    ctx.vars["start_lat"]= getRandomInRange(-90, 90, 5);
    ctx.vars["start_long"]= getRandomInRange(-180, 180, 5)
    ctx.vars["end_lat"]= getRandomInRange(-90, 90, 5)
    ctx.vars["end_long"]= getRandomInRange(-180, 180, 5)
    ctx.vars["rider_name"]= `testing_${user}`,
    ctx.vars["driver_name"]= `testUser_${user}`,
    ctx.vars["driver_vehicle"]= `Bike_${user}`
    user++
    return next();
  }

  let page = 1;
  function getPagination(requestParams, ctx, ee, next) {
    
    ctx.vars["page"]= page,
    ctx.vars["limit"]= 10;

    if (page < 1000) {
      page++;
    }
    else {
      page = 1;
    }

    return next();
  }
   
  module.exports = {
    generatePayload,
     getPagination
  };
  