# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products - For development use http://localhost:3000 as your domain. Replace it with your actual domain in production.
- Index - http://localhost:3000/products
- Show - http://localhost:3000/product/id    where id is the id number of the product
- Create [token required] - http://localhost:3000/product
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] - http://localhost:3000/users
- Show [token required] - http://localhost:3000/user/id  where id is the id number of the user
- Create [token required] - http://localhost:3000/user
- Authenticate - http://localhost:3000/user/authenticate

#### Orders
- Index [token required] - http://localhost:3000/orders
- Show [token required] - http://localhost:3000/order/id where id is the order id
- Create [token required] - http://localhost:3000/order
-  AddProduct by user [token required] - http://localhost:3000/orders/id/product where id is the order id
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- password_digest

#### Orders
- id
- productId
- quantity of each product in the order
- user_id
- status of order (active or complete)

