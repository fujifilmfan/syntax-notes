## Getting Started

### Download and install
See [Get Elasticsearch up and running](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html) for details.  

1\. Download:  

```sh
curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.11.2-darwin-x86_64.tar.gz  
```

2\. Extract:  

```sh
tar -xvf elasticsearch-7.11.2-darwin-x86_64.tar.gz  
```

### Start
3\. Start:  

```sh
cd elasticsearch-7.11.2/bin  
./elasticsearch  
```

4\. Add nodes:  

```sh
./elasticsearch -Epath.data=data2 -Epath.logs=log2  
./elasticsearch -Epath.data=data3 -Epath.logs=log3  
```

### Checks
5\. Check that Elasticsearch is running:  

```sh
curl -X GET "localhost:9200/?pretty"
# Response:
{
  "name" : "IGSKBTCMLT00389",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "Fs8EnhqNTAq4cQtAWUa86w",
  "version" : {
    "number" : "7.11.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "3e5a16cfec50876d20ea77b075070932c6464c7d",
    "build_date" : "2021-03-06T05:54:38.141101Z",
    "build_snapshot" : false,
    "lucene_version" : "8.7.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

6\. Check health:  

```sh
curl -X GET "localhost:9200/_cat/health?v=true&pretty"
# Response:
epoch      timestamp cluster       status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1565052807 00:53:27  elasticsearch green           3         3      6   3    0    0        0             0                  -                100.0%
```

### Add and retrieve documents

7\. Add a single document:  
```sh
curl -X PUT "localhost:9200/customer/_doc/1?pretty" -H 'Content-Type: application/json' -d'
{
  "name": "John Doe"
}
'
# Response:
{
  "_index" : "customer",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 26,
  "_primary_term" : 4
}
```
!!! note
    This automatically creates the `customer` index if it doesn't already exist.

or add documents in bulk:  
```sh
curl -H "Content-Type: application/json" -XPOST "localhost:9200/bank/_bulk?pretty&refresh" --data-binary "@accounts.json"
# Response (all of the new items and some additional information):
{
  "took" : 2398,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "bank",
        "_type" : "_doc",
        "_id" : "1",
        "_version" : 1,
        "result" : "created",
        "forced_refresh" : true,
        "_shards" : {
          "total" : 2,
          "successful" : 2,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    ...
  ]
}
```

8\. Retrieve a document:
 
!!! note
    This is different than search - note that we specify the ID of the document we want.  

```sh
curl -X GET "localhost:9200/customer/_doc/1?pretty"
# Response:
{
  "_index" : "customer",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 26,
  "_primary_term" : 4,
  "found" : true,
  "_source" : {
    "name": "John Doe"
  }
}
```
## Run as a daemon

Start Elasticsearch:  
```sh
./bin/elasticsearch -d -p pid
```
where:  

* `-d` runs the process as a daemon  
* `-p` records the process ID

Stop Elasticsearch:  
```sh
pkill -F pid
```

## Management

### Logs and configuration
Logs are available at `$ES_HOME/logs/`.  
Configuration is loaded from `$ES_HOME/config/elasticsearch.yml`.  

### Nodes
Get cluster node information:  
```shell
curl -X GET "localhost:9200/_nodes?pretty"
# Response
# verrrrrrry long
# Contains lists of installed "plugins", "modules", "ingest.processors", functions (like "avg", "foreach"), 
```
