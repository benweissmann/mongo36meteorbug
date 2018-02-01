# Metoer Mongo 3.6 Oplog Bug Repro

1) Start up the Mongo 3.6 server: `docker-compose up`
2) Initialize the replica set: `cat initializeReplset.mongojs | mongo localhost:27077`
3) Start Meteor: `./runApp.sh`

You can observe the bug by watching the output of `docker-compose` (Mongo has
been configured to log every query) and seeing that we're issuing a query after
each update (which you can trigger with the "Click Me" button in the app; I've
edited the default app to use Mongo rather than a ReactiveVar).

You can also observe the bug by attaching a node inspector. Setting a breakpoint
on `local_collection.js:1139` (on ``throw MinimongoError(`Invalid modifier specified ${operator}`);``)
will show an error for every oplog message.

To test the workaround, run the app as `USE_WORKAROUND=true ./runApp.sh`. Note
that in the Mongo logs, there's no find after the update to fetch the new
version of the Counter document.
