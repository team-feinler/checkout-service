# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

## CRUD API

  -POST
    -method: post
    -endpoint: '/priceandinventory/id/createRecord'
    -required body: record to insert. Must be a JSON object with these properties and data types:
      {
        id: NUMBER,
        price: NUMBER,
        inventory: NUMBER
      }
    -response: will return a status of 200 as well as the newly created record.  If the post fails, it will return a status of 404.

  -GET
    -method: get
    -endpoint: '/priceandinventory/id/:productId'
    -required body: N/A (just send the product ID number as a query param)
    -response: will return a status of 200 and an array containing one object, which is the requested record.  If request fails, will return status of 400 and the string 'Invalid product ID'
    -response format: array of length 1 with an object: [{id: NUMBER, price: NUMBER, inventory: NUMBER}]


  -PUT
    -method: update
    -endpoint: '/priceandinventory/id/updateRecord'
    -required body:
    -response: The new version of the desired record to be updated in the database in the same format as the POST route: {id: NUMBER, price: NUMBER, inventory: NUMBER}
    -response: Will return a status of 200 if successfully updated and also return the new record. If the update fails, it will return a status of 400.
    -response format: array of length 1 with an object: [{id: NUMBER, price: NUMBER, inventory: NUMBER}]

  -DELETE
    -method: delete
    -endpoint: '/priceandinventory/id/removeRecord/:productId'
    -required body: N/A (just send the product ID number as a query param)
    -response: if product is successfully deleted from database, the response will be a status of 200. If the record cannot be deleted from the database for any reason, the response will be 400.

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

