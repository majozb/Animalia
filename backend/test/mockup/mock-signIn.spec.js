import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { Purchaser } from '../../src/models/purchaser.js';
import { Admin } from '../../src/models/admin.js';
import { app } from '../../src/index.js';
import jwt from 'jsonwebtoken';
import { Provider } from '../../src/models/provider.js';

describe('SignIn routes mockup', () => {
  context('POST /signIn', () => {
    afterEach(() => {
      sinon.restore(); // Restore stubs after each test
    });

    // it('returns a token when the user is a purchaser with valid password', async () => {
    //   const user = { username: 'purchaser1', password: '123456' };
    //   const hashedPassword = await bcrypt.hash(user.password, 8);
    //   const purchaser = { _id: '123', username: user.username, password: hashedPassword };
    //   const findStub = sinon.stub(Purchaser, 'findOne').resolves(purchaser);
    //   const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
    //   const jwtStub = sinon.stub(jwt, 'sign');
    //   jwtStub.returns('token');
    
    //   const res = await request(app).post('/signIn').send(user);
    
    //   expect(res.statusCode).to.equal(200);
    //   expect(res.body).to.be.a('string');
    //   expect(res.body).to.equal('token');
    //   expect(findStub.calledWith({ username: user.username })).to.be.true;
    //   expect(compareStub.calledWith(user.password, purchaser.password)).to.be.true;
    //   expect(res.header('Set-Cookie')).to.include.string('token='); // Verify cookie presence
    // });

    it('returns 400 for non-existent user', async function () {
      let findStub, findStub1, findStub2;
      const user = { username: 'nonexistentuser', password: 'password123' };
      findStub = sinon.stub(Purchaser, 'findOne').resolves(null);
      findStub1 = sinon.stub(Admin, 'findOne').resolves(null);
      findStub2 = sinon.stub(Provider, 'findOne').resolves(null);
      const res = await request(app).post('/signIn').send(user);

      expect(res.statusCode).to.equal(400);
    });

    it('returns 400 for invalid credentials', async  function () {
      let findStub, findStub1, findStub2;
      const user = { username: 'invalidUser', password: 'wrongPassword' };
      findStub = sinon.stub(Purchaser, 'findOne').resolves(null); // Simulate user not found
      findStub1 = sinon.stub(Admin, 'findOne').resolves(null);
      findStub2 = sinon.stub(Provider, 'findOne').resolves(null);
      // Or simulate a user with incorrect password:
      // const purchaser = { _id: '123', username: user.username, password: 'hashedWrongPassword' };
      // findStub.resolves(purchaser);
      const compareStub = sinon.stub(bcrypt, 'compare').resolves(false); // Simulate incorrect password
    
      const res = await request(app).post('/signIn').send(user);
    
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});