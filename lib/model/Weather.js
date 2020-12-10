
// id: 1,
// temperature: 'hot',
// weather: 'sunny',
// water_level: 'water twice a week'

const pool = require('../utils/pool');


///only join findbyid
module.exports = class Weather {
  id;
  daily;
  
  weather_id;


  constructor(row) {
    this.id = row.id;
 
    this.daily = row.water;
    this.weather_id = row.weather_id;

  }
  static async insert({ weather_id, daily }) {
    const { rows } = await pool.query(
      'INSERT INTO weather (weather_id, daily) VALUES ($1, $2) RETURNING * ',
      [weather_id, daily]
    );
    return new Weather(rows[0]);

  }
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM weather WHERE id = $1',
      [id]
      // `
      // SELECT 
      // flowers.*, 
      // array_to_json(array_agg(flower.*)) AS flower
      // FROM 
      //   weather
      // JOIN flower
      // ON weather.weather_id=flowers(id)
      // WHERE flowers.id=$1
      // GROUP BY flower.id
      // `,
      // [id]
    );
    if(!rows[0]) throw Error(`no flower with id ${id}`);
    return new Weather(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM weather');
    return rows.map(row => new Weather(row));
  }
  
  static async update(id, { weather_id, daily }) {
    const { rows } = await pool.query(
      'UPDATE weather SET weather_id=$1, daily=$2 WHERE id=$3 RETURNING *',
      [weather_id, daily, id]
    );
    if(!rows[0]) throw new Error(`no weather with id ${id} exists`);
    return new Weather(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM weather WHERE id=$1 RETURNING *',
      [id]
    );
    return new Weather(rows[0]);
  }


};

