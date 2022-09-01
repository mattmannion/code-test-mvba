package main

import (
	"fmt"
	"root/src/api/routers"
	"root/src/env"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := env.LoadConfig()

	gin.SetMode(gin.ReleaseMode)

	s := gin.New()

	s.Use(gin.Logger())
	s.Use(gin.Recovery())

	s.SetTrustedProxies([]string{""})

	s.Use(cors.Default())

	routers.Routers(s)

	fmt.Println("live @ http://localhost" + cfg.Port)
	s.Run(cfg.Port)
}
