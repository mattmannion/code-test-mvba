import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pizzas {
  cheese: string[];
  pepperoni: string[];
  vegetarian: string[];
  meat_lover: string[];
  all_in: string[];
  build_your_own: string[];
}

type Ings = string[];

interface Order {
  name: string;
  ingredients: Ings;
}

interface PizzaCard {
  name: string;
  order_num: number;
  ingredients: string[];
}

function PizzaCard({ name, order_num, ingredients }: PizzaCard) {
  return (
    <div className='app__pizza-card'>
      <div className='app__pizza-card-title'>
        <div>Type: {name}</div>
        <div> Order#: {order_num + 1}</div>
      </div>
      <div className='app__pizza-card-ings'>
        {ingredients.map((ing, i) => (
          <div className='app__pizza-card-ing' key={i}>
            {ing}{' '}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClearChecked(arr: string[], el_id: string) {
  arr.forEach((_, i) => {
    const cb = document.getElementById(el_id + i) as HTMLInputElement;
    cb.checked = false;
  });
}

export function App() {
  const [pizzas, setPizzas] = useState<Pizzas>({} as Pizzas);
  const [baseIngs, setBaseIngs] = useState<Ings>([]);
  const [customIngs, setCustomIngs] = useState<Ings>([]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [selection, setSelection] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:7890/api/pizza');
        const { pizzas, ingredients } = data;

        if (pizzas) setPizzas(pizzas);
        if (Array.isArray(ingredients)) setBaseIngs(ingredients.sort());
      } catch (error) {
        setError('an error has occurred with the api');
      }
    })();
  }, []);

  useEffect(() => {
    baseIngs
      .map(
        (_, i) =>
          document.getElementById('custom-ings-input-' + i) as HTMLInputElement
      )
      .forEach((cb) => {
        customIngs.forEach((ing) => {
          if (cb.name === ing) {
            cb.checked = true;
          }
        });
      });

    Object.keys(pizzas).forEach((_, i) => {
      const cb = document.getElementById(
        'pizza-input-' + i
      ) as HTMLInputElement;
      const bg = document.getElementById(
        'pizza-input-bg-' + i
      ) as HTMLDivElement;

      if (cb.checked) bg.classList.add('app__pizza--active');
      else bg.classList.remove('app__pizza--active');
    });
  }, [selection]);

  if (error)
    return (
      <div className='app' data-testid='error_msg'>
        {error}
      </div>
    );

  return (
    <div className='app'>
      <form
        className='app__form'
        onSubmit={(e) => {
          e.preventDefault();
          if (selection.length > 0 && customIngs.length > 0) {
            setOrders((prev) => [
              ...prev,
              { name: selection, ingredients: customIngs },
            ]);

            setSelection('');
            setCustomIngs([]);

            ClearChecked(Object.keys(pizzas), 'pizza-input-');
            ClearChecked(baseIngs, 'custom-ings-input-');
          }
        }}
      >
        <div className='app__pizzas-title'>Pizza Selection</div>

        <div className='app__pizzas'>
          {Object.entries(pizzas).map(([pizza, ings], i) => (
            <div className='app__pizza' id={'pizza-input-bg-' + i} key={i}>
              <input
                id={'pizza-input-' + i}
                type='radio'
                name={pizza}
                value={pizza}
                checked={selection === pizza}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelection(e.target.value);
                    setCustomIngs(ings.sort());

                    ClearChecked(baseIngs, 'custom-ings-input-');
                  } else
                    setCustomIngs((prev) =>
                      prev.filter((item) => item === pizza).sort()
                    );
                }}
              />
              <label htmlFor={'pizza-input-' + i}>&nbsp;{pizza}</label>
            </div>
          ))}
        </div>

        <div className='app__ings-cont'>
          <div className='app__ings'>
            {baseIngs.map((ing, i) => {
              return (
                <div key={i} className='app__ing'>
                  <input
                    id={'custom-ings-input-' + i}
                    type='checkbox'
                    name={ing}
                    onChange={(e) => {
                      if (e.target.checked)
                        setCustomIngs((prev) => [...prev, ing].sort());
                      else
                        setCustomIngs((prev) =>
                          prev.filter((item) => item !== ing).sort()
                        );
                    }}
                  />
                  <label htmlFor={'custom-ings-input-' + i}>&nbsp;{ing}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className='app__submit-btn'>
          <button name='add to order' type='submit'>
            add to order
          </button>
        </div>
      </form>
      <div className='app__orders'>
        <div>Orders</div>
        <div className='app__pizza-cards'>
          {orders.map((order, i) => (
            <div data-testid={'order-' + i} key={i}>
              <PizzaCard order_num={i} {...order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
