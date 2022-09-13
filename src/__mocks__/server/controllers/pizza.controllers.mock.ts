import { rest } from 'msw';
import json from 'src/__mocks__/data/mock.data.json';

export const pizza_contollers = [
  rest.get('http://localhost:7890/api/pizza', (req, res, ctx) =>
    res(ctx.json(json))
  ),
];
