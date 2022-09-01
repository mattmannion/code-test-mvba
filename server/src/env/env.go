package env

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/spf13/viper"
)

type Cfg struct {
	Env  string `mapstructure:"ENV"`
	Port string `mapstructure:"PORT"`
	DSN  string `mapstructure:"DSN"`
}

var CFG Cfg

func LoadConfig() Cfg {
	viper.SetConfigFile("./.env")

	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
	}

	err = viper.Unmarshal(&CFG)

	if err != nil {
		fmt.Println(err)
	}

	return CFG
}

type Cookies struct {
	Set_Cookie sessions.Options
	Del_Cookie sessions.Options
}
