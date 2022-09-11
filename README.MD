this project has been made follwing :
-postgres
-sql
toget the user
-create user localhost:5000/users
provide info
EX:   id: 1,
      username: 'kero',
      password: 'hello',
      firstname: 'kerolos',
      lastname: 'hanna'
 to show one user
 localhost:5000/users/id
 localhost:5000/users =>get show all users
 -create products localhost:5000/products
provide info
EX:  id: 1,
      name: 'kero',
      price: 300
 to show one product
 localhost:5000/product/id
 localhost:5000/products =>get show all products
 -create user localhost:5000/oorders
provide info
EX:     id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
 to show one current order
 localhost:5000/orders/user_id
 localhost:5000/orders =>(get) show all orders
 
