package routers

import "root/src/api/controllers/pizza"

func (r *router) PizzaRouter() {

	p := r.eng.Group("/pizza")
	{
		p.GET("", pizza.GetPizza)
	}
}
