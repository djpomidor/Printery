Ошибка `GET http://localhost:3000/api/user-group/ 401 (Unauthorized)` возникает из-за проблемы с передачей токена авторизации в заголовках запроса к API.

---

### Проблемы в коде
1. **Неправильная передача токена**: В блоке `useEffect` вы пытаетесь передать токен из `localStorage`, но используете строку токенов напрямую:
   ```javascript
   Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
   ```
   Здесь `authTokens` — это объект, а вам нужно передать `authTokens.access` для использования токена доступа.

2. **Базовый URL для API**: Ваш запрос отправляется на `"/api/user-group/"`, который относительно текущего хоста (`http://localhost:3000`). Но ваш бекенд находится на `http://127.0.0.1:8000`. Вам нужно указать правильный базовый URL для запросов к API.

---

### Исправленный код
#### 1. **Обновление useEffect**
Обновите ваш `useEffect` так, чтобы токен доступа передавался правильно и запросы отправлялись на правильный базовый URL:
```javascript
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user-group/", {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`, // Используем access-токен
        },
      });
      setUserGroups(response.data.groups);
    } catch (error) {
      console.error("Error fetching user groups:", error);
      setUserGroups([]);
    }
  };

  if (authTokens) {
    fetchUserData();
  }
}, [authTokens]);
```

---

#### 2. **Добавление Axios-экземпляра**
Чтобы не писать базовый URL и заголовки каждый раз, создайте отдельный экземпляр `axios` в вашем приложении.

##### Файл `axiosInstance.js`:
```javascript
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  if (authTokens) {
    config.headers.Authorization = `Bearer ${authTokens.access}`;
  }
  return config;
});

export default axiosInstance;
```

##### Обновите `fetchUserData`:
```javascript
import axiosInstance from "../utils/axiosInstance";

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/user-group/");
      setUserGroups(response.data.groups);
    } catch (error) {
      console.error("Error fetching user groups:", error);
      setUserGroups([]);
    }
  };

  if (authTokens) {
    fetchUserData();
  }
}, [authTokens]);
```

---

### Итог
- Убедитесь, что токен извлекается из `authTokens.access`, а не напрямую из `localStorage`.
- Укажите корректный базовый URL для запросов.
- Настройте общий экземпляр `axios` для автоматического добавления заголовков, чтобы упростить повторяющиеся запросы.