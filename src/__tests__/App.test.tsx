import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'src/App';
import { server_mock } from 'src/__mocks__/server/server.mock';
import { rest } from 'msw';
import json from 'src/__mocks__/data/mock.data.json';

describe('App Testing Suite', () => {
  beforeEach(() => render(<App />));

  it('tests for api call error', async () => {
    server_mock.use(
      rest.get('http://localhost:7890/api/pizza', (req, res, ctx) =>
        res.once(
          ctx.status(404),
          ctx.json({ message: 'Internal server error' })
        )
      )
    );

    render(<App />);

    expect(await screen.findByTestId('error_msg')).toBeInTheDocument();
  });

  it('tests the initial state of the rendered elements', async () => {
    for (const key of Object.keys(json.pizzas)) {
      expect(await screen.findByLabelText(key)).not.toBeChecked();
    }

    for (const key of json.ingredients) {
      expect(await screen.findByLabelText(key)).not.toBeChecked();
    }

    expect(screen.queryByTestId('order-0')).not.toBeInTheDocument();
  });

  it(`checks the controls by selecting a cheese pizza. only the 
      'Cheese' radio and 'cheese' checkbox should be checked.
  `, async () => {
    userEvent.click(await screen.findByLabelText('Cheese'));

    for (const key of Object.keys(json.pizzas)) {
      if (key !== 'Cheese') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    for (const key of json.ingredients) {
      if (key !== 'cheese') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }
  });

  it(`checks to if the radio selections change the ings. cycles 
      between 'Cheese', 'All In', 'Build My Own', and 'Meat Lover'.
  `, async () => {
    // Cheese
    userEvent.click(await screen.findByLabelText('Cheese'));

    for (const key of Object.keys(json.pizzas)) {
      if (key !== 'Cheese') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    for (const key of json.ingredients) {
      if (key !== 'cheese') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    // All In
    userEvent.click(await screen.findByLabelText('All In'));

    for (const key of Object.keys(json.pizzas)) {
      if (key !== 'All In') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    for (const key of json.ingredients) {
      if (!key) {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    // Build My Own
    userEvent.click(await screen.findByLabelText('Build My Own'));

    for (const key of Object.keys(json.pizzas)) {
      if (key !== 'Build My Own') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    for (const key of json.ingredients) {
      if (key) {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    // Meat Lover
    userEvent.click(await screen.findByLabelText('Meat Lover'));

    for (const key of Object.keys(json.pizzas)) {
      if (key !== 'Meat Lover') {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }

    for (const key of json.ingredients) {
      if (!json.pizzas['Meat Lover'].includes(key)) {
        expect(await screen.findByLabelText(key)).not.toBeChecked();
      } else {
        expect(await screen.findByLabelText(key)).toBeChecked();
      }
    }
  });

  it('added a cheese pizza to the orders', async () => {
    userEvent.click(await screen.findByLabelText('Cheese'));
    userEvent.click(screen.getByRole('button', { name: 'add to order' }));

    expect(screen.queryByTestId('order-0')).toBeInTheDocument();
  });

  it('checks for multiple added orders', async () => {
    userEvent.click(await screen.findByLabelText('Cheese'));
    userEvent.click(screen.getByRole('button', { name: 'add to order' }));

    expect(screen.queryByTestId('order-0')).toBeInTheDocument();

    userEvent.click(await screen.findByLabelText('All In'));
    userEvent.click(screen.getByRole('button', { name: 'add to order' }));

    expect(screen.queryByTestId('order-1')).toBeInTheDocument();
  });

  it('checks the given title of the order', async () => {
    userEvent.click(await screen.findByLabelText('Cheese'));
    userEvent.click(screen.getByRole('button', { name: 'add to order' }));

    expect(screen.queryByTestId('order-0')).toBeInTheDocument();
    expect(screen.queryByTestId('order-0')).toHaveTextContent('Cheese');

    userEvent.click(await screen.findByLabelText('All In'));
    userEvent.click(screen.getByRole('button', { name: 'add to order' }));

    expect(screen.queryByTestId('order-1')).toBeInTheDocument();
    expect(screen.queryByTestId('order-1')).toHaveTextContent('All In');
  });
});
