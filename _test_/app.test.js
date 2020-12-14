const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const fs = require('fs');
const Family = require('../lib/models/Family');
const FamilyPet = require('../lib/models/FamilyPets');

describe('app endpoints', () => {
  let family;
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    family = await Family.insert({
      house: 'Jamie',
      members: 12,
    });
  });

  //  CRUD test for ONE CHILD
  it('creates a new family via POST', async() => {
    const res = await request(app)
      .post('/api/v1/families')
      .send({
        house: 'Smith',
        members: 6,
      });

    expect(res.body).toEqual({
      id: '2',
      house: 'Smith',
      members: 6,
    });
  });

  it('finds a family by id and associated pets via GET', async() => {


    const pets = await Promise.all([
      {
        type: 'Golden retriever',
        name: 'goldie',
        color: 'golden brown',
        familyId: family.id
      },
      {
        type: 'German Shepard',
        name: 'dog',
        color: 'black and brown',
        familyId: family.id
      },
      {
        type: 'gold fish',
        name: 'fish',
        color: 'gold',
        familyId: family.id
      },
    ].map(pet => FamilyPet.insert(pet)));

    const res = await request(app)
      .get(`/api/v1/families/${family.id}`);

    expect(res.body).toEqual({
      ...family,
      pets: expect.arrayContaining(pets)
    });
  });

  it('finds all families via GET', async() => {
    const families = await Promise.all([
      {
        house: 'McFly',
        members: 1,
      },
      {
        house: 'Pugh',
        members: 4,
      },
      {
        house: 'Alias',
        members: 2,
      }
    ].map(family => Family.insert(family)));

    const res = await request(app)
      .get('/api/v1/families');

    expect(res.body).toEqual(expect.arrayContaining(families));

  });

  it('updates a family via PUT', async() => {
    const family = await Family.insert({
      house: 'Lacy',
      members: 6
    });

    const res = await request(app)
      .put(`/api/v1/families/${family.id}`)
      .send({
        house: 'Ax',
        members: 4
      });

    expect(res.body).toEqual({
      id: family.id,
      house: 'Ax',
      members: 4
    });

  });

  it('removes a family via DELETE', async() => {
    const family = await Family.insert({
      house: 'Lakewood',
      members: 6
    });

    const response = await request(app)
      .delete(`/api/v1/families/${family.id}`);

    expect(response.body).toEqual(family);
  });



  //  CRUD test for MANY TOYS
  it('creates a new pet via POST', async() => {
    const res = await request(app)
      .post('/api/v1/pets')
      .send({
        type: 'stuffed',
        name: 'bear',
        color: 'brown',
        familyId: family.id,
      });

    expect(res.body).toEqual({
      id: '1',
      type: 'stuffed',
      name: 'bear',
      color: 'brown',
      familyId: family.id,
    });
  });

  it('finds a pet by id via GET', async() => {
    const pet = await FamilyPet.insert({
      type: 'stuffed',
      name: 'bear',
      color: 'brown',
      // familyId: family.id,
    });


    const res = await request(app)
      .get(`/api/v1/pets/${pet.id}`);

    expect(res.body).toEqual(pet);
  });

  it('finds all pets via GET', async() => {
    const pets = await Promise.all([
      {
        type: 'stuffed',
        name: 'bear',
        color: 'brown',
        familyId: family.id,
      },
      {
        type: 'stuffed',
        name: 'dog',
        color: 'black',
        familyId: family.id,
      },
      {
        type: 'stuffed',
        name: 'zebra',
        color: 'rainbow',
        familyId: family.id,
      }
    ].map(pet => FamilyPet.insert(pet)));

    const res = await request(app)
      .get('/api/v1/pets');

    expect(res.body).toEqual(expect.arrayContaining(pets));
    // expect(res.body).toHaveLength(family.length);
  });

  it('updates a pet via PUT', async() => {
    const pet = await FamilyPet.insert({
      type: 'stuffed',
      name: 'zebra',
      color: 'rainbow',
    });

    const res = await request(app)
      .put(`/api/v1/pets/${pet.id}`)
      .send({
        type: 'stuffed',
        name: 'zebra',
        color: 'black and white',
      });

    expect(res.body).toEqual({
      ...pet,
      type: 'stuffed',
      name: 'zebra',
      color: 'black and white',
    });

  });

  it('removes a pet via DELETE', async() => {
    const pet = await FamilyPet.insert({
      type: 'stuffed',
      name: 'zebra',
      color: 'rainbow',
    });

    const response = await request(app)
      .delete(`/api/v1/pets/${pet.id}`);

    expect(response.body).toEqual(pet);
  });

  afterAll(() => {
    return pool.end();
  });
});
