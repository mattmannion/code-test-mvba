import { setupServer } from 'msw/node';
import { pizza_contollers } from 'src/__mocks__/server/controllers/pizza.controllers.mock';

export const server_mock = setupServer(...pizza_contollers);
