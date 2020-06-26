## Column selection
---

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
---

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
---

Command | Selection
------- | --------
`df2 = df.reset_index()` | reset the index so that it counts sequentially again
`df2 = df.reset_index(drop=True)` | drop the extra column of old indices that would otherwise be added to the new DataFrame
`df.reset_index(inplace=True, drop=True)` | modify existing DataFrame in place

## Access a value in a series
---

If we have an `orders` table, then `orders[orders.order_id == 3]` gives a series (the row or rows that match). To get the value of a column in that row, we can do:
```python
my_order = orders[orders.order_id == 3]
my_product = my_order.product_id.values[0]
```
