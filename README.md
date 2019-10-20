# E-commerce - Footrauma





## User API 

### Login User | Log in user through form

- #### URL

  > /users/login

- #### Method

  > POST

- #### Body

  > email
  >
  > password

- #### Success Response

  > Status: 200 => {token, username, role}

- #### Error Response

  > Status: 404 => { "message": "User does not exist"} / {"message": "Invalid Password"}



### Register User

- #### URL

  > /users/register

- #### Method

  > POST

- #### Body

  > username
  >
  > password
  >
  > email

- #### Success Response

  > Status: 201 => {"message": "User Created"}

- ### Error Response

  > Status: 400 => validation error, user already registered



### Add User Cart (Authenticate)

- #### URL

  > /users/cart/:id

- #### Method

  > PATCH

- #### Headers

  > token

- #### Success Responseo

  > Status: 200 => item registered to cart

- ### Error Response

  > Status: 401 => Need login first



### Get User Cart (Authenticate)

- #### URL

  > /users/cart

- #### Method

  > GET

- #### Headers

  > token

- #### Success Responseo

  > Status: 200 => [{cart in user}...]

- ### Error Response

  > Status: 401 => Need login first



### Delete User Cart (Authenticate)

- #### URL

  > /users/cart

- #### Method

  > DELETE

- #### Headers

  > token

- #### Success Responseo

  > Status: 200 => delete successful

- ### Error Response

  > Status: 401 => Need login first





## Product API

### Get ALL Products 

- #### URL

  > /products

- #### Method

  > GET

- #### Success Response

  > Status: 200 => [products...]
  >
  
- ### Error Response

  > Status: 500 => Internal Server Error 



### Get ALL Products with Type Specified

- #### URL

  > /products/itemType/:itemType

- #### Method

  > GET

- #### Success Response

  > Status: 200 => [products...]

- ### Error Response

  > Status: 500 => Internal Server Error 



### Add New Product (Authenticate, Authorize)

- #### URL

  > /products

- #### Method

  > POST

- #### Headers

  > token

- #### Body

  > itemName
  >
  > description
  >
  > price
  >
  > qty
  >
  > image
  >
  > itemType

- #### Success Response

  > Status: 201 => {new product}
  >
  
- ### Error Response

  > Status: 500 => Internal Server Error 
  >
  > Status 400 => validation error
  >
  > Status: 401 => not authorized
  
  

### Delete Product (Authenticate, Authorize)

- #### URL

  > /products/:id

- #### Method

  > DELETE

- #### Headers

  > token

- #### Params

  > product Id

- #### Success Response

  > Status: 200 => delete successfull
  >
  
- ### Error Response

  > Status: 401 => not authorized 
  >
  > Status: 500 => Internal Server Error 



### Update Product (Authenticate, Authorize)

- #### URL

  > /products/:id

- #### Method

  > PUT

- #### Headers

  > token

- #### Params

  > product Id

- #### Body

  > itemName
  >
  > description
  >
  > price
  >
  > qty
  >
  > image
  >
  > itemType

- #### Success Response

  > Status: 200 => update successfull

- ### Error Response

  > Status: 401 => not authorized 
  >
  > Status: 500 => Internal Server Error 
