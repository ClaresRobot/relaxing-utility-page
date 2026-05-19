# relaxing-utility-page
Small utility page with a variety of different tools all in one screen. Made to resemble a Windows 7 aesthetic and fit a relaxing vibe.

https://claresrobot.github.io/relaxing-utility-page/

## Features:

### To-Do List
- Add tasks with title, due date and priority level (low / medium / high)
- Mark tasks as complete via checkbox
- Edit and delete tasks inline
- Tasks sorted automatically by due date
- Task counter showing total, completed and pending
- Persistent storage via `localStorage`

### Weather forecast
- Automatic geolocation with fallback to Madrid
- Current temperature, weather description and wind speed
- 7-day forecast with animated SVG weather icons
- Humidity, UV index and atmospheric pressure
- Powered by the [Open-Meteo API](https://open-meteo.com/)
- Animated icons from [Makin-Things/weather-icons](https://github.com/Makin-Things/weather-icons)
- Forecast cards with dynamic background images per weather condition and Frutiger Aero glossy overlay

### Notepad
- Free-form text area
- Auto-saves on every keystroke via `localStorage`

### Calculator
- Basic arithmetic operations: addition, subtraction, multiplication, division
- Percentage and sign toggle
- Chained operations with expression display
- Styled with Frutiger Aero glossy buttons

### Music Player
- Embedded [WebDeck Player](https://webdeckplayer.neocities.org/).

### Quote of the Day
- Fetches a daily quote from [TheQuotesHub API](https://thequoteshub.com/api)
- Cached in `localStorage` — same quote all day, new one each morning
- Manual refresh button to get a new quote on demand

### News Feed
- RSS feed reader powered by [rss2json.com](https://rss2json.com)
- Switchable news sources: El País, El Mundo, BBC World, NY Times
- Remembers selected source between sessions

### Style Selector
- Dropdown to switch the page background between multiple wallpapers
- Selection persists via `localStorage`

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5                               |
| Styling    | CSS3 + [7.css](https://khang-nd.github.io/7.css/) |
| Logic      | Vanilla JavaScript (ES2020+)        |
| Fonts      | Segoe UI / Noto Sans (Google Fonts) |
| Weather    | Open-Meteo API                      |
| Icons      | Makin-Things Weather Icons (SVG)    |
| Quotes     | TheQuotesHub API                    |
| News       | RSS2JSON API                        |
| Storage    | localStorage                        |
----------------------------------------------------

## Learning Goals

This project was built as a practice exercise covering:

- Semantic HTML structure and accessibility basics
- CSS Grid layout for multi-panel dashboards
- CSS custom effects: glassmorphism, glossy gradients, layered pseudo-elements
- Vanilla JS patterns: DOM manipulation, event delegation, async/await
- Working with third-party REST APIs and RSS feeds
- Browser storage with `localStorage`
- Responsive design for mobile
- Integrating third-party CSS frameworks

---

## License

This project is open source and available under the [MIT License](LICENSE).

---


