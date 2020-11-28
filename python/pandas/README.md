The notes in this directory were based on the Codecademy ["Learn Data Analysis with Pandas"](https://www.codecademy.com/learn/data-processing-pandas) course, taken March and June 2020.

The motivation was to understand enough of the basics of the library to start analyzing the Johns Hopkins COVID-19 data for my Covid by County project.  Getting that understanding was pretty quick, so I stopped working on the course.  In June, I picked it up again in order to finish it before subscription expiry and learn some more advanced concepts.

## Topics

### [pandas_basics.md](pandas_basics.md)

* [Creating DataFrames](pandas_basics.md#creating_a_dataframe)
* [Handling CSVs](pandas_basics.md#loading_and_saving_csvs)
* [General commands](pandas_basics.md#general_commands)
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

* [Column selection](pandas_selection.md#column_selection)
* [Row selection](pandas_selection.md#row_selection)
* [Setting indices](pandas_selection.md#setting_indices)
* [Accessing a value in a series](pandas_selection.md#accessing_a_value_in_a_series)
* [Page visits funnel (example)](pandas_selection.md#page_visits_funnel_project)


### [pandas_modification.md](pandas_modification.md)

* [Adding a column](pandas_modification.md#adding_a_column)
* [Performing column operations](pandas_modification.md#performing_column_operations)
   * `df.apply()`
   * `df.rename()`
   * `df.drop()`
* [Deleting rows matching a condition](pandas_modification.md#deleting_rows_matching_a_condition)
* [Modifying values with lambdas](pandas_modification.md#modifying_values_with_lambdas)

### [pandas_aggregates.md](pandas_aggregates.md)

* [Column statistics](pandas_aggregates.md#column_statistics)
* [Aggregate functions](pandas_aggregates.md#aggregate_functions)
   * `.groupby()`
   * `.reset_index()`
   * `.rename()`
   * `.apply()`
* [Pivot tables](pandas_aggregates.md#pivot_tables)

### [pandas_merges.md](pandas_merges.md)

* [Inner merge](pandas_merges.md#inner_merge)
* [Merge on specific columns](pandas_merges.md#merge_on_specific_columns)
* [Mismatched merges and outer merge](pandas_merges.md#mismatched_merges_and_outer_merge)
* [Left and right merge](pandas_merges.md#left_and_right_merge)
* [Concatenating DataFrames](pandas_merges.md#concatenating_dataframes)
