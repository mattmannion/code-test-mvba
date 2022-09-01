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

function ClearChecked(arr: string[], el_id: string) {
  arr.forEach((_, i) => {
    const cb = document.getElementById(el_id + i) as HTMLInputElement;
    cb.checked = false;
  });
}

export function App() {
  const [pizzas, setPizzas] = useState<Pizzas>({} as Pizzas);
  const [selection, setSelection] = useState<string>('');
  const [baseIngs, setBaseIngs] = useState<Ings>([]);
  const [customIngs, setCustomIngs] = useState<Ings>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:7890/api/pizza')
      .then(({ data: { pizzas, ingredients } }) => {
        setPizzas(pizzas);
        setBaseIngs(ingredients.sort());
      });
  }, []);

  useEffect(() => {
    baseIngs
      .map(
        (_, i) =>
          document.getElementById('custom-ings-input-' + i) as HTMLInputElement
      )
      .forEach((cb, i) => {
        customIngs.forEach((ing) => {
          if (cb.name === ing) {
            cb.checked = true;
          }
        });
      });
  }, [selection]);

  return (
    <div className='app'>
      <form
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
        {Object.entries(pizzas).map(([pizza, ings], i) => (
          <div key={i}>
            <input
              id={'pizza-input-' + i}
              type='radio'
              name='pizzas'
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
            <label htmlFor={pizza}>&nbsp;{pizza}</label>
          </div>
        ))}
        <hr />
        {baseIngs.map((ing, i) => {
          return (
            <div key={i}>
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
              <label htmlFor={ing}>&nbsp;{ing}</label>
            </div>
          );
        })}
        <button type='submit'>add to order</button>
      </form>
      <div>
        orders:
        {orders.map((order, i) => (
          <pre key={i}>{JSON.stringify(order, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
}
