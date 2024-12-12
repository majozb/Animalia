import { expect } from 'chai';
import sinon from 'sinon';
import { verifyToken } from '../../src/routes/middleware/verifyToken.js';

describe('verifyToken middleware', () => {
  it('responds with an error if there is no token', () => {
    const req = { cookies: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    verifyToken(req, res, next);

    expect(res.status.calledWith(403)).to.be.true;
    expect(res.json.calledWith({ error: 'Acceso denegado, no se encontró token' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('responds with an error if the token is invalid', () => {
    const req = { cookies: { token: 'invalid-token' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    const next = sinon.spy();

    verifyToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ error: 'Token no válido o expirado' })).to.be.true;
    expect(next.called).to.be.false;
  });

});
