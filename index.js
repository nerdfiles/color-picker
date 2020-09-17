const doc = document;

const createColorListContainer = () => {
  const colorListContainer = document.createElement('ul');

  colorListContainer
    .setAttribute('aria-labelledby', 'palette');

  colorListContainer
    .setAttribute('class', 'palette__list no-margin no-padding');

  colorListContainer
    .setAttribute('role', 'radiogroup');

  return colorListContainer;
};


const generatePalette = (config) => {

  const {
    colorList
  } = config;

  let inputElement;
  let listElement;
  let inputList = [];

  let idForInputName = Math.ceil(Math.random() * 100000000);

  for (var i = 0; i < colorList.length; i++) {

    listElement=  document.createElement('li');
    listElement
      .setAttribute('class', 'list__color-item no-bullet no-margin');
    listElement
      .setAttribute('style', `background-color: ${colorList[i].hex}`);

    inputElement = document.createElement('input');

    inputElement
      .setAttribute('class', 'color-item__input');
    inputElement
      .setAttribute('role', 'radio');
    inputElement
      .setAttribute('aria-checked', 'false');

    if (i > 0) {
      inputElement
        .setAttribute('tabindex', '-1');
    } else {
      inputElement
        .setAttribute('tabindex', '0');
    }

    inputElement
      .setAttribute('value', colorList[i].hex);

    inputElement
      .setAttribute('type', 'radio');

    inputElement
      .setAttribute('id', `colorItemInput-${idForInputName}-${i}`);

    inputElement
      .setAttribute('name', `colorItemInput-${idForInputName}`);

    listElement.appendChild(inputElement);

    inputList.push(listElement);

  }

  return inputList;
};

const newPicker = (config) => {

  const { selector, colorList } = config;

  const component = document.querySelector(`${selector}`);
  const colorPickerPreview = component.querySelector('.color-picker__preview');
  const colorPickerPalette = component.querySelector('.color-picker__palette')

  const paletteConfig = {
    colorList: colorList
  };

  const listOfColors = generatePalette(paletteConfig);
  const listContainer = createColorListContainer();

  listOfColors.forEach((elemRef) => {
    listContainer.appendChild(elemRef);
  });

  colorPickerPalette.appendChild(listContainer);

  const li = listContainer.querySelectorAll('li');

  li.forEach((element) => {
    element.addEventListener('change', (e) => {
      colorPickerPreview.setAttribute('style', `background-color: ${e.target.value}`);
      const checkboxesForComponent = Array.from(component.querySelectorAll('input'));
      let checkbox;
      for (var j = 0; j < checkboxesForComponent.length; j++) {
        checkbox = checkboxesForComponent[j];
        checkbox.setAttribute('aria-checked', 'false');
      }
      e.target.setAttribute('aria-checked', 'true');
    });
  });
};

const loadedListener = () => {

  newPicker({
    selector: '#picker1',
    colorList: [
      {
        hex: '#FE2E64'
      },
      {
        hex: '#81BEF7'
      },
      {
        hex: '#01DF01'
      },
      {
        hex: '#FFFF00'
      },
      {
        hex: '#FA8258'
      },
      {
        hex: '#cccccc'
      }
    ]
  });

  newPicker({
    selector: '#picker2',
    colorList: [
      {
        hex: '#FE2E64'
      },
      {
        hex: '#81BEF7'
      },
      {
        hex: '#01DF01'
      },
      {
        hex: '#FFFF00'
      },
      {
        hex: '#FA8258'
      }
    ]
  });
};

doc.addEventListener('DOMContentLoaded', loadedListener);

