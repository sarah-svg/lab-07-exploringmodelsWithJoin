const fs = require('fs');

const request = require('supertest');

const app = require('../lib/app');
const pool = require('../lib/utils/pool');

const Flower = require('../lib/model/Flower');

describe('app endpoints are correct', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));

  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a new flower via Post', async() => {
    const res = await request(app)
      .post('/api/v1/flower')
      .send({
        temperature: 'hot',
        weather: 'sunny',
        water: 'water twice a week'
      });

    expect(res.body).toEqual({
      id: '1',
      temperature: 'hot',
      weather: 'sunny',
      water: 'water twice a week'
    });
  });
  ////////////////////////
  it('finds a flower by id via GET', async() => {
    const flower = await Flower.insert({ temperature: 'hot', weather: 'dry', water: 'everyday' });

    const response = await request(app)
      .get(`/api/v1/flower/${flower.id}`);

    expect(response.body).toEqual(flower);
  });

  it('finds all flowers via GET', async() => {
    const flower = await Promise.all([
      {
        temperature: 'hot',
        weather: 'sunny',
        water: 'water twice a week'
      },
      {
        temperature: 'hot',
        weather: 'sunny',
        water: 'water twice a week'
      },
    ].map(flower => Flower.insert(flower)));
    const res = await request(app)
      .get('/api/v1/flower');

    expect(res.body).toEqual(expect.arrayContaining(flower));
    expect(res.body).toHaveLength(flower.length);
  });






}
);



    





