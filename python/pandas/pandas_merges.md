## Inner merge
---

### Motivation

Sample tables:
```
orders:
	order_id	customer_id	product_id	quantity	timestamp
0	1	2	3	1	2017-01-01
1	2	2	2	3	2017-01-01
2	3	3	1	1	2017-01-01

products:
	product_id	description	price
0	1	thing-a-ma-jig	5
1	2	whatcha-ma-call-it	10
2	3	doo-hickey	7
3	4	gizmo	3

customers:
	customer_id	customer_name	address	phone_number
0	1	John Smith	123 Main St.	212-123-4567
1	2	Jane Doe	456 Park Ave.	949-867-5309
2	3	Joe Schmo	798 Broadway	112-358-1321
```

Without using `.merge()`, to find the description of the product from order 3, we might do the following:
```python
order_3_description = products[products.product_id == orders[orders.order_id == 3].product_id.values[0]].description.values[0]
```
Ouch.

Instead, we can use `merge()`, which "looks for columns that are common between two DataFrames, then looks for rows where those column’s values are the same, and then combines the matching rows into a single row in a new table."  In our examples, we're using columns like `product_id` and `customer_id`, but usually these would not be present; we would just have an `id` column in each table (see [Merge on specific columns](#merge-on-specific-columns) for information on how to deal with this more common use-case).

Example:
```python
new_df = pd.merge(orders, customers)
```

!!! note
    [`pandas.merge`](https://pandas.pydata.org/pandas-docs/version/0.23.4/generated/pandas.merge.html) takes only two DataFrames as parameters.

Each DataFrame also has its own `merge()` method, so the previous example could become:
```python
new_df = orders.merge(customers)
```
This allows chaining.

## Merge on specific columns
---
In the case in which two tables share a column name (like `id`), we can rename the columns before performing a merge:
```python
pd.merge(orders, customers.rename(columns={'id': 'customer_id'}))
```

Let's do this a better way.  In the following example, the 'left' table is the first one specified, and the 'right' one is the second.
```python
pd.merge(
    orders,
    customers,
    left_on='customer_id',
    right_on='id',
    suffixes=['_order', '_customer']
)
```
This will cause Pandas to rename the `id` columns `id_x` and `id_y` since it does not allow two columns to have the same name.  Defaults can be overridden using the `suffixes` argument. 

