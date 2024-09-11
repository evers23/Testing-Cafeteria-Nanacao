//server.spec.js
const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {

    it("Obteniendo un 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes").send();
        const { statusCode, body } = response;
        
        expect(statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    it("Retorna 404 al intentar eliminar un café inexistente", async () => {
        const idCafe = 999;
        const response = await request(server).delete(`/cafes/${idCafe}`).send();

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Café no encontrado' });
    });

    it("Agregando un café y retornando 201", async () => {
        const nuevoCafe = { id: 5, name: "Café Irlandés" };
        const response = await request(server).post("/cafes").send(nuevoCafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(nuevoCafe);
    });

    it("Retorna 400 cuando el id del parámetro no coincide con el id del payload", async () => {
        const cafeActualizado = { id: 6, name: "Latte" }; 
        const response = await request(server).put("/cafes/5").send(cafeActualizado);
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ message: 'El id del parámetro no coincide con el id del café recibido' });
    });
});
