Start here: https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-search.html

Search by ID (https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-id-field.html):  
```
GET xml_metadata/_search
{
  "query": {
    "terms": {
      "_id": [ "USGS:f457f5b3-a855-4bd9-864c-5ff71e4473e5" ] 
    }
  }
}
```

Search by IDs (https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html):  
```
GET xml_metadata/_search
{
  "query": {
    "ids" : {
      "values" : ["USGS:f457f5b3-a855-4bd9-864c-5ff71e4473e5"]
    }
  }
}
```

Scroll (https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#scroll-search-results):  
```
GET xml_metadata/_search?scroll=5m
{
  "_source": ["harvestInfo.harvestsource"],
  "size": 1000,
  "sort": ["_doc"]
}

GET _search/scroll
{
  "scroll": "5m",
  "scroll_id": "FGluY2x1ZGVfY29udGV4dF91dWlkDnF1ZXJ5VGhlbkZldGNoBRQxeURJaEhzQlZaTE0tVDFmVXBNLQAAAAAAAAWYFktNTzU5U1pTUTBtUEpkZmxHY3FSekEUMkNESWhIc0JWWkxNLVQxZlVwTS0AAAAAAAAFlhZLTU81OVNaU1EwbVBKZGZsR2NxUnpBFDFpREloSHNCVlpMTS1UMWZVcE0tAAAAAAAABZcWS01PNTlTWlNRMG1QSmRmbEdjcVJ6QRQyU0RJaEhzQlZaTE0tVDFmVXBNLQAAAAAAAAWVFktNTzU5U1pTUTBtUEpkZmxHY3FSekEUMmlESWhIc0JWWkxNLVQxZlVwUHQAAAAAAAAFmRZLTU81OVNaU1EwbVBKZGZsR2NxUnpB"
}
```

Aggregation to get number of unique values for nested field (https://stackoverflow.com/questions/57802720/how-can-i-get-distinct-values-of-nested-fields-in-elasticsearch):  
```
GET xml_metadata/_search
{
"size":0,
"aggregations": {
    "distinct_values": {
      "terms": {
        "field": "harvestInfo.harvestsource.keyword",
        "size": 1000,
        "min_doc_count": 1,
        "order": [
          {
            "_count": "desc"
          },
          {
            "_key": "asc"
          }
        ]
      }
    }
}}
```
Response:  
```
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 10000,
      "relation" : "gte"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "distinct_values" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "ScienceBase",
          "doc_count" : 13046
        },
        {
          "key" : "Coastal & Marine Geoscience Data System",
          "doc_count" : 5502
        },
        {
          "key" : "Water NSDI Node",
          "doc_count" : 1678
        },
        {
          "key" : "NURE",
          "doc_count" : 1637
        },
        {
          "key" : "Alaska Science Center",
          "doc_count" : 339
        },
        {
          "key" : "Individual Metadata Uploader",
          "doc_count" : 65
        }
      ]
    }
  }
}
```


GET xml_metadata/_search
{
  "query": {
    "match_all": {}
  }
}

GET xml_metadata/_search
{
  "size": 100,
  "query": {
    "ids" : {
      "values" : ["USGS:e9558c6a-42b6-4181-980b-f3f258b14fb7"]
    }
  }
}

GET xml_metadata/_settings
GET xml_metadata/_mapping

GET xml_metadata/_search?scroll=5m
{
  "_source": ["datasource", "harvestInfo"],
  "size": 1000,
  "sort": ["_doc"]
}

GET _search/scroll
{
  "scroll": "5m",
  "scroll_id": "DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAxmEFmkzOFExUUNHUWR1V1VsYVp5SU9KQXcAAAAAAAMZhhZpMzhRMVFDR1FkdVdVbGFaeUlPSkF3AAAAAAADGYcWaTM4UTFRQ0dRZHVXVWxhWnlJT0pBdwAAAAAAAxmFFmkzOFExUUNHUWR1V1VsYVp5SU9KQXcAAAAAAAMZiBZpMzhRMVFDR1FkdVdVbGFaeUlPSkF3"
}

GET _search/scroll/_all

GET xml_metadata/_search
{
"size":0,
"aggregations": {
    "distinct_values": {
      "terms": {
        "field": "harvestInfo.harvestsource.keyword",
        "size": 1000,
        "min_doc_count": 1,
        "order": [
          {
            "_count": "desc"
          },
          {
            "_key": "asc"
          }
        ]
      }
    }
}}