import '@testing-library/jest-dom';

import { server_mock } from 'src/__mocks__/server/server.mock';

beforeAll(() => server_mock.listen());

afterEach(() => server_mock.resetHandlers());

afterAll(() => server_mock.close());
