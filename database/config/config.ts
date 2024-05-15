interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

interface Config {
  [key: string]: DBConfig;
}

const config: Config = {
  development: {
    username: "postgres",
    password: "postgre",
    database: "binar_car_rental",
    host: "localhost",
    port: 5433,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "postgre",
    database: "binar_car_rental",
    host: "localhost",
    port: 5433,
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "postgre",
    database: "binar_car_rental",
    host: "localhost",
    port: 5433,
    dialect: "postgres"
  }
};

export default config;