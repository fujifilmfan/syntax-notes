## Column selection

Command | Selection
------- | --------
`df['age']` or `df.age` | select all the data in a column (using `.age` assumes that the column name follows Python rules for variable names))
`df[['last_name', 'email']]` | select the `last_name` and `email` columns using a list of those column names
`df['age'] == 30` | return a series with index and boolean

Printing the columns:
```
Index(['Province/State', 'Country/Region', 'Last Update', 'Confirmed',
       'Deaths', 'Recovered', 'Latitude', 'Longitude'],
      dtype='object')
```

## Row selection

Command | Selection
------- | --------
`df.loc[115]` | select row with index 115 (see sample under this table); the row with index 115 is not necessarily the 115th item, as rows might have been removed (see [Setting indices](#setting-indices) below)
`df.iloc[8]` | select the 9th row (df contains 20 entries, so 0-19 are valid values) (works like Python list slicing) ('iloc' like 'integer-location')
`df.iloc[[2, 4, 5]]` | select the 3rd, 5th, and 6th rows
`df[1:-3]` | select all but the first and last three rows
`df[df.month == 'January']` | select all rows in which the month column contains 'January'
`df[(df.month == 'January') & (df.day == 'Monday')]`  | select all rows with a Monday in January (use `|` for 'OR')
`df[df.month.isin(['January','February', 'March'])]` | select all rows matching the list elements
`df.head(10)` | select first 10 rows, not including the header
`df.tail(10)` | select last 10 rows, not including the header
`df[df.column1.isnull()]` | return a DataFrame consisting only of rows for which column1 has null values


Printing a single row:
```
Province/State            Madison, WI
Country/Region                     US
Last Update       2020-02-05T21:53:02
Confirmed                           1
Deaths                              0
Recovered                           0
Latitude                      43.0731
Longitude                    -89.4012
Name: 115, dtype: object
```

## Setting indices

Command | Selection
------- | --------
`df2 = df.reset_index()` | reset the index so that it counts sequentially again
`df2 = df.reset_index(drop=True)` | drop the extra column of old indices that would otherwise be added to the new DataFrame
`df.reset_index(inplace=True, drop=True)` | modify existing DataFrame in place

## Accessing a value in a series
If we have an `orders` table, then `orders[orders.order_id == 3]` gives a series (the row or rows that match). To get the value of a column in that row, we can do:
```python
my_order = orders[orders.order_id == 3]
my_product = my_order.product_id.values[0]
```

## Page visits funnel (project)
Original CSVs can be found in `cool_t-shirts_inc/` locally.

```python
import codecademylib
import pandas as pd

# These all contain a column with user_id and some time.
visits = pd.read_csv('visits.csv',
                     parse_dates=[1])
cart = pd.read_csv('cart.csv',
                   parse_dates=[1])
checkout = pd.read_csv('checkout.csv',
                       parse_dates=[1])
purchase = pd.read_csv('purchase.csv',
                       parse_dates=[1])
# print(visits.head)
# print(cart.head)
# print(checkout.head)
# print(purchase.head)
# print(visits.shape)  # (2000, 2)
# print(visits.user_id.nunique())  # 2000 unique
# print(cart.shape)  # (400, 2)  348 unique
# print(checkout.shape)  # (360, 2)  226 unique
# print(purchase.shape)  # (252, 2)  144 unique

visits_cart = pd.merge(visits, cart, how='left')
# print(len(visits_cart))  # 2052

# Rows with null values in cart_time represent users that did not add a T-Shirt to their cart.
# print(len(visits_cart[visits_cart.cart_time.isnull()]))  # 1652

shirt_in_cart = len(cart)
no_shirt_in_cart = len(visits_cart[visits_cart.cart_time.isnull()])
number_visitors = len(visits)
number_visitors2 = visits_cart[visits_cart.visit_time.notnull()]
# print(number_visitors2.user_id.nunique())  # 2000 unique, but its 2052 long, so some users are repeated

percent_cart1 = (float(no_shirt_in_cart) / float(number_visitors)) * 100
percent_cart2 = ((float(number_visitors) - float(shirt_in_cart)) / float(number_visitors)) * 100
# print(percent_cart1)  # 82.6%  use this one
# print(percent_cart2)  # 80.0%

cart_checkout = pd.merge(cart, checkout, how='left')
# print(len(cart_checkout[cart_checkout.checkout_time.isnull()]))  # 126
shirt_in_checkout = len(checkout)
no_shirt_in_checkout = len(cart_checkout[cart_checkout.checkout_time.isnull()])
percent_checkout = (float(no_shirt_in_checkout) / float(shirt_in_checkout)) * 100
# print(percent_checkout)  # 35.0

all_data = visits.merge(cart, how='left').merge(checkout, how='left').merge(purchase, how='left')
# print(all_data.head)

checkout_purchase = pd.merge(checkout, purchase, how='left')
shirt_purchased = len(purchase)
no_shirt_purchased = len(all_data[all_data.checkout_time.notnull()])
no_shirt_purchased2 = len(checkout_purchase[checkout_purchase.purchase_time.isnull()])
# print(shirt_purchased)
# print(no_shirt_purchased)
# print(no_shirt_purchased2)
percent_no_purchase_f_checkout = (float(no_shirt_purchased2) / float(shirt_purchased)) * 100
# print(percent_no_purchase_f_checkout)  # 40.1

number_of_visits = len(all_data[all_data.visit_time.notnull()])
number_in_cart = len(all_data[all_data.cart_time.notnull()])
number_in_checkout = len(all_data[all_data.checkout_time.notnull()])
number_purchases = len(all_data[all_data.purchase_time.notnull()])
print(number_of_visits, number_in_cart, number_in_checkout, number_purchases)
percent_visit_to_cart = (float(number_in_cart) / float(number_of_visits)) * 100
percent_cart_to_checkout = (float(number_in_checkout) / float(number_in_cart)) * 100
percent_checkout_to_purchase = (float(number_purchases) / float(number_in_checkout)) * 100
print(percent_visit_to_cart, percent_cart_to_checkout, percent_checkout_to_purchase)  # (36.31457208943716, 86.62420382165605, 85.29411764705883)

all_data['time_to_purchase'] = all_data.purchase_time - all_data.visit_time
# print(all_data.time_to_purchase)
print(all_data.time_to_purchase.mean())  # 0 days 00:44:02.672413
```
