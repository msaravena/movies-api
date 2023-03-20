const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test("POST /actors should create one actor", async() => {
    const newActor = {
        firstName: "Tom",
        lastName: "Cruise",
        nationality: "american",
        image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-693134468.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
        birthday: "07-03-1962"
    }
    const res = await request(app)
        .post('/actors')
        .send(newActor)
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newActor.name)
} );

test("GET /actors should return all actors", async()=> {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("PUT /actors/:id should update one actor", async() => {
    const body = {
        firstName: "Tom updated",
        lastName: "Cruise",
        nationality: "american",
        image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-693134468.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
        birthday: "07-03-1962"
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
});

test("DELETE /actors/:id should delere an actor", async() => {
    const res = await request(app).delete(`/actors/${actorId}`)
    expect(res.status).toBe(204)
});
