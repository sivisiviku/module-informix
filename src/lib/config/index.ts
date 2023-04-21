export class Config {
    public port = "3800"; // process.env.NODE_PORT || "3004"; // temporary change from 3000 to 80
    // DB Config
    public dbDatabase = process.env.DB_DATABASE || "test";
    public dbHost =  process.env.DB_HOST || "localhost";
    public dbType = "informix" as const;
    public dbUsername =  process.env.DB_USERNAME || "informix";
    public dbPassword =  process.env.DB_PASSWORD || "in4mix";
    public dbPort =  process.env.DB_PORT || "9089";
    // public dbSchema =  process.env.DB_SCHEMA || "dbo";
    // public dbLogging = process.env.NODE_ENV === "development";
    // public dbMaxPool = Number.isNaN(parseInt(process.env.DB_MAX_POOL || "50", 10)) ? 50 : parseInt(process.env.DB_MAX_POOL || "50", 10);
    // public logger = process.env.LOGGER !== "FALSE";
    // public redisHost = process.env.REDIS_HOST; // temporary
    // public redisPassword = process.env.REDIS_PASSWORD; // temporary
    public mqType = 'rabbitMQ';
    public mqUsername = process.env.MQ_USERNAME || 'guest';
    public mqPassword = process.env.MQ_PASSWORD || 'guest';
}
