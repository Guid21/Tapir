"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Redux
 */
var EDIT_STEP = 'EDIT_STEP';

var createStore = function createStore(reducer, initialState) {
  var subscribes = [];
  var state = reducer(initialState, {
    type: '__INIT__'
  });
  return {
    dispatch: function dispatch(action) {
      state = reducer(state, action);
      subscribes.forEach(function (sub) {
        return sub();
      });
    },
    subscribe: function subscribe(cb) {
      return subscribes.push(cb);
    },
    getState: function getState() {
      return state;
    }
  };
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case EDIT_STEP:
      return _objectSpread(_objectSpread({}, state), {}, {
        step: action.payload
      });

    default:
      return state;
  }
};

var initialState = {
  step: 1
};
;

var _createStore = createStore(reducer, initialState),
    getState = _createStore.getState,
    subscribe = _createStore.subscribe,
    dispatch = _createStore.dispatch;

subscribe(function () {
  var _getState = getState(),
      step = _getState.step; // Если шаг 1, то показать Пользовательское соглашение


  if (step === 1) document.getElementsByClassName('agreement')[0].classList.add('active');else document.getElementsByClassName('agreement')[0].classList.remove('active'); // Если шаг 2, то показать Форму вооду

  if (step === 2) document.getElementsByClassName('form')[0].classList.add('active');else document.getElementsByClassName('form')[0].classList.remove('active'); // Во время каждого шага задаем настройки всем пунктам меню

  for (var _i = 1; _i < new Array(5).length; _i++) {
    if (_i === +step) {
      document.getElementById(_i.toString()).classList.add('active');
      document.getElementById(_i.toString()).classList.remove('disabled');
      document.getElementById(_i.toString()).disabled = false;
    } else if (_i < +step) {
      document.getElementById(_i.toString()).classList.remove('active');
      document.getElementById(_i.toString()).classList.remove('disabled');
      document.getElementById(_i.toString()).disabled = false;
    } else {
      document.getElementById(_i.toString()).classList.add('disabled');
      document.getElementById(_i.toString()).classList.remove('active');
      document.getElementById(_i.toString()).disabled = true;
    }
  }
});
/**
 * Agreement
 */

var agreementAccept = document.getElementById('agreementAccept'); // Ручка обрабатывающая принятие пользовательского соглашения

agreementAccept.addEventListener('click', function () {
  dispatch({
    type: EDIT_STEP,
    payload: 2
  });
});
/**
 * Navbar
 */

document.getElementsByClassName('navbar__burger')[0].onclick = function () {
  document.getElementsByClassName('navbar__burger')[0].classList.toggle('active');
  document.getElementsByClassName('navbar__menu')[0].classList.toggle('active');
  document.body.classList.toggle('lock');
};

;
var navbarList = document.getElementsByClassName('navbar__list')[0]; // Задаем ручки для каждого пункта меню

var _loop = function _loop(_i2) {
  navbarList.children[_i2].children[0].onclick = function () {
    var _getState2 = getState(),
        step = _getState2.step;

    if (step > _i2 + 1) dispatch({
      type: EDIT_STEP,
      payload: 1
    });
  };
};

for (var _i2 = 0; _i2 < navbarList.children.length; _i2++) {
  _loop(_i2);
}
/**
 * Select
 */


var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */

x = document.getElementsByClassName('custom-select');
l = x.length;

for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */

  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */

  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');

  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;

      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;

          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }

          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }

      h.click();
    });
    b.appendChild(c);
  }

  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;

  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }

  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */


document.addEventListener('click', closeAllSelect);
;