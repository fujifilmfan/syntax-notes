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
Ouch.  We need a better way.

### `merge()`
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

## Mismatched merges and outer merge
---
During an inner merge, rows that have no match will not be included in the resulting DataFrame.

An outer join will include all rows from both tables even if they don't match.  Missing values get `None` or `nan`.

Sample data:
```
Store A inventory:
	item	store_a_inventory
0	hammer	12
1	screwdriver	15
2	nails	200

Store B inventory:
	item	store_b_inventory
0	hammer	6
1	nails	250
2	rake	10
```

We can join these with:
```python
store_a_b_outer = pd.merge(store_a, store_b, how='outer')
```

Can we chain outer merges?  It seems so:
```python
store_a_b_outer = store_a.merge(store_b, how='outer')
```

Printing the result gives:
```
Combined inventory:
	item	    store_a_inventory	store_b_inventory
0	hammer	    12.0	            6.0
1	screwdriver	15.0	            nan
3	nails	    200.0               250.0
2	rake	    nan	                10.0
```

## Left and right merge
---
"A left merge includes all rows from the first (left) table, but only rows from the second (right) table that match the first table."  Use this to answer the question, "Which rows exist in the left table (based on the first column's value) but not in the right table?"

Right merge is the opposite.

Using the same sample data as before, to find out what inventory is in Store A but not in Store B, we can use a left merge:
```python
store_a_b_left = pd.merge(store_a, store_b, how='left')
```

This gives:
```
	item	    store_a_inventory	store_b_inventory
0	hammer	    12	                6.0
1	screwdriver	15	                nan
2	nails	    200	                250.0
```

To find what Store B has that Store A doesn't have, use a left merge but in reverse:
```python
store_b_a_left = pd.merge(store_b, store_a, how='left')
# We could also do:
store_a_b_right = pd.merge(store_a, store_b, how='right')
```

This gives:
```
	item	store_b_inventory	store_a_inventory
0	hammer	6	                12.0
1	nails	250	                200.0
2	rake	10	                nan
```

## Concatenate DataFrames
---
Concatenation is used to combine smaller DataFrames with the same data structure into a larger DataFrame:

General form: `pd.concat([df1, df2])`

## Review
---
Data structure (for an e-commerce site):
```
Visits:
	user_id	visit_time
0	319350b4-9951-47ef-b3a7-6b252099905f	2017-02-21 07:16:00
1	7435ec9f-576d-4ebd-8791-361b128fca77	2017-05-16 08:37:00
2	0b061e73-f709-42fa-8d1a-5f68176ff154	2017-04-12 19:32:00
...

Checkouts: 
	user_id	checkout_time
0	fe90a9f4-960a-4a0d-9160-e562adb79365	2017-11-09 09:25:00
1	1a35b7eb-f603-407d-91be-a2c3304066fd	2017-08-15 21:25:00
2	e2c24ee0-7fdf-4400-abde-b36378fe5ce6	2017-07-04 15:39:00
...
```

Find the time from a user's initial visit to the website to when they start to check out.
```python
v_to_c = visits.merge(checkouts)
v_to_c['time'] = v_to_c.checkout_time - v_to_c.visit_time
print(v_to_c.time.mean())
print(v_to_c.time.max())
print(v_to_c.time.min())
```

This gives:
```
[80 rows x 4 columns]
0 days 00:15:24.750000
0 days 00:29:00
0 days 00:00:00
```