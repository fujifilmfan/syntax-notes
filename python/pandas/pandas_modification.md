## Adding a column
Data used in the examples:
```python
df = pd.DataFrame([
  [1, '3 inch screw', 0.5, 0.75],
  [2, '2 inch nail', 0.10, 0.25],
  [3, 'hammer', 3.00, 5.50],
  [4, 'screwdriver', 2.50, 3.00]
],
  columns=['Product ID', 'Description', 'Cost to Manufacture', 'Price']
)
```

Command | Function
------- | --------
`df['Sold in Bulk?'] = ['Yes', 'Yes', 'No', 'No']` | add a new column to an existing DataFrame (the df has four rows)
`df.insert(2, 'Sold in Bulk?', ['Yes', 'Yes', 'No', 'No'])` | add a new column at a specific index (a variable can be used for data)
`df['Is taxed?'] = 'Yes'` | add a column with the same value in every row
`df['Margin'] = df.Price - df['Cost to Manufacture']` | add a column by performing a function on existing column(s)

## Performing column operations
Data used in the examples:
```python
df = pd.DataFrame([
  ['JOHN SMITH', 'john.smith@gmail.com'],
  ['Jane Doe', 'jdoe@yahoo.com'],
  ['joe schmo', 'joeschmo@hotmail.com']
],
columns=['Name', 'Email'])
```

Command | Function
------- | --------
`df['Name'] = df.Name.apply(upper)` | apply an operation to all elements in a column (must re-assign, no 'in-place')
`df['Lowercase Name'] = df.Name.apply(lower)` | apply the operation to all elements and store in new column
`new_df = df[['Lowercase Name', 'Email']]` | create a new DataFrame with only particular columns from the original
`df.columns = ['full name', 'lc full name', 'email']` | change column labels
`df.rename(columns={'lc full name': 'full lowercase name'}, inplace=True)` | rename only specific columns (will create a new DataFrame without `inplace=True`)
`df.drop('full lowercase name', axis=1, inplace=True)` | drop a specific column
`df.drop(['full name', 'full lowercase name'], axis=1, inplace=True)` | drop specific columns using a list

## Deleting rows matching a condition
**Step 1:** Create a boolean series with the condition:
`df['age'] == 30` will give a series like:
```
a False
b True
c False
```
**Step 2:** Create a new DataFrame with this series:
`df[df['age'] == 30]`

**Step 3:** Get the index names from the new DataFrame object:
`df[df['age'] == 30].index`

**Step 4:** Pass the Index object to dataframe.drop():
`df.drop(df[df['age'] == 30].index, inplace=True)`

**Step 5:** Putting it all together:
`indices = df[df['age'] == 30].index`  
`df.drop(indices, inplace=True)`  

## Modifying values with lambdas
Printed DataFrame used in the following examples:
```
	id	    name	            hourly_wage	hours_worked	last_name	total_earned
0	10310	Lauren Durham	    19	        43              Durham	    845.5
1	18656	Grace Sellers	    17	        40              Sellers	    680.0
2	61254	Shirley Rasmussen	16	        30              Rasmussen	480.0
3	16886	Brian Rojas	        18	        47              Rojas	    909.0
4	89010	Samantha Mosley	    11	        38              Mosley	    418.0
5	87246	Louis Guzman	    14	        39              Guzman	    546.0
6	20578	Denise Mcclure	    15	        40              Mcclure	    600.0
7	12869	James Raymond	    15	        32              Raymond	    480.0
8	53461	Noah Collier	    18	        35              Collier	    630.0
9	14746	Donna Frederick	    20	        41              Frederick	830.0
10	71127	Shirley Beck	    14	        32              Beck	    448.0
11	92522	Christina Kelly	    8	        44              Kelly	    368.0
12	22447	Brian Noble	        11	        39              Noble	    429.0
13	61654	Randy Key	        16	        38              Key	        608.0
14	16988	Diana Stewart	    14	        48              Stewart	    728.0
15	68619	Timothy Sosa	    14	        42              Sosa	    602.0
16	59949	Betty Skinner	    11	        48              Skinner	    572.0
17	81418	Janet Maxwell	    12	        38              Maxwell	    456.0
18	27267	Madison Johnston	20	        37              Johnston	740.0
19	19985	Virginia Nichols	13	        49              Nichols	    695.5
```

Use a lambda to create a new column:
```python
get_last_name = lambda x: x.split()[-1]
df['last_name'] = df.name.apply(get_last_name)
```

Apply a lambda to a row when the function needs to access more than one column (this needs `axis=1` so Pandas will treat the new values as a column).  Access row values using `row.column_name` or `row['column_name']`.  Note that instead of specifying a single column as in `df.name.apply()`, we need to leave out the column specifier:
```python
# Check for overtime worked and apply overtime pay to hours worked beyond 40.
total_earned = (lambda row: 
  (row.hourly_wage * 40) + (row.hourly_wage * 1.5 * (row.hours_worked - 40))
  if row.hours_worked > 40
  else row.hourly_wage * row.hours_worked
)
df['total_earned'] = df.apply(total_earned, axis=1)
```
