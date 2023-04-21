import { Pool } from "ibm_db";

export const dbPool = () => new Pool({ maxPoolSize: 10, autoCleanIdle: false });