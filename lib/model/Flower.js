// id: 1,
// temperature: 'hot',
// weather: 'sunny',
// water_level: 'water twice a week'

const  Pool = require('../utils/pool.js');

///only join findbyid
module.exports = class Flower {
    id;
    temperature; 
    water;
    weather;
   

    constructor(row) {
      this.id = row.id;
      this.temperature = row.temperature; 
      this.water = row.water;
      this.weather = row.weather;
     
    }
    static async insert({ temperature, weather, water }) {
      const { rows } = await Pool.query(
        'INSERT INTO flowers (temperature, weather, water) VALUES ($1, $2, $3) RETURNING * ',
        [temperature, weather, water]
      );
      return new Flower(rows[0]);
    }


};

