(function (App) {
  'use strict';

  var Dispatcher = Backbone.Router.extend({
    routes: {
      'users(/)': 'Users',
      '(sites)(/)': 'Sites',
      '(map_versions)(/)': 'MapVersions',
      'site_steps/(:step)': 'SiteCreation',
      'sites/:slug/site_steps/:step(/)': 'SiteEdition'
    }
  });

  var init = function () {
    var dispatcher = new Dispatcher();

    dispatcher.on('route', function (routeName, params) {
      Backbone.history.stop();
      var Router = App.Router['Admin' + routeName];

      if (Router) {
        new Router(params.slice(0, params.length - 1));

        Backbone.history.start({ pushState: false });
      }
    });

    // Because turbolinks doesn't fully reload the page, we need to stop the
    // history before anything else
    Backbone.history.stop();

    // We need this to detect router pathname
    Backbone.history.start({ pushState: true, root: '/admin' });

    // We instantiate the Quick links component
    new App.View.QuickLinksView({
      activeLink: 'admin'
    });

    // We instantiate the User links component
    new App.View.UserLinksView();
  };

  // We need for the DOM to be ready
  window.addEventListener('DOMContentLoaded', init);

}).call(this, this.App);
