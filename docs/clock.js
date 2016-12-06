const DEFAULTS = {
  updateRate: 1000,
  timeFormat: 'h:mm',
  fuzzMin: 0,
  fuzzMax: 10,
  fuzzUnit: 'minutes'
};


/**
 * Returns a random integer between min (included) and max (included)
 * Using Math.round() will give you a non-uniform distribution!
 * --MDN
 */
function getRandomIntInclusive(min, max) {
  'use strict';
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let FuzzyClock = function(cfg) {
  'use strict';
  const UPDATERATE = cfg.updateRate || DEFAULTS.updateRate;
  const TIMEFORMAT = cfg.timeFormat || DEFAULTS.timeFormat;
  const FUZZMIN = cfg.fuzzMin || DEFAULTS.fuzzMin;
  const FUZZMAX = cfg.fuzzMax || DEFAULTS.fuzzMax;
  const FUZZUNIT = cfg.fuzzUnit || DEFAULTS.fuzzUnit;

  const FUZZ = {
    value: getRandomIntInclusive(FUZZMIN, FUZZMAX),
    unit: FUZZUNIT
  };

  let clockElement = document.createElement('time');
  clockElement.classList.add('fzc-clock');

  function tick() {
    clockElement.innerHTML = moment().add(FUZZ.value, FUZZ.unit).format(TIMEFORMAT);
  }

  function init(homeEl) {
    tick();
    homeEl.appendChild(clockElement);
  }

  return {
    cid: setInterval(tick, UPDATERATE),
    init
  };
};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let container = document.querySelector('.fzc-container');
  let clock = document.createElement('div');

  clock.classList.add('fzc-main');
  container.insertBefore(clock, document.querySelector('.fzc-about'));

  let fc = new FuzzyClock({});
  fc.init(clock);
});
