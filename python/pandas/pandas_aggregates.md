## Column statistics
---
General form: `df.column_name.command()`  
Example: `customers.age.nunique()`  

Command | Description
------- | -----------
mean | Average of all values in column
std | Standard deviation
median | Median
max | Maximum value in column
min | Minimum value in column
count | Number of values in column
nunique | Number of unique values in column
unique | List of unique values in column

## Aggregate functions
---
General form: `df.groupby('column1').column2.measurement()`

### Aggregate statistics

Example: `pricey_shoes = df.groupby('shoe_type').price.max()`
```
shoe_type
ballet flats    498
sandals         498
stilettos       468
wedges          488
Name: price, dtype: int64
```

### Reset index

The `pricey_shoes` object is a series, not a DataFrame.  To make it a DataFrame and make the shoe_type a column and not an index, use `reset_index()`:
```python
pricey_shoes = orders.groupby('shoe_type').price.max().reset_index()
print(pricey_shoes)
print(type(pricey_shoes))
```

```
      shoe_type  price
0  ballet flats    498
1       sandals    498
2     stilettos    468
3        wedges    488
<class 'pandas.core.frame.DataFrame'>
```

Of course, we can rename a column (aggregate or original):
```python
pricey_shoes = pricey_shoes.rename(columns={'shoe_type': 'shoe type'})
```

### Using lambdas and `apply()`

For more complicated operations, we can use `apply()` and lambda functions.  Lambda functions take a list of values as input.  For example, to find the 25th percentile for shoe price for each `shoe_color`, we can use:

```python
cheap_shoes = orders.groupby('shoe_color').price.apply(lambda x: np.percentile(x, 25)).reset_index()
```

### Group by more than one column

Pass a list to `groupby()`:
```python
shoe_counts = orders.groupby(['shoe_type', 'shoe_color'])['id'].count().reset_index()
```
gives:
```
	shoe_type	    shoe_color	id
0	ballet flats	black	    2
1	ballet flats	brown	    11
2	ballet flats	navy	    17
3	ballet flats	red	        13
4	ballet flats	white	    7
5	sandles	        black	    3
6	sandles	        brown	    10
7	sandles	        navy	    13
8	sandles	        red	        14
9	sandles	        white	    10
10	stilettos	    black	    8
11	stilettos	    brown	    14
12	stilettos	    navy	    7
13	stilettos	    red	        16
14	stilettos	    white	    5
15	wedges	        brown	    13
16	wedges	        navy	    16
17	wedges	        red	        4
18	wedges	        white	    17
```

That `['id']` bit is not intuitive to me, but that's the column to evaluate.  Oh, it's the same as using `.id`.

## Pivot tables
---
Instead of grouping by two columns and getting this:
```
Location 	Day of Week 	Total Sales
Chelsea 	M 	            300
Chelsea 	Tu 	            310
Chelsea 	W 	            320
Chelsea 	Th 	            290
…
```

it might be more useful if the data was formatted like this:
```
Location 	M 	Tu 	W 	Th 	F 	Sa 	Su
Chelsea 	400 	390 	250 	275 	300 	150 	175
West Village 	300 	310 	350 	400 	390 	250 	200
…
```

This is called **pivoting**, and the new table is called a **pivot table**.  Here's how to do it:
```python
df.pivot(columns='ColumnToPivot',
         index='ColumnToBeRows',
         values='ColumnToBeValues')
```
For the example above, the full code would be:
```python
# First use the groupby statement:
unpivoted = df.groupby(['Location', 'Day of Week'])['Total Sales'].mean().reset_index()
# Now pivot the table
pivoted = unpivoted.pivot(
    columns='Day of Week',
    index='Location',
    values='Total Sales').reset_index()
```

"Just like with `groupby`, the output of a pivot command is a new DataFrame, but the indexing tends to be 'weird', so we usually follow up with `.reset_index()`."

## Questions
---
Why does this work:
```python
ad_clicks['is_click'] = ~ad_clicks.ad_click_timestamp.isnull()
```
but not this:
```python
ad_clicks['is_click'] = ad_clicks.apply(lambda x: True if ~x.ad_click_timestamp.isnull() else False, axis=1)
```

There is not a better way to do this?:
```python
clicks_pivot['percent_clicked'] = clicks_pivot[True] / (clicks_pivot[True] + clicks_pivot[False])
print(clicks_pivot)
```
