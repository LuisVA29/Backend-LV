import request from "supertest";
import { CLIENT_URL, API_PREFIX, COOKIE_SECRET } from "../src/config/config.js";

const url = CLIENT_URL;
const apiPrefix = API_PREFIX;
const productsRoute = `http://localhost:8080/api/products`;

const api = await request(`${url}${apiPrefix}/products`);
const login = request(`${url}${apiPrefix}/user`);

const userLogin = {
  email: "adminCoder@coder.com",
  password: "adminCod3r123",
};

const cookie = await login
  .post("/login")
  .send(userLogin)
  .then((res) => {
    return res.header["set-cookie"];
  });

const addProduct = {
  title: "Zapatillas Air Force 1 Mid '07 De Hombre",
  description:
    "CAPELLADA CUERO 100% SUELA CAUCHO 100% FORRO POLIÉSTER 100% CONSTITUCIÓN PEGADO COSIDO",
  price: 190,
  thumbnail: [
    "https://res.cloudinary.com/dfamqux3j/image/upload/v1714618867/CW2289-111_PHSRH000-3144_736x736_cfqika.jpg",
  ],
  stock: 25,
  code: 478567,
  status: true,
  category: "Nike",
};

describe("Products Routes", () => {
  describe("Get Products /", () => {
    test("should respond with a 200 status code", async () => {
      return api
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
    test("payload should return number of product if limit given", async () => {
      return api
        .get("/")
        .query({ limit: 3 })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.payload.length).toBe(3);
        });
    });
    test("category query should return", async () => {
      return api
        .get("/")
        .query({ category: "fruta" })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          res.body.payload.forEach((element) => {
            expect(element.category).toBe("Fruta");
          });
        });
    });
    test("should return the pagination ", async () => {
      return api
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body.status).toBe("success");
        });
    });
  });
});

describe("Get Product by id", () => {
  test("Add id and get product", async () => {
    return api
      .get("/65cea7d4cf91d8472f0bfbc2")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body._id).toBe("65cea7d4cf91d8472f0bfbc2");
      });
  });
});

describe("Add Product and delete Product", () => {
  test("Create and delete product", async () => {
    return api
      .post("/")
      .set("Cookie", cookie)
      .send(addProduct)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.status).toBe("success");
        api
          .delete(`/${res.body.product._id}`)
          .set("Cookie", cookie)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body.status).toBe("success");
          });
      });
  });
});

describe("Edit product", () => {
  test("Edit product name", async () => {
    return api
      .put("/664eca53bb7882ead20efc68")
      .send({
        field: "title",
        edit: "Zapatillas Nike Dunk Low Retro De Hombre",
      })
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.product.title).toBe("Manzana");
        api
          .put(`/664eca53bb7882ead20efc68`)
          .send({
            field: "title",
            edit: "Zapatillas Nike Dunk Low Retro De Mujer",
          })
          .set("Cookie", cookie)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body.product.title).toBe(
              "Zapatillas Nike Dunk Low Retro De Mujer"
            );
          });
      });
  });
});
