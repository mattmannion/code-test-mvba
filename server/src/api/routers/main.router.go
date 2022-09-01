package routers

import (
	"github.com/gin-gonic/gin"
)

type router struct {
	eng *gin.RouterGroup
}

func Routers(eng *gin.Engine) {
	r := &router{eng: eng.Group("/api")}
	{
		r.PizzaRouter()
	}
}
