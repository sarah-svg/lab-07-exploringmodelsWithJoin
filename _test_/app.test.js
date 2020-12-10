const fs = require('fs');

const request = require('supertest');

const app = require('../lib/app');
const pool = require('../lib/utils/pool');

const Flower = require('../lib/model/Flower');
const Weather = require('../lib/model/Weather');

describe('app endpoints are correct', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));

  });
  // let flower;
  // beforeEach(async() => {

  //   await pool.query(fs.readFileSync(`${__dirname}/../data/setup.sql`, 'utf-8'));
  //   flower = await Flower.insert({
  //     temperature: 'hot',
  //     weather: 'warm',

  //     water: 'water daily' 
   
  //   });
  // });
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
  it('updates a flower via PUT', async() => {
    const flower = await Flower.insert({
      temperature: 'hot',
      weather: 'cloudy',
      water: 'water twice a week'
    });

    const res = await request(app)
      .put(`/api/v1/flower/${flower.id}`)
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


  it('deletes a flower via DELETE', async() => {
    const flower = await Flower.insert({
      temperature: 'hot',
      weather: 'sunny',
      water: 'water twice a week'
    });

    const res = await request(app)
      .delete(`/api/v1/flower/${flower.id}`);

    expect(res.body).toEqual(flower);
  });

  // it('adds a new weather', async() => {
 
  //   const flower = await Flower.insert({
  //     temperature: 'hot',
  //     weather: 'sunny',
  //     water: 'water twice a week'
  //   });

  //   const res = await request(app).post('/api/v1/weather').send({
  //     daily: 80,
  //     weather_id: 'sunny'
  //   });

  //   expect(res.body).toEqual({
   
  //   });
  // });

  // it('finds all weather via GET', async() => {
  //   const weather = await Promise.all([
  //     {
  //       daily: 80,
  //       weather_id: 1,
  //     },
  //     {
  //       daily: 80,
      
  //       weather_id: '1'
  //     },
  //   ].map(weather => Flower.insert(weather)));
  //   const res = await request(app)
  //     .get('/api/v1/weather');

  //   expect(res.body).toEqual(expect.arrayContaining(weather));
  //   expect(res.body).toHaveLength(weather.length);
  // });

  // it('finds a weather by id via GET', async() => {
  //   const weather = await Weather.insert({  daily: 80,
      
  //     weather_id: '1' });

  //   const response = await request(app)
  //     .get(`/api/v1/weather/${weather.id}`);

  //   expect(response.body).toEqual(weather);
  // });

});


