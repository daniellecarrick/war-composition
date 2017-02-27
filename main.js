var compose = function (targetObj) {
  var err = 'Error: all arguments passed in to compose must be objects';

  if (typeof targetObj !== 'object') {
    throw err;
  } else {
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i];

      if (typeof arg === 'object') {
        for (var key in arg) {
          targetObj[key] = arg[key];
        }
      } else {
        throw err;
      }
    }

    return targetObj;
  }
};

var refueler = function(state) {
  return {
    refuel: function() {
      state.gas += 1;
    }
  };
}

var shooter = function(state) {
  return {
    shoot: function() {
      this.dead = true; //check later
    }
  }
}

var flyer = function(state) {
  return {
    fly: function() {
      if (state.gas > 0) {
        state.position += 10;
        state.gas -= 1;
      } else if (state.gas < 1) {
       // state.gas -= 1;
      }
    }
  }
}

var saver = function(state) {
  return {
    save: function() {
      this.dead = false;
    }
  }
}

var driver = function(state) {
  return {
    drive: function() {
      if (state.gas > 0) {
        state.position += 5;
        state.gas -= 1;
      }
    }
  }
}

var plane = function(name) {

  return compose(
    state,
    refueler(state),
    flyer(state),
    shooter(state)
  )
}