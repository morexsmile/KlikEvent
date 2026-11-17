document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const loadingElement = document.querySelector("#event-loading");
    const notFoundElement = document.querySelector("#event-not-found");
    const eventContent = document.querySelector("#event-content");

    const eventImage = document.querySelector("#event-image");
    const eventCategory = document.querySelector("#event-category");
    const eventTitle = document.querySelector("#event-title");
    const eventShortDescription = document.querySelector("#event-short-description");
    const eventCity = document.querySelector("#event-city");
    const eventDescription = document.querySelector("#event-description");

    const eventDate = document.querySelector("#event-date");
    const eventTime = document.querySelector("#event-time");
    const eventLocationCity = document.querySelector("#event-location-city");
    const eventInformationPrice = document.querySelector("#event-information-price");

    const eventOrganizerName = document.querySelector("#event-organizer-name");

    const eventTicketPrice = document.querySelector("#event-ticket-price");
    const ticketEventName = document.querySelector("#ticket-event-name");
    const ticketEventDate = document.querySelector("#ticket-event-date");
    const ticketEventCity = document.querySelector("#ticket-event-city");

    const ticketQuantity = document.querySelector("#ticket-quantity");
    const decreaseButton = document.querySelector("#quantity-decrease");
    const increaseButton = document.querySelector("#quantity-increase");

    const ticketTotalPrice = document.querySelector("#ticket-total-price");
    const reserveButton = document.querySelector("#reserve-ticket-button");

    // ========================================
    // EVENT DATA
    // ========================================

    const events = [
        {
            id: 1,
            name: "Noc Muzyki na Żywo",
            city: "Warszawa",
            category: "Muzyka",
            date: "2026-12-05",
            time: "19:00",
            price: 79,
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
            description: "Wieczór pełen muzyki, energii i niezapomnianych występów. Przygotuj się na wyjątkową atmosferę, świetne brzmienia i spotkanie z ludźmi, którzy kochają muzykę tak samo jak Ty.",
            organizer: "KlikEvent Music"
        },
        {
            id: 2,
            name: "Festiwal Kolorów",
            city: "Kraków",
            category: "Festiwale",
            date: "2026-12-12",
            time: "15:00",
            price: 35,
            image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85",
            description: "Kolorowe atrakcje, muzyka i dobra zabawa dla każdego. Spędź wyjątkowy dzień pełen pozytywnej energii, spotkań i niezapomnianych chwil.",
            organizer: "Color Events"
        },
        {
            id: 3,
            name: "Mecz Gwiazd",
            city: "Wrocław",
            category: "Sport",
            date: "2026-12-18",
            time: "18:30",
            price: 50,
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85",
            description: "Sportowe emocje i rywalizacja na najwyższym poziomie. Zobacz wyjątkowe spotkanie i poczuj atmosferę prawdziwego sportowego widowiska.",
            organizer: "Sport Arena"
        },
        {
            id: 4,
            name: "Wieczór Sztuki",
            city: "Gdańsk",
            category: "Kultura",
            date: "2027-01-09",
            time: "17:00",
            price: 25,
            image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85",
            description: "Poznaj lokalnych artystów i odkryj nowe inspiracje. Wieczór pełen sztuki, kreatywności i ciekawych spotkań.",
            organizer: "Art Space"
        },
        {
            id: 5,
            name: "Street Food Festival",
            city: "Poznań",
            category: "Jedzenie",
            date: "2027-01-16",
            time: "12:00",
            price: 0,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85",
            description: "Smaki z różnych stron świata w jednym miejscu. Odkryj nowe potrawy, poznaj lokalnych wystawców i ciesz się wspólnym świętem jedzenia.",
            organizer: "Food Lovers"
        },
        {
            id: 6,
            name: "Koncert Zimowy",
            city: "Warszawa",
            category: "Muzyka",
            date: "2027-01-23",
            time: "20:00",
            price: 99,
            image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
            description: "Wyjątkowy koncert w zimowej atmosferze. Przygotuj się na wieczór pełen emocji, pięknych dźwięków i wyjątkowych muzycznych doświadczeń.",
            organizer: "Winter Sounds"
        }
    ];


    // ========================================
    // HELPER FUNCTIONS
    // ========================================

    function formatDate(dateString) {
        return new Intl.DateTimeFormat("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(`${dateString}T12:00:00`));
    }

    function formatPrice(price) {
        return price === 0 ? "Bezpłatne" : `${price} zł`;
    }

    function showNotFound() {
        loadingElement.hidden = true;
        eventContent.hidden = true;
        notFoundElement.hidden = false;
    }

    // ========================================
    // GET EVENT FROM URL
    // ========================================

    const params = new URLSearchParams(window.location.search);
    const eventId = Number(params.get("id"));

    const selectedEvent = events.find(event => event.id === eventId);

    if (!Number.isInteger(eventId) || !selectedEvent) {
        showNotFound();
        return;
    }

    // ========================================
    // DISPLAY EVENT INFORMATION
    // ========================================

    function displayEvent(event) {
        document.title = `${event.name} | KlikEvent`;

        eventImage.src = event.image;
        eventImage.alt = event.name;

        eventCategory.textContent = event.category;
        eventTitle.textContent = event.name;
        eventShortDescription.textContent = event.description;
        eventCity.textContent = event.city;

        eventDescription.textContent = event.description;

        eventDate.textContent = formatDate(event.date);
        eventTime.textContent = event.time;
        eventLocationCity.textContent = event.city;

        eventInformationPrice.textContent = formatPrice(event.price);

        eventOrganizerName.textContent = event.organizer;

        eventTicketPrice.textContent = formatPrice(event.price);

        ticketEventName.textContent = event.name;
        ticketEventDate.textContent = formatDate(event.date);
        ticketEventCity.textContent = event.city;

        updateTicketTotal();

        loadingElement.hidden = true;
        notFoundElement.hidden = true;
        eventContent.hidden = false;
    }

    // ========================================
    // TICKET QUANTITY AND PRICE
    // ========================================

    function getQuantity() {
        const quantity = Number(ticketQuantity.value);

        if (!Number.isInteger(quantity)) {
            return 1;
        }

        return Math.min(10, Math.max(1, quantity));
    }


    function updateTicketTotal() {
        const quantity = getQuantity();
        ticketQuantity.value = quantity;
        const total = selectedEvent.price * quantity;
        ticketTotalPrice.textContent = formatPrice(total);
        decreaseButton.disabled = quantity <= 1;
        increaseButton.disabled = quantity >= 10;
        reserveButton.disabled = false;
    }

    decreaseButton.addEventListener("click", () => {
        const quantity = getQuantity();
        if (quantity > 1) {
            ticketQuantity.value = quantity - 1;
            updateTicketTotal();
        }
    });

    increaseButton.addEventListener("click", () => {
        const quantity = getQuantity();
        if (quantity < 10) {
            ticketQuantity.value = quantity + 1;
            updateTicketTotal();
        }
    });

    ticketQuantity.addEventListener("change", updateTicketTotal);
    ticketQuantity.addEventListener("input", () => {
        if (ticketQuantity.value === "") {
            ticketTotalPrice.textContent = "—";
            return;
        }
        updateTicketTotal();
    });

    // ========================================
    // DEMO RESERVATION
    // ========================================

    reserveButton.addEventListener("click", () => {
        const quantity = getQuantity();
        const total = selectedEvent.price * quantity;
        const message = selectedEvent.price === 0
            ? `Wybrano ${quantity} bezpłatnych biletów na wydarzenie "${selectedEvent.name}". To tylko demonstracja — rezerwacja nie została zapisana.`
            : `Wybrano ${quantity} biletów na wydarzenie "${selectedEvent.name}". Łączna cena: ${total} zł. To tylko demonstracja — rezerwacja nie została zapisana.`;
        alert(message);
    });

    // ========================================
    // INITIALIZE PAGE
    // ========================================
    displayEvent(selectedEvent);
});
