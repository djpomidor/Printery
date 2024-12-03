function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      if (Array.isArray(source[key])) {
        // Обработка массивов: объединим элементы массива или заменим массив целиком
        target[key] = Array.isArray(target[key]) ? mergeArrays(target[key], source[key]) : source[key];
      } else {
        // Обработка вложенных объектов
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      }
    } else {
      // Примитивные значения
      target[key] = source[key];
    }
  }
  return target;
}

// Вспомогательная функция для объединения массивов
function mergeArrays(targetArray, sourceArray) {
  return sourceArray.map((item, index) => {
    if (typeof item === 'object' && !Array.isArray(item)) {
      return deepMerge(targetArray[index] || {}, item); // Объединяем объекты по индексам
    }
    return item; // Для примитивов просто заменяем
  });
}

const target = {
    orderId: '',
    nameOfOrder: '',
    circulation: 0,
    binding: '',
    width: 0,
    height: 0,
    parts: [
      {
        part_name: 'BLO',
        pages: 1,
        color: '',
        paper: { name: '', type: '', density: 0, width: 0, height: 0 },
        printing: [
          {
            printed_sheets: 0,
            circulation_sheets: 0,
            parent_day: '',
            printing_day: '',
            day_or_night: 'day',
            machine: '1',
          },
        ],
      },
    ],
    created: '',
  };
  
  const source = {
    nameOfOrder: 'New Order',
    circulation: 500,
    parts: [
      {
        part_name: 'BLO',
        pages: 2,
        color: 'full-color',
        paper: { name: 'Glossy', density: 200 },
      },
      {
        part_name: 'COV',
        pages: 1,
        color: 'black-white',
        paper: { name: 'Matte', density: 300 },
      },
    ],
    created: '2024-11-23T10:00:00Z',
  };
  
    


  const merged = deepMerge(target, source);
//   console.log(merged);
  console.log(JSON.stringify(merged, null, 2));