const pool = require('../utils/pool');
const FamilyPet = require('./FamilyPets');

module.exports = class Family {
  id;
  house;
  members;

  constructor(row) {
    this.id = row.id;
    this.house = row.house;
    this.members = row.members;
  }

  static async insert({ house, members }) {
    const results = await pool.query(
      'INSERT INTO families (house, members) VALUES ($1, $2) RETURNING *',
      [house, members]
    );

    return new Family(results.rows[0]);
  }

  // static async findById(id) {
  //   const { rows } = await pool.query(
  //     'SELECT * FROM families WHERE id=$1',
  //     [id]
  //   );

  //   if(!rows[0]) throw Error(`No family with id ${id} found.`);

  //   return new Family(rows[0]);
  // }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        families.*,
        array_to_json(array_agg(pets.*)) AS pets
      FROM
        families
      JOIN pets
      ON families.id = pets.family_id
      WHERE families.id=$1
      GROUP BY families.id
      `,
      [id]
    );

    if (!rows[0]) throw Error(`No family with id ${id} found.`);

    return {
      ...new Family(rows[0]),
      pets: rows[0].pets.map(pet => new FamilyPet(pet))
    };
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM families');

    return rows.map(row => new Family(row));
  }

  static async update(id, { house, members }) {
    const { rows } = await pool.query(
      `UPDATE families
        SET house=$1,
            members=$2
        WHERE id=$3
        RETURNING *`,
      [house, members, id]
    );
    if (!rows[0]) throw Error(`No family with id ${id} found.`);

    return new Family(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM families WHERE id=$1 RETURNING *',
      [id]
    );

    return new Family(rows[0]);
  }
};
