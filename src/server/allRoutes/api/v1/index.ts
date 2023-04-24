import { IAllRoute, IOpenApiRoute } from "../../../../interface";

// ROUTE CONTROLER IMPORTS
// GET ROUTES
import { openapiGetCustomer, getCustomer } from "./get/getCustomer";

// POST ROUTES
import { openapiPostFloor, postFloor } from "./post/postFloor";
import { openapiPostArea, postArea } from "./post/postArea";
import { openapiPostDevice, postDevice } from "./post/postDevice";
import { openapiPostCustomer, postCustomer } from "./post/postCustomer";

// PUT ROUTES
import { openapiUpdateFloor, updateFloor } from "./put/putFloor";
import { openapiUpdateArea, updateArea } from "./put/putArea";
import { openapiUpdateDevice, updateDevice } from "./put/putDevice";
import { openapiUpdateCustomer, updateCustomer } from "./put/putCustomer";

// DELETE ROUTES
import { openapiDeleteFloor, deleteFloor } from "./delete/deleteFloor";
import { openapiDeleteArea, deleteArea } from "./delete/deleteArea";
import { openapiDeleteDevice, deleteDevice } from "./delete/deleteDevice";



interface IRouteTuple {
    0: IOpenApiRoute;
    1: IAllRoute;
}

// REGISTER THE ROUTE CONTROLLER HERE
const routes: IRouteTuple[] = [
    //GET ROUTES
    [openapiGetCustomer, getCustomer],

    // POST ROUTES
    [openapiPostFloor, postFloor],
    [openapiPostArea, postArea],
    [openapiPostDevice, postDevice],
    [openapiPostCustomer, postCustomer],

    // PUT ROUTES
    [openapiUpdateFloor, updateFloor],
    [openapiUpdateArea, updateArea],
    [openapiUpdateDevice, updateDevice],
    [openapiUpdateCustomer, updateCustomer],

    // DELETE ROUTES
    [openapiDeleteFloor, deleteFloor],
    [openapiDeleteArea, deleteArea],
    [openapiDeleteDevice, deleteDevice],
];
const tmpBaseOpenApiRoutes: IOpenApiRoute[] = [];
const tmpBaseRoutes: IAllRoute[] = [];
for (const route of routes) {
    if (!route[1].path.startsWith("/v1/") || !route[0].path.startsWith("/v1/")) {
        // tslint:disable-next-line: no-console
        console.log(route[1]);
        throw new Error("path should start with v1");
    }
    tmpBaseOpenApiRoutes.push(route[0]);
    tmpBaseRoutes.push(route[1]);
}

// seperate the route to openapi and application route, future easier to extend
export const baseOpenApiRoutes: IOpenApiRoute[] = tmpBaseOpenApiRoutes;
export const baseRoutes: IAllRoute[] = tmpBaseRoutes;
