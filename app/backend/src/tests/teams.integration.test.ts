import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import teamsMock from './mocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da rota /teams', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('A rota /teams deve retornar todos os times cadastrados', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[])

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

  it('A rota /teams/:id deve retornar o time com o id correspondente', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teamsMock[0] as TeamModel)

    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock[0]);
  });

});
