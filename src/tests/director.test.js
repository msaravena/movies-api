const request = require('supertest');
const app = require('../app');
require('../models');

let directorId;

test("POST /directors should create a director", async() => {
    const newDirector = {
        firstName: "Tony",
        lastName: "Scott",
        nationality: "british",
        image: "https://es.web.img2.acsta.net/medias/nmedia/18/35/27/65/19190666.jpg",
        birthday: "06-21-1944"
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector)
    directorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newDirector.name)
});

test("GET /directors should return all directors", async() => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("PUT /directors/:id should update a director", async() => {
    const body = {
        firstName: "Tony updated",
        lastName: "Scott",
        nationality: "british",
        image: "https://es.web.img2.acsta.net/medias/nmedia/18/35/27/65/19190666.jpg",
        birthday: "06-21-1944"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
});

test("DELETE /directors/:id should delete a director", async() => {
    const res = await request(app).delete(`/directors/${directorId}`)
    expect(res.status).toBe(204)
});