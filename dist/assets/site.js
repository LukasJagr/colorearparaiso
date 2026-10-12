(function () {
  "use strict";

  const normalize = (value) =>
    value
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  if (menuToggle && menu) {
    const setMenuState = (open, returnFocus = false) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Cerrar el menú" : "Abrir el menú");
      menu.classList.toggle("is-open", open);
      if (returnFocus) menuToggle.focus();
    };

    menuToggle.addEventListener("click", () => {
      setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false, true);
      }
    });

    document.addEventListener("click", (event) => {
      if (menuToggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) {
        setMenuState(false);
      }
    });

    window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
      if (event.matches) setMenuState(false);
    });
  }

  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      const input = form.querySelector("input[type='search']");
      if (!input || !input.value.trim()) {
        event.preventDefault();
        input?.focus();
      }
    });
  });

  const languageSwitchers = document.querySelectorAll(".language-switcher");
  if (languageSwitchers.length) {
    document.addEventListener("click", (event) => {
      languageSwitchers.forEach((switcher) => {
        if (!switcher.contains(event.target)) switcher.removeAttribute("open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      languageSwitchers.forEach((switcher) => {
        if (!switcher.open) return;
        switcher.removeAttribute("open");
        switcher.querySelector("summary")?.focus();
      });
    });
  }

  const catalog = document.querySelector("[data-catalog]");
  const searchInput = document.querySelector("[data-catalog-search]");
  const counter = document.querySelector("[data-result-count]");
  const empty = document.querySelector("[data-empty-state]");
  const categorySection = document.querySelector("[data-category-section]");
  const resultsSection = document.querySelector("[data-results-section]");
  const resultsHeading = document.querySelector("[data-results-heading]");

  if (catalog && searchInput) {
    const cards = Array.from(catalog.querySelectorAll("[data-search-terms]"));
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";
    searchInput.value = initialQuery;

    const filter = () => {
      const query = normalize(searchInput.value);
      const queryWords = query.split(/\s+/).filter(Boolean);
      let visible = 0;

      cards.forEach((card) => {
        const terms = normalize(card.dataset.searchTerms || "");
        const matches = !query || queryWords.every((word) => {
          if (terms.includes(word)) return true;
          if (word.length >= 4 && terms.includes(word.slice(0, -1))) return true;
          return word.length >= 6 && terms.includes(word.slice(0, -2));
        });
        card.classList.toggle("hidden", !matches);
        if (matches) visible += 1;
      });

      if (counter) {
        counter.textContent = query
          ? `${visible} ${visible === 1 ? "resultado" : "resultados"} para «${searchInput.value.trim()}»`
          : `${cards.length} dibujos`;
      }
      categorySection?.classList.toggle("hidden", Boolean(query));
      resultsSection?.classList.toggle("hidden", !query);
      if (resultsHeading) {
        resultsHeading.textContent = "Resultados de búsqueda";
      }
      empty?.classList.toggle("hidden", visible !== 0);
    };

    searchInput.addEventListener("input", filter);
    filter();
  }

  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });
})();
