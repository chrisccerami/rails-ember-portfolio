import Ember from 'ember';
import startApp from '../helpers/start-app';

import Pretender from 'pretender';

var application, server;

module('Acceptance: Projects', {
  setup: function() {
    application = startApp();

    // create some fake projects for pretender to serve up
    var projects = [
      { id: 1, name: 'Scene Hub' },
      { id: 2, name: 'Curiosity API' },
      { id: 3, name: 'Skillshare Somerville' }
    ];

    // use pretender to serve up those fake projects
    server = new Pretender(function(){
      this.get('/api/v1/projects', function(request){
        return [200, {"Content-Type": "application/json"}, JSON.stringify({projects: projects})];
      });
    });
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

// add some tests!

test('Should allow navigation to the projects page from the landing page', function() {
  visit('/').then(function() {
    click('a:contains("Projects")');
  });

  andThen(function() {
    equal(find('h3').text(), 'All Web App Projects');
  });
});

test('visiting /projects', function() {
  visit('/projects');

  andThen(function() {
    equal(currentPath(), 'projects.index');

    equal(find('h3:contains("All Web App Projects")').length, 1);
    equal(find('a:contains("Scene Hub")').length, 1);
    equal(find('a:contains("Curiosity API")').length, 1);
    equal(find('a:contains("Skillshare Somerville")').length, 1);
  });
});
