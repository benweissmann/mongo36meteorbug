import { Meteor } from 'meteor/meteor';
import { Counters } from './collections';

Meteor.methods({
  incrementCounter() {
    Counters.upsert({ name: 'mycounter' }, {
      $inc: { value: 1 },
    });
  }
})
