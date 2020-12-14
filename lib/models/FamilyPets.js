const pool = require('../utils/pool');


module.exports = class FamilyPet {
  id;
  type;
  name;
  color;
  familyId;

  constructor(row) {
    this.id = String(row.id);
    this.type = row.type;
    this.name = row.name;
    this.color = row.color;
    this.familyId = String(row.family_id);
  }

  static async insert({ type, name, color, familyId }) {
    const results = await pool.query(
      'INSERT INTO pets (type, name, color, family_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, name, color, familyId]
    );

    return new FamilyPet(results.rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM pets WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw Error(`No pet with id ${id} found.`);

    return new FamilyPet(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM pets');

    return rows.map(row => new FamilyPet(row));
  }

  static async update(id, { type, name, color }) {
    const { rows } = await pool.query(
      `UPDATE pets
        SET type=$1,
            name=$2,
            color=$3
        WHERE id=$4
        RETURNING *`,
      [type, name, color, id]
    );
    if(!rows[0]) throw Error(`No pet with id ${id} found.`);

    return new FamilyPet(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM pets WHERE id=$1 RETURNING *',
      [id]
    );

    return new FamilyPet(rows[0]);
  }
};
