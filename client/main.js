import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counters } from '../common/collections';
import '../common/methods';

import './main.html';

function getCounterValue() {
  const counter = Counters.findOne({ name: 'mycounter' });

  if (counter) {
    return counter.value;
  } else {
    return 0;
  }
}

function incrementCounterValue() {
  Meteor.call('incrementCounter');
}

Template.hello.helpers({
  counter() {
    return getCounterValue();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    incrementCounterValue();
  },
});
