## Adding and retrieving documents
See [Getting Started](esIndex.md) for simple examples of adding and retrieving documents.  Adding documents to a non-existent index causes it to be created.

## Create an index
Create an index called `bank_v2`:  
```sh
curl -X PUT "localhost:9200/bank_v2" -H 'Content-Type: application/json' -d '
{
  "settings": {
    "analysis": {
      "analyzer": {
        "default": {
          "type": "custom", 
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "snowball"
          ]
        }
      }
    }
  }
}
'
# Response:
{"acknowledged":true,"shards_acknowledged":true,"index":"bank_v2"}
```

### Use `_reindex` to copy documents
Now that we have our new `bank_v2` index, we can populate with documents from `bank`:
```sh
curl -X POST "localhost:9200/_reindex" -H 'Content-Type: application/json' -d '
{
  "source": {
    "index": "bank"
  },
  "dest": {
    "index": "bank_v2",
    "version_type": "external"
  }
}
'
# Response:
{
  "took":599,
  "timed_out":false,
  "total":1000,
  "updated":0,
  "created":1000,
  "deleted":0,
  "batches":1,
  "version_conflicts":0,
  "noops":0,
  "retries": {
    "bulk":0,
    "search":0
  },
  "throttled_millis":0,
  "requests_per_second":-1.0,
  "throttled_until_millis":0,
  "failures":[]
}
```
I never got this to work without using the `"version_type": "external"` configuration, but that seems to be better in many cases anyway:  
> Omitting version_type or setting it to internal causes Elasticsearch to blindly dump documents into the destination, overwriting any that happen to have the same ID.  

> Setting version_type to external causes Elasticsearch to preserve the version from the source, create any documents that are missing, and update any documents that have an older version in the destination than they do in the source.  

\- [Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html)  

## Show existing indices 
```
GET _cat/indices
```
or:  
```sh
curl -X GET "localhost:9200/_cat/indices?v=true"
# Response:
health status index                           uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   bank                            ZTs1hAofS8us4LXiMBAO0g   1   1       1000            0    379.3kb        379.3kb
green  open   .kibana_task_manager_7.12.0_001 ajR7eqn1RieVISUyeegdDQ   1   0          9        32795        3mb            3mb
green  open   .apm-custom-link                YgvHz2byRQSSeRMVl8kmoQ   1   0          0            0       208b           208b
green  open   .apm-agent-configuration        c1JpUi6rTpmuRjE5eYufnA   1   0          0            0       208b           208b
green  open   .async-search                   wGQeiTf9SkO-wWXGWsCyyg   1   0          0            0       231b           231b
green  open   .kibana_7.12.0_001              8-Ua-j7RQCmtlv173lqfew   1   0         60           27      2.1mb          2.1mb
green  open   .kibana-event-log-7.12.0-000001 ynePbXrGRYea2O2Yel6e4g   1   0          3            0     16.4kb         16.4kb
yellow open   model_index                     5_SugdnaRKSwHhTbWe-fVQ   1   1        108            0    722.9kb        722.9kb
yellow close  my-index-000001                 FT4GyYHzRNusRBrcOmyVEQ   1   1                                                  
green  open   .tasks                          85oGio0kRCqS93sB7uY3hQ   1   0          4            0     27.2kb         27.2kb
yellow open   customer                        8_Gr9jiySvGrOXAyTl0LYw   1   1          1            0      3.8kb          3.8kb
```
where `v=true` specifies column headings in the response.  

## Clone an index
You might want to do this for testing purposes.    
```
POST /my-index-000001/_clone/cloned-my-index-000001
```

## Open or close an index
To update index settings, an index must first be closed.  After the settings are changes, the index needs to be reopened.

### Close an index
```sh
curl -X POST "localhost:9200/my-index-000001/_close?pretty"
# Response:
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "indices" : {
    "my-index-000001" : {
      "closed" : true
    }
  }
}
```
See the response to `GET _cat/indices` above to see how a closed index is displayed.  

### Open an index
```sh
curl -X POST "localhost:9200/my-index-000001/_open?pretty"
# Response:
{
  "acknowledged" : true,
  "shards_acknowledged" : true
}
```

## Reindex an index
```sh

```
## Settings

### Get index settings
```
curl -X GET "localhost:9200/bank/_settings?pretty"
# Response:
{
  "bank" : {
    "settings" : {
      "index" : {
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "bank",
        "creation_date" : "1616168689251",
        "number_of_replicas" : "1",
        "uuid" : "S8kSRcrHQFK4TQ9nPcOLsw",
        "version" : {
          "created" : "7110299"
        }
      }
    }
  }
}
GET /my-index-1,my-index-2/settings
```

### Change index settings
In the following example, the settings are being updated with a new analyzer.    
```sh
curl -X POST "localhost:9200/my-index-000001/_close?pretty"
curl -X PUT "localhost:9200/my-index-000001/_settings?pretty" -H 'Content-Type: application/json' -d'
{
  "analysis" : {
    "analyzer":{
      "content":{
        "type":"custom",
        "tokenizer":"whitespace"
      }
    }
  }
}
'
# Response:
{
  "acknowledged" : true
}
curl -X POST "localhost:9200/my-index-000001/_open?pretty"
```

## Mappings
Get mapping for index:
```sh
curl -X GET "localhost:9200/bank/_mapping?pretty"
```

## Analyzers
"An analyzer  — whether built-in or custom — is just a package which contains three lower-level building blocks: character filters, tokenizers, and token filters." - [Anatomy of an analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analyzer-anatomy.html)

### Character filters
### Tokenizers
### Filters

## Normalizers
