// From example on http://angularjs.org/
angular.module('mongolab',['ngResource']).
  factory('Party', function($resource) {
    var Party = $resource('https://api.mongolab.com/api/1/databases' +
      '/partyhard/collections/parties/:id',
      { apiKey: 'GVuyzLyyk-AJJB39Ryr-tGKp5fShfTuv' },
      { update: { method: 'PUT' } }
    );
    Party.prototype.update = function(cb) {
      return Party.update({id: this._id.$oid},
        angular.extend({}, this, {_id:undefined}), cb);
    }
    Party.prototype.destroy = function(cb) {
      return Party.remove({id: this._id.$oid}, cb);
    }
    return Party;
  });
