The notes in this directory were based on the Codecademy ["Learn Data Analysis with Pandas"](https://www.codecademy.com/learn/data-processing-pandas) course, taken March and June 2020.

The motivation was to understand enough of the basics of the library to start analyzing the Johns Hopkins COVID-19 data for my Covid by County project.  Getting that understanding was pretty quick, so I stopped working on the course.  In June, I picked it up again in order to finish it before subscription expiry and learn some more advanced concepts.

## Topics

### [pandas_basics.md](pandas_basics.md)

* [Creating DataFrames](pandas_basics.md#creating-a-dataframe)
* [Handling CSVs](pandas_basics.md#loading-and-saving-csvs)
* [General commands](pandas_basics.md#general-commands)
   * `df.info`
   * `df.index`
   * `df.columns`
   * `df.head()`
   * `df.tail()`
   * `df.type()`
   * `df.shape`
   * `df.size`
   * `len(df)`

### [pandas_selection.md](pandas_selection.md)

* [Column selection](pandas_selection.md#column-selection)
* [Row selection](pandas_selection.md#row-selection)
* [Setting indices](pandas_selection.md#setting-indices)
* [Accessing a value in a series](pandas_selection.md#accessing-a-value-in-a-series)
* [Page visits funnel (example)](pandas_selection.md#page-visits-funnel-project)

### [pandas_modification.md](pandas_modification.md)

* [Adding a column](pandas_modification.md#adding-a-column)
* [Performing column operations](pandas_modification.md#performing-column-operations)
   * `df.apply()`
   * `df.rename()`
   * `df.drop()`
* [Deleting rows matching a condition](pandas_modification.md#deleting-rows-matching-a-condition)
* [Modifying values with lambdas](pandas_modification.md#modifying-values-with-lambdas)

### [pandas_aggregates.md](pandas_aggregates.md)

* [Column statistics](pandas_aggregates.md#column-statistics)
* [Aggregate functions](pandas_aggregates.md#aggregate-functions)
   * `.groupby()`
   * `.reset_index()`
   * `.rename()`
   * `.apply()`
* [Pivot tables](pandas_aggregates.md#pivot-tables)

### [pandas_merges.md](pandas_merges.md)

* [Inner merge](pandas_merges.md#inner-merge)
* [Merge on specific columns](pandas_merges.md#merge-on-specific-columns)
* [Mismatched merges and outer merge](pandas_merges.md#mismatched-merges-and-outer-merge)
* [Left and right merge](pandas_merges.md#left-and-right-merge)
* [Concatenating DataFrames](pandas_merges.md#concatenating-dataframes)
