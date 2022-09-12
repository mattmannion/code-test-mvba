import { rest } from 'msw';

export const pizza_contollers = [
  rest.get('http://localhost:7890/api/pizza', (req, res, ctx) =>
    res(
      ctx.json([
        {
          status: 'success',
          pizzas: {
            Cheese: ['cheese'],
            Pepperoni: ['cheese', 'pepperoni'],
            Vegatarian: [
              'cheese',
              'broccoli',
              'peppers',
              'onions',
              'spinach',
              'mushrooms',
              'tomatoes',
              'black olives',
            ],
            'Meat Lover': ['cheese', 'pepperoni', 'sausage', 'bacon'],
            'All In': [
              'cheese',
              'broccoli',
              'peppers',
              'onions',
              'spinach',
              'mushrooms',
              'tomatoes',
              'black olives',
              'pepperoni',
              'sausage',
              'bacon',
            ],
            'Build My Own': [],
          },
          ingredients: [
            'cheese',
            'pepperoni',
            'sausage',
            'bacon',
            'broccoli',
            'peppers',
            'onions',
            'spinach',
            'mushrooms',
            'tomatoes',
            'black olives',
          ],
        },
      ])
    )
  ),
];
