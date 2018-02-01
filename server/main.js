import { MeteorX } from 'meteor/meteorhacks:meteorx';

import '../common/collections';
import '../common/methods';

if (process.env.USE_WORKAROUND) {
  MeteorX.onReady(() => {
    const proto = MeteorX.MongoOplogDriver.prototype;
    const origHandleOplogEntryQuerying = proto._handleOplogEntryQuerying;

    proto._handleOplogEntryQuerying = function wrappedHandleOplogEntryQuerying(op) {
      if (op.o && op.o.$v) {
        console.log("REMOVING $V from op", op);
        delete op.o.$v;
      }

      if (op.o2 && op.o2.$v) {
        console.log("REMOVING $V from op2", op);
        delete op.o2.$v;
      }

      origHandleOplogEntryQuerying.call(this, op);
    };

    const origHandleOplogEntrySteadyOrFetching = proto._handleOplogEntrySteadyOrFetching;
    proto._handleOplogEntrySteadyOrFetching = function wrappedHandleOplogEntrySteadyOrFetching(op) {
      if (op.o && op.o.$v) {
        console.log("REMOVING $V from op", op);
        delete op.o.$v;
      }

      if (op.o2 && op.o2.$v) {
        console.log("REMOVING $V from op2", op);
        delete op.o2.$v;
      }

      origHandleOplogEntrySteadyOrFetching.call(this, op);
    };
  });
}
