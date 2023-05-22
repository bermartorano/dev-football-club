import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match';
import { matchesMock } from './mocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração da rota /matches', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('A rota /matches deve retornar todos as partidas cadastradas', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });

  it('A rota /matches?inProgress= deve retornar todos as partidas cadastradas de acordo com o filtro', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });
});
