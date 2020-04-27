
## DataFrames

A DataFrame is a two-dimensional object.  Each column is a Series (rows are displayed in Series form, too).

One can create a DataFrame using a dictionary.  The dictionary keys represent column names, and the values are the column values.  Columns must be the same length.
```
df1 = pd.DataFrame({
    'name': ['John Smith', 'Jane Doe', 'Joe Schmo'],
    'address': ['123 Main St.', '456 Maple Ave.', '789 Broadway'],
    'age': [34, 28, 51]
})
```

If a DataFrame is created using lists instead, then the lists represent rows rather than columns.  Column names are supplied as an argument (this will result in the order being maintained).
```
df2 = pd.DataFrame([
    ['John Smith', '123 Main St.', 34],
    ['Jane Doe', '456 Maple Ave.', 28],
    ['Joe Schmo', '789 Broadway', 51]
    ],
    columns=['name', 'address', 'age']
)
```

Usually, DataFrames will be created from existing data.
```
df = pd.read_csv('my_csv_file.csv')
```

Whitespace before or after commas in CSV files is not stripped by Pandas.  Missing values are filled with `NaN`.  The `fillna()` can be used to replace `NaN` with `0` or `''`, for instance, and `dropna()` can be used to drop the row altogether.


## General commands

My sample data has the following form (some columns are omitted):
```
            Province/State Country/Region  ... Latitude  Longitude
90    San Diego County, CA             US  ...  32.7157  -117.1611
91    Snohomish County, WA             US  ...  48.0330  -121.8339
112             Boston, MA             US  ...  42.3601   -71.0589
[3 rows x 8 columns]
```

Command | Function
------- | --------
`print(df.info)` | display statistics for each column (see sample under this table)
`print(df.index)` | print the index (row labels)
`print(df.columns)` | print the column labels as a list (`Index([...])`))
`print(df.head(10))` | print first 10 rows (looks like sample data above)
`print(df.tail(10))` | print last 10 rows (looks like sample data above)
`print(type(column_name))` | print column data type (<class 'pandas.core.series.Series'>)
`print(type(df))` | print DataFrame data type (<class 'pandas.core.frame.DataFrame'>)
`rows, columns = df.shape` | store the number of rows and columns of the DataFrame
    
Printing the index:
```
Int64Index([ 41,  60,  81,  82,  88,  89,  90,  91, 112, 113, 114, 115, 116,
            117, 118, 119, 120, 122, 123, 124],
           dtype='int64')
```

DataFrame info:
```
<class 'pandas.core.frame.DataFrame'>
Int64Index: 20 entries, 41 to 124
Data columns (total 8 columns):
 #   Column          Non-Null Count  Dtype  
---  ------          --------------  -----  
 0   Province/State  20 non-null     object 
 1   Country/Region  20 non-null     object 
 2   Last Update     20 non-null     object 
 3   Confirmed       20 non-null     int64  
 4   Deaths          20 non-null     int64  
 5   Recovered       20 non-null     int64  
 6   Latitude        20 non-null     float64
 7   Longitude       20 non-null     float64
dtypes: float64(2), int64(3), object(3)
memory usage: 1.4+ KB
```

## Selection

Command | Selection
------- | --------
`df['age']` or `df.age` | select all the data in a column (using `.age` assumes that the column name follows Python rules for variable names))
`df['age'] == 30` | return a series with index and boolean
`df.loc[115]` | select row with index 115 (see sample under this table)
`df2 = df.reset_index())` | reset the index so that it counts sequentially again
`df2 = df.reset_index(drop=True))` | drop the extra column of old indices that would otherwise be added to the new DataFrame
`df.reset_index(inplace=True, drop=True)` | modify existing DataFrame in place
`df.iloc[8]` | select the 9th row (df contains 20 entries, so 0-19 are valid values) (works like Python list slicing)
`df.iloc[[2, 4, 5]]` | select the 3rd, 5th, and 6th rows
`df[1:-3]` | select all but the first and last three rows
`df[df.month == 'January']` | select all rows in which the month column contains 'January'
`df[(df.month == 'January') & (df.day == 'Monday')]`  | select all rows with a Monday in January
`df[df.month.isin(['January','February', 'March'])]` | select all rows matching the list elements


Printing the columns:
```
Index(['Province/State', 'Country/Region', 'Last Update', 'Confirmed',
       'Deaths', 'Recovered', 'Latitude', 'Longitude'],
      dtype='object')
```

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

## Modifying DataFrames

### Adding, re-assigning, renaming, and dropping columns

Command | Function
------- | --------
`df['Sold in Bulk?'] = ['Yes', 'Yes', 'No', 'No']` | add a new column to an existing DataFrame
`df.insert(2, 'Sold in Bulk?', ['Yes', 'Yes', 'No', 'No'])` | add a new column at a specific index (a variable can be used for data)
`df['Is taxed?'] = 'Yes'` | add a column with the same value in every row
`df['Margin'] = df.Price - df['Cost to Manufacture']` | add a column by performing a function on existing column(s)
`df['Name'] = df.Name.apply(upper)` | apply an operation to all elements in a column (must re-assign, no 'in-place')
`df['Lowercase Name'] = df.Name.apply(lower)` | apply the operation to all elements and store in new column
`df.columns = ['ID', 'Title', 'Category', 'Year Released', 'Rating']` | change column labels
`df.rename(columns={'name': 'movie_title'}, inplace=True)` | rename only specific columns (will create a new DataFrame without `inplace=True`)
`new_df = df[['col1', 'col4']]` | create a new DataFrame with only particular columns from the original
`df.drop('col3', axis=1, inplace=True)` | drop a specific column
`df.drop(['col3', 'col5'], axis=1, inplace=True)` | drop specific columns using a list

### Delete rows matching a condition

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

### Modifying values with lambdas

Use a lambda to create a new column:
```
get_last_name = lambda x: x.split()[-1]
df['last_name'] = df.name.apply(get_last_name)
```

Apply a lambda to a row when the function needs to access more than one column (this needs `axis=1` so Pandas will treat the new values as a column):
```
# Check for overtime worked and apply overtime pay to hours worked beyond 40.
total_earned = (lambda row: 
  (row.hourly_wage * 40) + (row.hourly_wage * 1.5 * (row.hours_worked - 40))
  if row.hours_worked > 40
  else row.hourly_wage * row.hours_worked
)
df['total_earned'] = df.apply(total_earned, axis=1)
```
Notice that a single column is not specified.

## Column statistics

General form: `df.column_name.command()`

Common commands:

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

