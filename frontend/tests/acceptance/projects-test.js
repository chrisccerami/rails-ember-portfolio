import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Projects', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /projects', function() {
  visit('/projects');

  andThen(function() {
    equal(currentPath(), 'projects');
  });
});
