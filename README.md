# Running and building

## Tested On
- Node v8.9.4
- NPM 6.1.0

## 1. Install modules
`npm i` or `yarn`

## 2. Building codes
`npm run build` or `yarn build`

## 3. Running
`npm start` or `yarn start`


---


# Guides

## Configuration
Modify `/src/lib/config/index.ts` OR just add environment variables used by the mentioned file.

## Adding entity
1. Create a new entity in `/src/entity`, then export it via `/src/entity/index.ts`
2. Import it to `/src/di/index.ts` then register it to entities field inside AppTypeOrm.

## Adding service
1. Add a new service in `/src/services`, then export it via `/src/services/index.ts`
2. Import it to `/src/di/index.ts` then register it to the di.

## Adding new controller
1. Add a file to `/src/server/allRoutes/api/v1/[METHOD]`.
2. Check you path, method, bodyFormat, queryFormat, pathFormat. Feel free to add, alter, or remove them.
3. Controller body are inside the function `func()`
4. Rename exported variables located at the bottom of the file to this format:
    - openapi[filename] (e.g. openapiGetCountries)
    - [filename] (e.g. getCountries)
5. Import the created controller to `/src/server/allRoutes/api/v1/index.ts` and register the imported variables to `routes` variable
6. Test your api

---
# Coding standard

## Naming
- Use clear and meaningful names! `customerService` is a lot more meaningful than `service`. Though, you can use `i`, `j`, `k` for basic looping.
- Use only _widely-known_ abbrevations. For example, XML, HTML, XAML are good, but not with SVC (service), SCR (score), DT (data). Those last three are mostly unrecognized.
- Use camelCase for variables and functions. Example:
    - userScore (good)
    - htmlBody (good)
    - writeToXML (good)
    - HTMLDocumentWriter (bad, leading abbrevations are written in lowercase)
    - parseAsXaml (bad, XAML is abbrevation)
- Use PascalCase for Classes, Interfaces and Modules. Example:
    - CustomerService (good)
    - XMLParser (good)
    - keyboardListener (bad, should be KeyboardListener)
    - MSNC
- Use camelCase for naming files. This is not a problem for Windows users, but a problem for Linux and Mac users.
- Use snake_case for naming table fields. total_score is good, but totalScore is a big nope.
> The linter will check the other standards not mentioned by the above rules. You may find your build is failed if your code didn't follow the standard.

## Structure
- Controllers can only access services. Direct access to repository is **STRICTLY PROHIBITED**.
- Controllers may have none or one or more than one services.
- Services can only have one repository or not at all. Having many repositories in a single service is **STRICTLY PROHIBITED**.
- Services may have none or one or more than one other services.
- Services are registered inside di. Only DI or Service may instantiate Service classes. Instantiation inside Controllers is **STRICTLY DISCOURAGED**
