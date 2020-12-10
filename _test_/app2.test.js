const fs = require('fs');

const request = require('supertest');

const app = require('../lib/app');
const pool = require('../lib/utils/pool');

// const Flower = require('../lib/model/Flower');
const Weather = require('../lib/model/Weather');





describe('app endpoints are correct', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));

  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new weather via Post', async() => {
    const res = await request(app)
      .post('/api/v1/weather')
      .send({
        daily: 14,
        weather_id: 1
      });

    expect(res.body).toEqual({
      'id': '1',
      'weather_id': '1',
    });
  });
  ////////////////////////


  it('finds all weathers via GET', async() => {
    const weather = await Promise.all([
      {
        daily: 14,
        weather_id: 1
      },
      {
        daily: 14,
        weather_id: 1
      },
    ].map(weather => Weather.insert(weather)));
    const res = await request(app)
      .get('/api/v1/weather');

    expect(res.body).toEqual(expect.arrayContaining(weather));
    expect(res.body).toHaveLength(weather.length);
  });



  it('updates a weather via PUT', async() => {
    const weather = await Weather.insert({
      daily: 14,
      weather_id: 1
    });

    const res = await request(app)
      .put(`/api/v1/weather/${weather.id}`)
      .send({
        daily: 14,
        weather_id: 1
      });

    expect(res.body).toEqual({
      'id': '1',
      'weather_id': '1',
    });
  });


  it('deletes a weather via DELETE', async() => {
    const weather = await Weather.insert({
      daily: 14,
      weather_id: 1
    });

    const res = await request(app)
      .delete(`/api/v1/weather/${weather.id}`);

    expect(res.body).toEqual(weather);
  });



  it('finds a weather by id via GET', async() => {
    const weather = await Weather.insert({
      daily: 80,

      weather_id: '1'
    });

    const response = await request(app)
      .get(`/api/v1/weather/${weather.id}`);

    expect(response.body).toEqual(weather);
  });

});




