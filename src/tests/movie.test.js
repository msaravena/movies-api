const { expectCt } = require('helmet');
const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let movieId;

test("POST /movies should create a movie", async() => {
    const newMovie = {
        name: "Top Gun",
        image: "https://i5.walmartimages.com/asr/d1ff362d-804e-4446-9eca-e2362881adf9.a82eac68fecb07acc33f60cc5c5e5900.jpeg",
        synopsis: "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
        releaseYear: 1989
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie)
    movieId = res.body.id
    expect(res.status).toBe(201)
    expect((await res).body.name).toBe(newMovie.name)
});

test("GET /movies should return all movies", async() => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("PUT /movies/:id should update a movie", async() => {
    const body = {
        name: "Top Gun updated",
        image: "https://i5.walmartimages.com/asr/d1ff362d-804e-4446-9eca-e2362881adf9.a82eac68fecb07acc33f60cc5c5e5900.jpeg",
        synopsis: "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
        releaseYear: 1989
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
});

test("POST /movies/:id/actors should set a movie actors", async() => {
    const actor = await Actor.create(
        {
            firstName: "Tom",
            lastName: "Cruise",
            nationality: "american",
            image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-693134468.jpg?crop=1xw:0.75xh;center,top&resize=1200:*",
            birthday: "07-03-1962"
        }
  )
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("POST /movies/:id/directors should set a movie directors", async() => {
    const director = await Director.create(
        {
            firstName: "Tony",
            lastName: "Scott",
            nationality: "british",
            image: "https://es.web.img2.acsta.net/medias/nmedia/18/35/27/65/19190666.jpg",
            birthday: "06-21-1944"
        }
    )
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("POST /movies/:id/genres should set a movie genres", async() => {
    const genre = await Genre.create(
        {
            name: "Biography"
        }
    )
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("DELETE /movies/:id should delete a movie", async() => {
    const res = await request(app).delete(`/movies/${movieId}`)
    expect(res.status).toBe(204)
});

