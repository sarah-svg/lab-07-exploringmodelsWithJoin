// id: 1,
// temperature: 'hot',
// weather: 'sunny',
// water_level: 'water twice a week'

const pool = require('../utils/pool');
const Weather = require('./Weather');


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
    const { rows } = await pool.query(
      'INSERT INTO flowers (temperature, weather, water) VALUES ($1, $2, $3) RETURNING * ',
      [temperature, weather, water]
    );
    return new Flower(rows[0]);

  }
  // static async findById(id) {
  //   const { rows } = await pool.query(
  //     'SELECT * FROM flowers WHERE id = $1',
  //     [id]

  //   );
  //   if(!rows[0]) throw Error(`no flower with id ${id}`);
  //   return new Flower(rows[0]);
  // }
  //////////////////////////



  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
      flowers.*, 
       FROM
        flowers 
       JOIN weather
       ON flowers.id = weather_id
       WHERE flowers.id = $1
       GROUP BY flowers.id
       `,
      [id]

    );
    if(!rows[0]) throw Error(`no flower with id ${id}`);
    return {
      ...new Flower(rows[0]),
      weather: rows[0].weather.map(weather => new Weather(weather))
    };
  }




  ////////////////////////////
  static async find() {
    const { rows } = await pool.query('SELECT * FROM flowers');
    return rows.map(row => new Flower(row));
  }
  
  static async update(id, { temperature, weather, water }) {
    const { rows } = await pool.query(
      'UPDATE flowers SET temperature=$1, weather=$2, water=$3 WHERE id=$4 RETURNING *',
      [temperature, weather, water, id]
    );
    if(!rows[0]) throw new Error(`no flower with id ${id} exists`);
    return new Flower(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM flowers WHERE id=$1 RETURNING *',
      [id]
    );
    return new Flower(rows[0]);
  }


};

