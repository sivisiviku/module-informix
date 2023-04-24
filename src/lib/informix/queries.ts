import { dbPool } from "./pool";
import { Config } from "..";


export class Informix {
    private config = new Config();
    private connStr = `DATABASE=${this.config.dbDatabase};HOSTNAME=${this.config.dbHost};UID=${this.config.dbUsername};PWD=${this.config.dbPassword};PORT=${this.config.dbPort};`;
    private dbObj = null

    constructor() {
        this.dbObj = dbPool().openSync(this.connStr);
    }

    public findAll(tableName: string) {
        const query = `SELECT * FROM ${tableName}`
        const respData: any = this.dbObj.querySync(query);

        if(respData.error) {
            console.log(respData.error);
            this.dbObj.close();
            return {
                status: 400,
                message: `Cannot Find Records in Database. ${respData.error}`,
                error: respData.error
            };
        }
        this.dbObj.close();
        return {
            status: 200,
            data: respData
        };
    }

    public findAllByColumn(tableName: string, column: string, value: string) {
        const query = `SELECT * FROM ${tableName} WHERE ${column} = "${value}"`;
        const respData: any = this.dbObj.querySync(query);

        if(respData.error) {
            console.log(respData.error);
            this.dbObj.close();
            return {
                status: 400,
                message: `Cannot Find Records in Database. ${respData.error}`,
                error: respData.error
            };
        }
        this.dbObj.close();
        return {
            status: 200,
            data: respData
        };
    }

    public findOne(tableName: string, column: string, value: number) {
        const query = `SELECT * FROM ${tableName} WHERE ${column} = "${value}"`;
        const respData: any = this.dbObj.querySync(query);

        if(respData.error) {
            console.log(respData.error);
            this.dbObj.close();
            return {
                status: 400,
                message: `Cannot Find Records in Database. ${respData.error}`,
                error: respData.error
            };
        }
        if(respData.length < 1) {
            this.dbObj.close();
            return {
                status: 400,
                message: `Cannot Find Records in Database.`,
                error: `No ${column} with value ${value}.`,
            };
        }
        this.dbObj.close();
        return {
            status: 200,
            data: respData[0]
        };
    }

    public insertData(tableName: string, data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const mappedFields = Object.keys(data);
            const mappedValues = Object.values(data);
            const query = `INSERT INTO ${tableName} (${mappedFields.join(',')}) VALUES (${"?,".repeat(mappedFields.length - 1)}?);`
            const respData: any = this.dbObj.querySync({sql: query, params: mappedValues});

            if(respData.error) {
                console.log(respData.error);
                this.dbObj.close();
                return reject({
                    status: 500,
                    message: `Cannot Add Records to Database. ${respData.error}`,
                    error: respData.error
                });
            }
            this.dbObj.close();
            return resolve({
                status: 201,
                message: `Data Added`,
                data: respData
            });
        }); 
    }

    public updateByColumn(tableName: string, data: any, identifierColumn: string, identifierValue: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const mappedFields = Object.keys(data);
            const mappedValues = Object.values(data);
            const query = `UPDATE ${tableName} SET (${mappedFields.join(',')}) = (${"?,".repeat(mappedFields.length - 1)}?) WHERE ${identifierColumn} = ${identifierValue};`;
            const respData: any = this.dbObj.querySync({ sql: query, params: mappedValues });

            if(respData.error) {
                console.log(respData.error);
                this.dbObj.close();
                return reject({
                    status: 500,
                    message: `Cannot Update Records in Database. ${respData.error}`,
                    error: respData.error
                });
            }
            this.dbObj.close();
            return resolve({
                status: 200,
                message: `Record ${identifierColumn} ${identifierValue} Updated.`,
            });
        });
    }

    public deleteData(tableName: string, column: string, value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const query = `DELETE FROM ${tableName} WHERE ${column} = "${value}";`;
            const respData: any = this.dbObj.querySync(query);

            if(respData.error) {
                console.log(respData.error);
                this.dbObj.close();
                return reject({
                    status: 500,
                    message: `Cannot Delete Records in Database. ${respData.error}`,
                    error: respData.error
                });
            }
            this.dbObj.close();
            return resolve({
                status: 200,
                message: `Record ${column} ${value} Deleted`,
            });
        });
    }

    public rawQuery(query: string) {
        const respData: any = this.dbObj.querySync(query);

        if(respData.error) {
            console.warn(respData.error);
            return {
                status: 500,
                message: `Cannot Get Records from Database.`,
                error: respData
            }
        }
        return {
            status: 200,
            data: respData
        }
    }
}