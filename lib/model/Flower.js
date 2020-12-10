// id: 1,
// temperature: 'hot',
// weather: 'sunny',
// water_level: 'water twice a week'

const pool = require('../utils/pool');


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
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM flowers WHERE id = $1',
      [id]
    );
    if(!rows[0]) throw Error(`no flower with id ${id}`);
    return new Flower(rows[0]);
  }




};

