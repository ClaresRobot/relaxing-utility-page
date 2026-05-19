// Variables ToDoList
const todoForm        = document.getElementById("todoForm");
const taskText        = document.getElementById("taskText");
const taskDue         = document.getElementById("taskDue");
const taskPriority    = document.getElementById("taskPriority");
const todoList        = document.getElementById("todoList");
const todoStats       = document.getElementById("todoStats");

// Variables Tiempo
const forecastList      = document.getElementById("forecast-list");
const widgetClock       = document.getElementById("widget-clock");
const widgetTemp        = document.getElementById("widget-temp");
const widgetLocation    = document.getElementById("widget-location");
const widgetDescription = document.getElementById("widget-description");
const widgetHumidity    = document.getElementById("widget-humidity");
const widgetUV          = document.getElementById("widget-uv");
const widgetPressure    = document.getElementById("widget-pressure");

// Ubicación Default
const defaultLocation = {
    name: "Madrid",
    latitude: 40.4168,
    longitude: -3.7038,
    timezone: "Europe/Madrid"
};

//Widgets animados
const BASE = "https://cdn.jsdelivr.net/gh/Makin-Things/weather-icons@main/animated/";
const ICO  = (name, fallback = "🌤️") => `<img src="${BASE}${name}.svg" width="60" height="60" style="vertical-align:middle" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '${fallback}')">`;

const weatherCodeMap = {
    0:  { icon: ICO("clear-day"),                      label: "Despejado" },
    1:  { icon: ICO("cloudy-1-day"),                   label: "Pocas nubes" },
    2:  { icon: ICO("cloudy-2-day"),                   label: "Parcialmente nublado" },
    3:  { icon: ICO("cloudy"),                         label: "Nublado" },
    45: { icon: ICO("fog-day"),                        label: "Niebla" },
    48: { icon: ICO("frost-day"),                      label: "Niebla con escarcha" },
    51: { icon: ICO("rainy-1-day"),                    label: "Llovizna ligera" },
    53: { icon: ICO("rainy-2-day"),                    label: "Llovizna moderada" },
    55: { icon: ICO("rainy-3-day"),                    label: "Llovizna densa" },
    56: { icon: ICO("rain-and-sleet-mix", "🌨️"),      label: "Lluvia helada ligera" },
    57: { icon: ICO("rain-and-sleet-mix", "🌨️"),      label: "Lluvia helada densa" },
    61: { icon: ICO("rainy-1"),                        label: "Lluvia ligera" },
    63: { icon: ICO("rainy-2"),                        label: "Lluvia moderada" },
    65: { icon: ICO("rainy-3"),                        label: "Lluvia intensa" },
    66: { icon: ICO("rain-and-sleet-mix", "🌨️"),      label: "Aguanieve ligera" },
    67: { icon: ICO("rain-and-sleet-mix", "🌨️"),      label: "Aguanieve intensa" },
    71: { icon: ICO("snowy-1"),                        label: "Nieve ligera" },
    73: { icon: ICO("snowy-2"),                        label: "Nieve moderada" },
    75: { icon: ICO("snowy-3"),                        label: "Nieve intensa" },
    77: { icon: ICO("hail", "🌨️"),                    label: "Granizo" },
    80: { icon: ICO("rainy-1-day"),                    label: "Lluvia dispersa" },
    81: { icon: ICO("rainy-2-day"),                    label: "Lluvia frecuente" },
    82: { icon: ICO("rainy-3"),                        label: "Lluvia fuerte" },
    85: { icon: ICO("snow-and-sleet-mix", "🌨️"),      label: "Chubascos de nieve" },
    86: { icon: ICO("snow-and-sleet-mix", "🌨️"),      label: "Tormenta de nieve" },
    95: { icon: ICO("thunderstorms"),                  label: "Tormenta eléctrica" },
    96: { icon: ICO("scattered-thunderstorms"),        label: "Tormenta con granizo ligero" },
    99: { icon: ICO("severe-thunderstorm"),            label: "Tormenta con granizo fuerte" }
};

// Fallback en caso de fallo en la API o geolocalización
const fallbackForecast = [
    { day: "Mié", icon: "☀️",  high: 24, low: 16 },
    { day: "Jue", icon: "⛅",  high: 22, low: 15 },
    { day: "Vie", icon: "🌧️", high: 18, low: 13 },
    { day: "Sáb", icon: "⛈️",  high: 17, low: 12 },
    { day: "Dom", icon: "🌤️", high: 21, low: 14 },
    { day: "Lun", icon: "🌥️", high: 23, low: 15 }
];

function getWeatherCodeInfo(code) {
    return weatherCodeMap[code] || weatherCodeMap[0];
}

function formatDayLabel(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { weekday: "short" }).replace(".", "");
}

function uvLabel(value) {
    if (value <= 2)  return "UV Bajo";
    if (value <= 5)  return "UV Moderado";
    if (value <= 7)  return "UV Alto";
    if (value <= 10) return "UV Muy alto";
    return "UV Extremo";
}

// Mapa de códigos de tiempo a imágenes de fondo
const weatherBgMap = {
    0:  "assets/weather/clear.webp",
    1:  "assets/weather/partly-cloudy.webp",
    2:  "assets/weather/partly-cloudy.webp",
    3:  "assets/weather/cloudy.webp",
    45: "assets/weather/fog.webp",
    48: "assets/weather/fog.webp",
    51: "assets/weather/drizzle.webp",
    53: "assets/weather/drizzle.webp",
    55: "assets/weather/drizzle.webp",
    56: "assets/weather/drizzle.webp",
    57: "assets/weather/drizzle.webp",
    61: "assets/weather/rain.webp",
    63: "assets/weather/rain.webp",
    65: "assets/weather/rain.webp",
    66: "assets/weather/rain.webp",
    67: "assets/weather/rain.webp",
    71: "assets/weather/snow.webp",
    73: "assets/weather/snow.webp",
    75: "assets/weather/snow.webp",
    77: "assets/weather/snow.webp",
    80: "assets/weather/rain.webp",
    81: "assets/weather/rain.webp",
    82: "assets/weather/rain.webp",
    85: "assets/weather/snow.webp",
    86: "assets/weather/snow.webp",
    95: "assets/weather/storm.webp",
    96: "assets/weather/storm.webp",
    99: "assets/weather/storm.webp",
};

function getWeatherBg(code) {
    return weatherBgMap[code] || "assets/weather/clear.jpg";
}

// Visualización del widget del tiempo
function renderWeatherWidget(weatherData, locationName) {
    const current  = weatherData.current_weather;
    const codeInfo = getWeatherCodeInfo(current.weathercode);

    widgetClock.textContent       = new Date(current.time).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    widgetTemp.textContent        = `${Math.round(current.temperature)}°C`;
    widgetLocation.textContent    = `${locationName} · Hoy`;
    widgetDescription.textContent = `${codeInfo.label} · ${current.windspeed} km/h`;

    const currentHourIndex = weatherData.hourly.time.indexOf(current.time);
    if (currentHourIndex >= 0) {
        widgetHumidity.textContent = `Humedad ${Math.round(weatherData.hourly.relativehumidity_2m[currentHourIndex])}%`;
        widgetPressure.textContent = `Presión ${Math.round(weatherData.hourly.pressure_msl[currentHourIndex])} hPa`;
        widgetUV.textContent       = uvLabel(weatherData.hourly.uv_index[currentHourIndex] ?? 0);
    } else {
        widgetHumidity.textContent = "Humedad --";
        widgetPressure.textContent = "Presión --";
        widgetUV.textContent       = "UV --";
    }

forecastList.innerHTML = weatherData.daily.time.map((date, index) => {
        const info = getWeatherCodeInfo(weatherData.daily.weathercode[index]);
        const bg   = getWeatherBg(weatherData.daily.weathercode[index]);
        const high = Math.round(weatherData.daily.temperature_2m_max[index]);
        const low  = Math.round(weatherData.daily.temperature_2m_min[index]);
        return `
            <li>
                <div class="forecast-bg" style="background-image: url('${bg}')"></div>
                <span>${formatDayLabel(date)}</span>
                <span>${info.icon}</span>
                <span>${high}/${low}°</span>
            </li>
        `;
    }).join("");
}

function renderWeatherFallback() {
    widgetTemp.textContent        = "23°C";
    widgetLocation.textContent    = "Madrid · Hoy";
    widgetDescription.textContent = "Datos no disponibles";
    widgetHumidity.textContent    = "Humedad --";
    widgetPressure.textContent    = "Presión --";
    widgetUV.textContent          = "UV --";
    forecastList.innerHTML = fallbackForecast.map(item =>
        `<li><span>${item.day}</span> <span>${item.icon}</span> <span>${item.high}/${item.low}°</span></li>`
    ).join("");
}

function updateWeatherClock() {
    widgetClock.textContent = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

// Conexión con la API de Open-Meteo
async function fetchWeather(lat, lon, timezone) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${encodeURIComponent(timezone)}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m,pressure_msl,uv_index&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo obtener el clima");
    return res.json();
}

async function loadWeather() {
    try {
        const fetchAndRender = async (lat, lon, name, timezone) => {
            const data = await fetchWeather(lat, lon, timezone);
            renderWeatherWidget(data, name);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    await fetchAndRender(pos.coords.latitude, pos.coords.longitude, "Local", "auto");
                },
                async () => {
                    await fetchAndRender(defaultLocation.latitude, defaultLocation.longitude, defaultLocation.name, defaultLocation.timezone);
                },
                { timeout: 8000 }
            );
        } else {
            await fetchAndRender(defaultLocation.latitude, defaultLocation.longitude, defaultLocation.name, defaultLocation.timezone);
        }
    } catch (error) {
        console.error(error);
        renderWeatherFallback();
    }
}

// App Tasks
let tasks = [];

function saveTasks() {
    localStorage.setItem("utilitypage-tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("utilitypage-tasks");
    tasks = stored ? JSON.parse(stored) : [];
}

function formatDate(dateValue) {
    if (!dateValue) return "Sin fecha";
    const date = new Date(dateValue);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function updateStats() {
    const total     = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    todoStats.textContent = `Tareas: ${total} · Completadas: ${completed} · Pendientes: ${total - completed}`;
}

// Renderizado de la lista de tareas
function renderTodos() {
    todoList.innerHTML = "";
    tasks.sort((a, b) => new Date(a.due || "9999-12-31") - new Date(b.due || "9999-12-31"));

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.innerHTML = `
            <div>
                <input type="checkbox" id="task-${task.id}" ${task.done ? "checked" : ""} data-action="toggleDone" />
                <label for="task-${task.id}">${task.text}</label>
                <small>[${task.priority.toUpperCase()}]</small>
                <small>· Fecha límite: ${formatDate(task.due)}</small>
            </div>
            <div>
                <button type="button" data-action="toggleEdit">Editar</button>
                <button type="button" data-action="deleteTask">Eliminar</button>
            </div>
            <div class="edit-row" aria-hidden="true" style="display:none">
                <div>
                    <label>Descripción</label>
                    <input type="text" name="editText" value="${task.text}" />
                </div>
                <div>
                    <label>Fecha límite</label>
                    <input type="date" name="editDue" value="${task.due || ""}" />
                </div>
                <div>
                    <label>Importancia</label>
                    <select name="editPriority">
                        <option value="low"    ${task.priority === "low"    ? "selected" : ""}>Baja</option>
                        <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Media</option>
                        <option value="high"   ${task.priority === "high"   ? "selected" : ""}>Alta</option>
                    </select>
                </div>
                <div>
                    <button type="button" data-action="saveEdit">Guardar</button>
                    <button type="button" data-action="cancelEdit">Cancelar</button>
                </div>
            </div>
        `;
        todoList.appendChild(li);
    });

    updateStats();
}

// Manejo del formulario para añadir tareas
function addTask(event) {
    event.preventDefault();
    const text = taskText.value.trim();
    if (!text) return;

    tasks.push({
        id:        Date.now().toString(),
        text,
        due:       taskDue.value || "",
        priority:  taskPriority.value,
        done:      false,
        createdAt: new Date().toISOString()
    });

    saveTasks();
    renderTodos();
    todoForm.reset();
}

// Manejo de acciones en la lista de tareas
function handleTaskAction(event) {
    const button   = event.target.closest("button");
    const checkbox = event.target.closest("input[type='checkbox']");
    if (!button && !checkbox) return;

    const li = event.target.closest("li");
    if (!li) return;
    const taskIndex = tasks.findIndex(t => t.id === li.dataset.id);
    if (taskIndex === -1) return;
    const task = tasks[taskIndex];

    if (checkbox?.dataset.action === "toggleDone") {
        task.done = checkbox.checked;
        saveTasks();
        renderTodos();
        return;
    }

    const action = button?.dataset.action;

    if (action === "deleteTask") {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTodos();
        return;
    }

    if (action === "toggleEdit") {
        const editRow = li.querySelector(".edit-row");
        const isOpen  = editRow.style.display !== "none";
        editRow.style.display = isOpen ? "none" : "block";
        editRow.setAttribute("aria-hidden", String(isOpen));
        return;
    }

    if (action === "cancelEdit") {
        const editRow = li.querySelector(".edit-row");
        editRow.style.display = "none";
        editRow.setAttribute("aria-hidden", "true");
        return;
    }

    if (action === "saveEdit") {
        const editRow = li.querySelector(".edit-row");
        const newText = editRow.querySelector("input[name='editText']").value.trim();
        if (!newText) return;
        task.text     = newText;
        task.due      = editRow.querySelector("input[name='editDue']").value;
        task.priority = editRow.querySelector("select[name='editPriority']").value;
        saveTasks();
        renderTodos();
    }
}

// Selector de estilos
const styles = [
    { id: "fondo-calma",        label: "Calma",        url: "assets/Calma.jpg" },
    { id: "fondo-cielos",       label: "Cielos",       url: "assets/Cielos.jpg" },
    { id: "fondo-contrastes",   label: "Contrastes",   url: "assets/Contrastes.jpg" },
    { id: "fondo-equilibrio",   label: "Equilibrio",   url: "assets/Equilibrio.jpg" },
    { id: "fondo-esperanza",    label: "Esperanza",    url: "assets/Esperanza.jpg" },
    { id: "fondo-harmonia",     label: "Harmonía",     url: "assets/Harmonía.jpg" },
    { id: "fondo-inmenso",      label: "Inmenso",      url: "assets/Inmenso.jpg" },
    { id: "fondo-intimidad",    label: "Intimidad",    url: "assets/Intimidad.jpg" },
    { id: "fondo-manana",       label: "Mañana",       url: "assets/Mañana.jpg" },
    { id: "fondo-mediodia",     label: "Mediodía",     url: "assets/Mediodia.jpg" },
    { id: "fondo-moleculas",    label: "Moléculas",    url: "assets/Moleculas.jpg" },
    { id: "fondo-naturaleza",   label: "Naturaleza",   url: "assets/Naturaleza.jpg" },
    { id: "fondo-nostalgia",    label: "Nostalgia",    url: "assets/Nostalgia.jpg" },
    { id: "fondo-profundidades",label: "Profundidades",url: "assets/Profundidades.jpg" },
    { id: "fondo-sol",          label: "Sol",          url: "assets/Sol.jpg" },
    { id: "fondo-tradicional",  label: "Tradicional",  url: "assets/Tradicional.jpg" },
    { id: "fondo-tropico",      label: "Trópico",      url: "assets/Trópico.jpg" },
];

const STYLE_KEY = "utilitypage-style";

function applyStyle(styleId) {
    const style = styles.find(s => s.id === styleId);
    if (!style) return;
    document.body.style.backgroundImage = `url("${style.url}")`;
    localStorage.setItem(STYLE_KEY, styleId);
}

function renderStyleSelector() {
    const select = document.getElementById("styleSelector");
    if (!select) return;

    styles.forEach(style => {
        const option = document.createElement("option");
        option.value = style.id;
        option.textContent = style.label;
        select.appendChild(option);
    });

    const saved = localStorage.getItem(STYLE_KEY);
    if (saved) {
        select.value = saved;
        applyStyle(saved);
    }

    select.addEventListener("change", () => applyStyle(select.value));
}

// Bloc de notas
const NOTES_KEY = "utilitypage-notes";

function initNotepad() {
    const notepad = document.getElementById("notepad");
    if (!notepad) return;
    notepad.value = localStorage.getItem(NOTES_KEY) || "";
    notepad.addEventListener("input", () => {
        localStorage.setItem(NOTES_KEY, notepad.value);
    });
}

// Calculadora
function initCalc() {
    const resultEl     = document.getElementById("calc-result");
    const expressionEl = document.getElementById("calc-expression");
    if (!resultEl) return;

    let current    = "0";
    let operator   = null;
    let previous   = null;
    let justEvaled = false;

    function updateDisplay() {
        resultEl.textContent     = current;
        expressionEl.textContent = previous !== null ? `${previous} ${operator}` : "";
    }

    function handleCalc(action, val) {
        if (action === "num") {
            if (justEvaled) { current = val; justEvaled = false; }
            else current = current === "0" ? val : current + val;

        } else if (action === "decimal") {
            if (justEvaled) { current = "0."; justEvaled = false; return; }
            if (!current.includes(".")) current += ".";

        } else if (action === "op") {
            justEvaled = false;
            if (operator && previous !== null) {
                current = String(calculate(parseFloat(previous), parseFloat(current), operator));
            }
            previous = current;
            operator = val;
            current  = "0";

        } else if (action === "equals") {
            if (operator && previous !== null) {
                expressionEl.textContent = `${previous} ${operator} ${current} =`;
                current    = String(calculate(parseFloat(previous), parseFloat(current), operator));
                previous   = null;
                operator   = null;
                justEvaled = true;
            }

        } else if (action === "clear") {
            current    = "0";
            previous   = null;
            operator   = null;
            justEvaled = false;

        } else if (action === "sign") {
            current = String(parseFloat(current) * -1);

        } else if (action === "percent") {
            current = String(parseFloat(current) / 100);
        }

        updateDisplay();
    }

    function calculate(a, b, op) {
        switch (op) {
            case "+": return parseFloat((a + b).toPrecision(12));
            case "-": return parseFloat((a - b).toPrecision(12));
            case "*": return parseFloat((a * b).toPrecision(12));
            case "/": return b !== 0 ? parseFloat((a / b).toPrecision(12)) : "Error";
        }
    }

    document.getElementById("calc-buttons").addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn) return;
        handleCalc(btn.dataset.calc, btn.dataset.val);
    });

    updateDisplay();
}

// Cita del día
const QUOTE_KEY  = "utilitypage-quote";
const QUOTE_DATE = "utilitypage-quote-date";

async function fetchQuote() {
    const today     = new Date().toDateString();
    const saved     = localStorage.getItem(QUOTE_KEY);
    const savedDate = localStorage.getItem(QUOTE_DATE);

    if (saved && savedDate === today) {
        renderQuote(JSON.parse(saved));
        return;
    }

//Llamada API
    try {
        const res  = await fetch("https://thequoteshub.com/api");
        const data = await res.json();
        const quote = { text: data.text, author: data.author, tags: data.tags, id: data.id };
        localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
        localStorage.setItem(QUOTE_DATE, today);
        renderQuote(quote);
    } catch {
        renderQuote({ text: "Creativity is intelligence having fun.", author: "Albert Einstein", tags: ["creativity", "intelligence", "fun"], id: "default" });
    }
}

//Muestra la cita
function renderQuote(quote) {
    const textEl   = document.getElementById("quote-text");
    const authorEl = document.getElementById("quote-author");
    const tagsEl   = document.getElementById("quote-tags");
    const idEl     = document.getElementById("quote-id");
    if (!textEl) return;
    textEl.textContent   = `"${quote.text}"`;
    authorEl.textContent = quote.author ? `— ${quote.author}` : "";
    if (tagsEl) {
        tagsEl.textContent = Array.isArray(quote.tags) && quote.tags.length
            ? `Tags: ${quote.tags.join(", ")}`
            : "";
    }
    if (idEl) {
        idEl.textContent = quote.id ? `ID: ${quote.id}` : "";
    }
}

function initQuote() {
    fetchQuote();
    document.getElementById("quote-refresh")?.addEventListener("click", () => {
        localStorage.removeItem(QUOTE_DATE);
        fetchQuote();
    });
}

// Noticias
const NEWS_KEY = "utilitypage-news-source";

async function fetchNews(rssUrl) {
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = `<li>Cargando noticias...</li>`;
//Llamada API, usando RSS2JSON para convertir el feed RSS a JSON
    try {
        const api  = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`;
        const res  = await fetch(api);
        const data = await res.json();

        if (data.status !== "ok" || !data.items.length) {
            newsList.innerHTML = `<li>No se pudieron cargar las noticias.</li>`;
            return;
        }

        newsList.innerHTML = data.items.map(item => `
            <li>
                <a href="${item.link}" target="_blank" rel="noopener">${item.title}</a>
                <span>${new Date(item.pubDate).toLocaleDateString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
            </li>
        `).join("");
    } catch {
        newsList.innerHTML = `<li>Error cargando noticias. Comprueba tu conexión.</li>`;
    }
}

function initNews() {
    const select  = document.getElementById("news-source");
    const refresh = document.getElementById("news-refresh");
    if (!select) return;

    const saved = localStorage.getItem(NEWS_KEY);
    if (saved) select.value = saved;

    fetchNews(select.value);

    select.addEventListener("change", () => {
        localStorage.setItem(NEWS_KEY, select.value);
        fetchNews(select.value);
    });

    refresh?.addEventListener("click", () => fetchNews(select.value));
}

// Inicialización DOM
window.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    renderTodos();
    loadWeather();
    renderStyleSelector();
    initNotepad();
    initCalc();
    initQuote();
    initNews();

    todoForm.addEventListener("submit", addTask);
    todoList.addEventListener("click", handleTaskAction);

    setInterval(function () {
        updateWeatherClock();
    }, 60000);
});
