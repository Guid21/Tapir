/**
 * Redux
 */
@@include('./redux/index.js');

const { getState, subscribe, dispatch } = createStore(reducer, initialState);

subscribe(() => {
  const { step } = getState();

  // Если шаг 1, то показать Пользовательское соглашение
  if (step === 1)
    document.getElementsByClassName('agreement')[0].classList.add('active');
  else
    document.getElementsByClassName('agreement')[0].classList.remove('active');

  // Если шаг 2, то показать Форму вооду
  if (step === 2)
    document.getElementsByClassName('form')[0].classList.add('active');
  else document.getElementsByClassName('form')[0].classList.remove('active');

  // Во время каждого шага задаем настройки всем пунктам меню
  for (let i = 1; i < new Array(5).length; i++) {
    if (i === +step) {
      document.getElementById(i.toString()).classList.add('active');
      document.getElementById(i.toString()).classList.remove('disabled');
      document.getElementById(i.toString()).disabled = false;
    } else if (i < +step) {
      document.getElementById(i.toString()).classList.remove('active');
      document.getElementById(i.toString()).classList.remove('disabled');
      document.getElementById(i.toString()).disabled = false;
    } else {
      document.getElementById(i.toString()).classList.add('disabled');
      document.getElementById(i.toString()).classList.remove('active');
      document.getElementById(i.toString()).disabled = true;
    }
  }
});

/**
 * Agreement
 */
const agreementAccept = document.getElementById('agreementAccept');

// Ручка обрабатывающая принятие пользовательского соглашения
agreementAccept.addEventListener('click', () => {
  dispatch({ type: EDIT_STEP, payload: 2 });
});

/**
 * Navbar
 */
@@include('./navbar.js');
const navbarList = document.getElementsByClassName('navbar__list')[0];

// Задаем ручки для каждого пункта меню
for (let i = 0; i < navbarList.children.length; i++) {
  navbarList.children[i].children[0].onclick = () => {
    const { step } = getState();

    if (step > i + 1) dispatch({ type: EDIT_STEP, payload: 1 });
  };
}

/**
 * Select
 */
@@include('./select.js');
