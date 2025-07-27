Ваш `useEffect` зависит от `machine`, который вы получаете как `prop`. Однако, если в `machine` нет исходного значения при рендеринге `PrintSchedule`, `useEffect` выполнится только с пустым значением `machine`. Это может быть причиной того, что `machine` не передается при первой загрузке.

Один из способов обработать эту ситуацию - использовать `useEffect` для отслеживания `machine` и выполнять `fetchData` только когда `machine` не является пустой строкой:

```jsx
useEffect(() => {
  if (machine) {
    const fetchData = async () => {
      // ... код fetchData остается неизменным
    };
    fetchData();
  }
}, [machine]);  // Добавление machine в список зависимостей
```

Таким образом, ваша заявка на получение данных из API будет отправлена ​​только в том случае, если `machine` не пустое значение.

Также, учитывая, что вы используете `machine` внутри `fetchData`, который вызывается внутри `useEffect`, вы столкнетесь с замечанием lint о "missing dependency". В этом случае вы можете безопасно добавить `machine` в список зависимостей `useEffect` без риска вызвать бесконечный цикл обновления, поскольку `machine` обновляется только при изменении вкладки. Таким образом, ваш код будет выглядеть следующим образом:

```jsx
useEffect(() => {
  if (machine) {
    const fetchData = async () => {
      try {
        var today = new window.Date();
        var beforeYesterday = new window.Date(today);
        beforeYesterday.setDate(today.getDate() - 7);
        
        // Было: const response = await api.get(`/orders/print-shedule/${beforeYesterday.toISOString().substring(0,10)}`);
        // Стало: включаем machine в запрашиваемый URL
        const response = await api.get(`/orders/print-shedule/${beforeYesterday.toISOString().substring(0,10)}/machine`);
        
        const fetchedOrders = response.data;
        const fetchedColumns = daysOfPrint(fetchedOrders, machine); // Pass fetchedOrders to the daysOfPrint function
        setState({ orders: fetchedOrders, columns: fetchedColumns });
      } catch (error) {
        setRes("Something went wrong: ", error);
        console.log('Aaalarmee!!!', res);
        console.error(error);
      }
    };
    fetchData();
  }
}, [machine, api]);  // Добавление machine и api в список зависимостей
```

Если после этих изменений `PrintSchedule` все еще не получает корректное значение `machine`, вашей следующей проверкой должен быть компонент `Header` и его передача `machine` обратно в `PrintSchedulePage` через событие изменения вкладки. Если этот процесс работает должным образом, `PrintSchedule` должен получить правильное значение `machine`.