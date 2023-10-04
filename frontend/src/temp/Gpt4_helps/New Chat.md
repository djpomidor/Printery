# New Chat

### **system**:

Enter your message to start a chat. This could be a question, a statement, or any other text.

---

### **user**:

напиши мне код приложения на react, в котором есть компонент меню и компонент главного окна. каждый пункт меню отрисовывает свой другой компонент в главном окне

---

### **assistant**:

Код: 

```
import React, { useState } from "react";

const Menu = ({ setComponent }) => {
  return (
    <div>
      <button onClick={() => setComponent("Component1")}>Component1</button>
      <button onClick={() => setComponent("Component2")}>Component2</button>
      <button onClick={() => setComponent("Component3")}>Component3</button>
    </div>
  );
};

const Component1 = () => {
  return <div>Component1</div>;
};

const Component2 = () => {
  return <div>Component2</div>;
};

const Component3 = () => {
  return <div>Component3</div>;
};

const Main = ({ currentComponent }) => {
  switch (currentComponent) {
    case "Component1":
      return <Component1 />;
    case "Component2":
      return <Component2 />;
    case "Component3":
      return <Component3 />;
    default:
      return null;
  }
};

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("");

  return (
    <div>
      <Menu setComponent={setCurrentComponent} />
      <Main currentComponent={currentComponent} />
    </div>
  );
};

export default App;
```

В этом коде создается компонент `Menu`, который принимает проп `setComponent`. Этот проп передается кнопкам и используется для установки `currentComponent` в компоненте `Main`.

`Main` - это компонент, который используется для отображения выбираемых компонентов в главном окне. `currentComponent` передается в `Main` в качестве пропа, а затем используется внутри `switch-case`, чтобы определить, какой компонент нужно отобразить в главном окне.

Наконец, создается основной компонент `App`, который содержит `Menu` и `Main`. `setCurrentComponent` используется для обновления `currentComponent` в `App`.

---

