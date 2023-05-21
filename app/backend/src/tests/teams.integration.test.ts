import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamModel from '../database/models/Team';
import teamsMock from './mocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da rota Teams', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('A rota /teams deve retornar todos os times cadastrados', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[])

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

});
