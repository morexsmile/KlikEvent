
const events = [
    {
        id: 1,
        name: "Noc Muzyki na Żywo",
        city: "Warszawa",
        category: "Muzyka",
        date: "2026-12-05",
        time: "19:00",
        price: 79,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
        description: "Wieczór pełen muzyki, energii i niezapomnianych występów."
    },
    {
        id: 2,
        name: "Festiwal Kolorów",
        city: "Kraków",
        category: "Festiwale",
        date: "2026-12-12",
        time: "15:00",
        price: 35,
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=85",
        description: "Kolorowe atrakcje, muzyka i dobra zabawa dla każdego."
    },
    {
        id: 3,
        name: "Mecz Gwiazd",
        city: "Wrocław",
        category: "Sport",
        date: "2026-12-18",
        time: "18:30",
        price: 50,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
        description: "Sportowe emocje i rywalizacja na najwyższym poziomie."
    },
    {
        id: 4,
        name: "Wieczór Sztuki",
        city: "Gdańsk",
        category: "Kultura",
        date: "2027-01-09",
        time: "17:00",
        price: 25,
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
        description: "Poznaj lokalnych artystów i odkryj nowe inspiracje."
    },
    {
        id: 5,
        name: "Street Food Festival",
        city: "Poznań",
        category: "Jedzenie",
        date: "2027-01-16",
        time: "12:00",
        price: 0,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
        description: "Smaki z różnych stron świata w jednym miejscu."
    },
    {
        id: 6,
        name: "Koncert Zimowy",
        city: "Warszawa",
        category: "Muzyka",
        date: "2027-01-23",
        time: "20:00",
        price: 99,
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",
        description: "Wyjątkowy koncert w zimowej atmosferze."
    }
];

const eventsGrid = document.querySelector("#events-grid");
const eventsCount = document.querySelector("#events-count");
const searchInput = document.querySelector("#filter-search");
const citySelect = document.querySelector("#filter-city");
const categorySelect = document.querySelector("#filter-category");
const priceInput = document.querySelector("#filter-price");
const priceValue = document.querySelector("#price-value");
const sortSelect = document.querySelector("#sort-events");
const noEvents = document.querySelector("#no-events");
const clearFiltersButton = document.querySelector("#clear-filters");
const resetEmptyButton = document.querySelector("#reset-empty-filters");

function formatDate(dateString) {
    return new Intl.DateTimeFormat("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(`${dateString}T12:00:00`));
}

function renderEvents(eventsToRender) {
    eventsGrid.innerHTML = "";

    eventsToRender.forEach(event => {
        const card = document.createElement("article");
        card.className = "event-card";

        const image = document.createElement("img");
        image.className = "event-card-image";
        image.src = event.image;
        image.alt = event.name;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "event-card-content";

        const category = document.createElement("span");
        category.className = "event-card-category";
        category.textContent = event.category;

        const title = document.createElement("h3");
        title.textContent = event.name;

        const description = document.createElement("p");
        description.className = "event-card-description";
        description.textContent = event.description;

        const details = document.createElement("div");
        details.className = "event-card-details";

        const date = document.createElement("span");
        date.textContent = `📅 ${formatDate(event.date)} · ${event.time}`;

        const city = document.createElement("span");
        city.textContent = `📍 ${event.city}`;

        const bottom = document.createElement("div");
        bottom.className = "event-card-bottom";

        const price = document.createElement("strong");
        price.className = "event-card-price";
        price.textContent = event.price === 0 ? "Bezpłatne" : `${event.price} zł`;

        const link = document.createElement("a");
        link.className = "event-card-link";
        link.href = `event-details.html?id=${event.id}`;
        link.textContent = "Zobacz szczegóły";

        details.append(date, city);
        bottom.append(price, link);
        content.append(category, title, description, details, bottom);
        card.append(image, content);

        eventsGrid.appendChild(card);
    });

    eventsCount.textContent =
        `Znaleziono: ${eventsToRender.length} ${eventsToRender.length === 1 ? "wydarzenie" : "wydarzeń"}`;

    noEvents.hidden = eventsToRender.length !== 0;
    eventsGrid.hidden = eventsToRender.length === 0;
}

function filterAndSortEvents() {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase("pl");
    const selectedCity = citySelect.value;
    const selectedCategory = categorySelect.value;
    const maxPrice = Number(priceInput.value);

    let filteredEvents = events.filter(event => {
        const matchesSearch =
            event.name.toLocaleLowerCase("pl").includes(searchTerm) ||
            event.description.toLocaleLowerCase("pl").includes(searchTerm);

        const matchesCity = !selectedCity || event.city === selectedCity;
        const matchesCategory = !selectedCategory || event.category === selectedCategory;
        const matchesPrice = event.price <= maxPrice;

        return matchesSearch && matchesCity && matchesCategory && matchesPrice;
    });

    switch (sortSelect.value) {
        case "price-asc":
            filteredEvents.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filteredEvents.sort((a, b) => b.price - a.price);
            break;
        case "name":
            filteredEvents.sort((a, b) => a.name.localeCompare(b.name, "pl"));
            break;
        default:
            filteredEvents.sort((a, b) => a.date.localeCompare(b.date));
    }

    renderEvents(filteredEvents);
}

function resetFilters() {
    searchInput.value = "";
    citySelect.value = "";
    categorySelect.value = "";
    priceInput.value = priceInput.max;
    priceValue.textContent = `${priceInput.value} zł`;
    sortSelect.value = "date";

    filterAndSortEvents();
}

function readUrlParameters() {
    const params = new URLSearchParams(window.location.search);

    searchInput.value = params.get("search") || "";

    const cityFromUrl = params.get("city") || "";
    const cityExists = [...citySelect.options].some(option => option.value === cityFromUrl);

    if (cityExists) {
        citySelect.value = cityFromUrl;
    }
}

searchInput.addEventListener("input", filterAndSortEvents);
citySelect.addEventListener("change", filterAndSortEvents);
categorySelect.addEventListener("change", filterAndSortEvents);
priceInput.addEventListener("input", () => {
    priceValue.textContent = `${priceInput.value} zł`;
    filterAndSortEvents();
});
sortSelect.addEventListener("change", filterAndSortEvents);
clearFiltersButton.addEventListener("click", resetFilters);
resetEmptyButton.addEventListener("click", resetFilters);

readUrlParameters();
priceValue.textContent = `${priceInput.value} zł`;
filterAndSortEvents();
