import supertest from "supertest"
import ExpressApp from "../app"

// supertest is the way to use api

const expressApp = new ExpressApp();
const app = expressApp.getApp();
describe('user', ()=>{
  describe('GET user route',()=>{
    describe('For All users',()=>{
        it('should not return All users ',async ()=>{
          await supertest(app).get('/users').expect(403);
         })
       })
    describe('For All users',()=>{
        it('should return 200 status and All users ',async ()=>{
          await supertest(app).get('/users').expect(200);
         })
       })
    })
})















































// import chai from "chai";
// import chaiHttp from "chai-http";
// import { response } from "express";

// // Assertion style
// const API = "http://localhost:5000";

// chai.should();
// chai.use(chaiHttp);
// describe("Test User Api", () => {
  

//   //Testing the get route
//   describe("GET api", () => {
//     it("It should get all the Users:", (done) => {
//       chai
//         .request(API)
//         .get("/users") // Resource url
//         .end((err, response) => {
//           // expect using end
//           response.should.have.status(200);
//           response.should.be.a("object");
//           done();
//         });
//     });

//     it("It should NOT get all the Users:", (done) => {
//       chai
//         .request(API)
//         .get("/user") // Resource url
//         .end((err, response) => { // expect using end
//           response.should.have.status(403);
//           done();
//         });
//     });
//   });
// });


// describe("POST APi",()=>{
//     it("it should post a new user",(done)=> {
//         const newUser = {
//             // id:"",
//             name : "",
//             email : "",
//             password : "",
//             role : ""
//         }
//         chai
//         .request(API)
//         .post("/user")
//         .send(newUser)
//         .end((err,response)=>{
//             response.should.have.status(201);
//             response.body.should.be.a('object');
//             response.body.should.have.property('id').eq();
//             response.body.should.have.property('name').eq();
//             response.body.should.have.property('email');
//             response.body.should.have.property('password');
//             response.body.should.have.property('role');
//            done();
//         })

//     })
// })
