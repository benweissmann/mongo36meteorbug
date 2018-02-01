#!/bin/sh

export MONGO_URL='mongodb://localhost:27077/myapp?replicaSet=myapp'
export MONGO_OPLOG_URL='mongodb://localhost:27077/local?replicaSet=myapp'

meteor --inspect
