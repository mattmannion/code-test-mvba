package pizza

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPizza(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"pizzas": map[string][]string{
			"Cheese":    {"cheese"},
			"Pepperoni": {"cheese", "pepperoni"},
			"Vegetarian": {"cheese", "broccoli", "peppers",
				"onions", "spinach", "mushrooms", "tomatoes", "black olives"},
			"Meat Lover": {"cheese", "pepperoni", "sausage", "bacon"},
			"All In": {"cheese", "broccoli", "peppers",
				"onions", "spinach", "mushrooms", "tomatoes", "black olives",
				"pepperoni", "sausage", "bacon",
			},
			"Build My Own": {},
		},
		"ingredients": []string{
			"cheese",
			"pepperoni",
			"sausage",
			"bacon",
			"broccoli",
			"peppers",
			"onions",
			"spinach",
			"mushrooms",
			"tomatoes",
			"black olives",
		},
	})
}
