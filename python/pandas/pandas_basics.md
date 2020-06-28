## Importing the Pandas module
---
Typically:
```python
import pandas as pd
```

## DataFrames
---
A DataFrame is a two-dimensional object.  Each column is a Series (rows are displayed in Series form, too).  Each column has a name (string), and each row has an index (integer).

## Creating a DataFrame
---
One can create a DataFrame using a dictionary.  The dictionary keys represent column names, and the values are the column values.  Columns must be the same length.
```python
df1 = pd.DataFrame({
    'name': ['John Smith', 'Jane Doe', 'Joe Schmo'],
    'address': ['123 Main St.', '456 Maple Ave.', '789 Broadway'],
    'age': [34, 28, 51]
})
```

If a DataFrame is created using lists instead, then the lists represent rows rather than columns.  Column names are supplied as an argument (this will result in the order being maintained).
```python
df2 = pd.DataFrame([
    ['John Smith', '123 Main St.', 34],
    ['Jane Doe', '456 Maple Ave.', 28],
    ['Joe Schmo', '789 Broadway', 51]
    ],
    columns=['name', 'address', 'age']
)
```

## Loading and saving CSVs
---
Usually, DataFrames will be created from existing data. Reading a CSV:
```python
df = pd.read_csv('my_csv_file.csv')
```

Writing a CSV:
```python
df.to_csv('new-csv-file.csv')
```

Whitespace before or after commas in CSV files is not stripped by Pandas.  Missing values are filled with `NaN`.  The `fillna()` method can be used to replace `NaN` with `0` or `''`, for instance, and `dropna()` can be used to drop the row altogether.

## General commands
---
My sample data has the following form (some columns are omitted):
```python
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
`print(df.size)` | print the number of rows * columns, I think
`print(len(df))` | print the number of rows of the DataFrame
    
Printing the index:
```python
Int64Index([ 41,  60,  81,  82,  88,  89,  90,  91, 112, 113, 114, 115, 116,
            117, 118, 119, 120, 122, 123, 124],
           dtype='int64')
```

DataFrame info:
```python
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