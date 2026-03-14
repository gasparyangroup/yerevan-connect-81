
# Отправка данных форм в Telegram

## Что будет сделано

Все три формы (Спонсировать, Я архитектор, Предложить идею) будут отправлять данные в Telegram-бот при нажатии кнопки "Отправить".

## Шаги

### 1. Добавить секреты
Сохранить токен бота и ID чата как секреты Lovable Cloud:
- `TELEGRAM_BOT_TOKEN` = `8431524815:AAFR4g2r-G2DNlgylWB3MA0JAUk1fJQWh8c`
- `TELEGRAM_CHAT_ID` = `112447154`

### 2. Создать backend-функцию `send-telegram`
Функция принимает JSON с данными формы и отправляет сообщение в Telegram через Bot API (`sendMessage`).

Формат сообщения будет различаться в зависимости от типа формы:
- **Спонсор/Архитектор** -- проект, имя/компания, номер/telegram, тип заявки
- **Предложить идею** -- название проекта, локация, описание

### 3. Обновить `ContactModal.tsx`
Заменить текущий `handleSubmit` (который просто показывает галочку) на реальный вызов backend-функции с данными формы. Добавить обработку ошибок.

### 4. Обновить `SuggestionModal.tsx`
Аналогично -- при отправке формы вызывать backend-функцию с полями: название, локация, описание.

## Технические детали

### Backend-функция `supabase/functions/send-telegram/index.ts`

```text
Входные данные (POST JSON):
{
  "type": "sponsor" | "architect" | "suggestion",
  "project": "Название проекта",
  "name": "Имя / Компания",
  "phone": "Номер / Telegram",
  "title": "Название идеи",
  "location": "Локация",
  "description": "Описание"
}
```

Функция формирует текстовое сообщение и отправляет его через `https://api.telegram.org/bot{TOKEN}/sendMessage` в указанный чат.

### Изменения в компонентах

- `ContactModal.tsx`: вызов `supabase.functions.invoke('send-telegram', { body: { type, project, name, phone } })` в `handleSubmit`
- `SuggestionModal.tsx`: вызов `supabase.functions.invoke('send-telegram', { body: { type: 'suggestion', title, location, description } })` в `handleSubmit`
- Добавить состояние загрузки (`isLoading`) и обработку ошибок с toast-уведомлением

### Конфигурация

В `supabase/config.toml` добавить:
```text
[functions.send-telegram]
verify_jwt = false
```
