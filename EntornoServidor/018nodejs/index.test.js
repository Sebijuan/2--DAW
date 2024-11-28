const request = require('supertest');

describe('User CRUD API', () => {
  it('should list all users', async () => {
    const res = await request('http://localhost:3000').get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a user by ID', async () => {
    const res = await request('http://localhost:3000').get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should create a new user', async () => {
    const res = await request('http://localhost:3000').post('/users').send({
      name: 'New User',
      email: 'newuser@example.com'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a user', async () => {
    const res = await request('http://localhost:3000').put('/users/1').send({
      name: 'Updated User',
      email: 'updated@example.com'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  it('should delete a user', async () => {
    const res = await request('http://localhost:3000').delete('/users/1');
    expect(res.statusCode).toEqual(204);
  });
});