import * as fs from "fs";
import {
  IAddPathDefinition,
  IOpenApiPathParameters,
  OpenApiBuilder,
  Validator,
} from "le-validator2";
import { SchemaGenerator } from "partial-responsify";
import { baseOpenApiRoutes as apiv1BaseRoute } from "../server/allRoutes/api/v1";
const sgen = new SchemaGenerator();
const validator = new Validator();
const oagenUrl = process.env.OAGEN_URL || "/api";
const openApiBuilder = new OpenApiBuilder({
  components: {
    securitySchemes: {
      apiKeyAuth: {
        in: "header",
        name: "Authorization",
        type: "apiKey",
      },
    },
  },
  info: {
    description: "OCBC Smart Building TCC API",
    title: "tcc-smart-trigger",
    version: "0.4.0",
  },
  openapi: "3.0.0",
  servers: [
    {
      description: "The default server",
      url: "{url}",
      variables: {
        url: {
          default: oagenUrl,
        },
      },
    },
  ],
});
for (const route of apiv1BaseRoute) {
  const pathDefinition: IAddPathDefinition = {
    description: typeof route.description === "string" ? route.description : "",
    operationId:
      route.method.toLowerCase() + route.path.replace(/\//g, "-").toLowerCase(),
    parameters: [],
    responses: {
      400: {
        content: {
          "application/json": {
            schema: {
              properties: {
                errorCode: {
                  type: "string",
                },
                errorDetails: {
                  items: {
                    properties: {
                      errorCode: {
                        type: "string",
                      },
                      errorDesc: {
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
                message: {
                  type: "string",
                },
              },
              type: "object",
            },
          },
        },
        description: "Bad Request, errorDetails only on errorCode EPV",
      },
    },
    tags: route.tags,
  };
  const params: IOpenApiPathParameters[] = route.get
    ? validator.generateParam(route.get, "query")
    : [];
  if (route.pathParams && route.pathParams.length) {
    const tmp = validator.generateParam(route.pathParams, "path");
    for (const param of tmp) {
      params.push(param);
    }
  }
  let security = false;
  if (route.headerParams && route.headerParams.length) {
    const tmp = validator.generateParam(route.headerParams, "header");
    for (const param of tmp) {
      if (param.name.toLowerCase() === "authorization") {
        security = true;
        continue;
      }
      params.push(param);
    }
  }
  if (typeof route.successResponseFormat !== "undefined") {
    pathDefinition.responses[200] = {
      content: {
        "application/json": {
          schema: sgen.generate(route.successResponseFormat),
        },
      },
      description: "OK",
    };
  } else {
    pathDefinition.responses[204] = {
      description: "No Content",
    };
  }
  if (security) {
    pathDefinition.security = [
      {
        apiKeyAuth: [],
      },
    ];
  }
  pathDefinition.parameters = params;
  if (route.bodyFormat) {
    console.log(route.bodyFormat);
    pathDefinition.requestBody = validator.generateRequestBody(
      route.bodyFormat
    );
  }
  openApiBuilder.addToPath(route.path, route.method, pathDefinition);
}
fs.writeFileSync(
  __dirname + "/swagger.json",
  JSON.stringify(openApiBuilder.buildSwaggerJson())
);