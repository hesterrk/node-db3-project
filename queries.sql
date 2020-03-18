-- Multi-Table Query Practice


-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT ProductName, CategoryName
FROM Product
JOIN Category 
ON Product.CategoryId = Category.Id


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT "Order".Id, "Shipper".CompanyName
FROM "Order" 
JOIN "Shipper"
ON "Order".ShipVia = "Shipper".Id
WHERE "Order".OrderDate < '2012-08-09'




-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT "Product".ProductName, "OrderDetail".Quantity
FROM "Product"
JOIN "OrderDetail"
ON "Product".Id = "OrderDetail".ProductId
WHERE "OrderDetail".OrderId = 10251



-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
-- Order , Customer, Employee tables 

SELECT "Order".Id, "Customer".CompanyName AS CustomerCompany, "Employee".LastName AS EmployeeLastName
FROM "Order" 
JOIN "Employee" ON "Employee".Id = "Order".EmployeeId
JOIN "Customer" ON "Order".CustomerId = "Customer".Id


-- -   In [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top):
--     -   Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.

SELECT "CategoryName", COUNT(*) AS Count
FROM "Products" as p
JOIN "Categories"as c
ON c."CategoryId" = p."CategoryID"
GROUP BY p."CategoryID"


--  Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT "OrderID", SUM("Quantity") AS ItemCount
FROM "OrderDetails"
GROUP BY "OrderId"


-- Find the number of orders by each shipper
SELECT "Shippers".ShipperID, COUNT(*) AS Count
FROM "Orders"
JOIN "Shippers"
ON "Orders".ShipperID = "Shippers".ShipperID
GROUP BY "Orders".ShipperID



-- Find the top 5 best performing employees measured in orders

SELECT "Employees".FirstName, SUM(Quantity) as QuantitySold
FROM "Employees"
JOIN "Orders" ON "Employees".EmployeeID = "Orders".EmployeeID
JOIN "OrderDetails" ON "Orders".OrderID = "OrderDetails".OrderID
GROUP BY "Employees".EmployeeID
LIMIT 5



-- Find the customer country with the most orders

SELECT "Customers".Country, COUNT(*) as MostOrders
FROM "Customers"
JOIN "Orders" ON "Customers".CustomerID = "Orders".CustomerID
JOIN "OrderDetails" ON "Orders".OrderID = "OrderDetails".OrderID
GROUP BY "Customers".Country
ORDER BY "MostOrders" DESC
LIMIT 1



