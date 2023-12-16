package conf

import (
	"os"
	"strconv"
	"github.com/joho/godotenv"
)

const (
	PROJECT_BASE_DIR = "/go/src/api/"
)

var (
	DatabaseHost     string
	DatabasePort     int
	DatabaseName     string
	DatabaseUser     string
	DatabasePassword string
	DatabaseTimezone string
)

func init() {
	err := godotenv.Load(PROJECT_BASE_DIR + ".env")
	if err != nil {
		panic("Failed to initialize config.")
	}

	DatabaseHost = os.Getenv("DATABASE_HOST")
	databasePort, err := strconv.Atoi(os.Getenv("DATABASE_PORT"))
	if err != nil {
		panic("Invalid database port.")
	}
	DatabasePort = databasePort
	DatabaseName = os.Getenv("DATABASE_NAME")
	DatabaseUser = os.Getenv("DATABASE_USER")
	DatabasePassword = os.Getenv("DATABASE_PASSWORD")
	DatabaseTimezone = os.Getenv("DATABASE_TIMEZONE")
}
