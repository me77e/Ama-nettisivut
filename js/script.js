"use strict";

/* =====================================================
   YHTEYSTIEDOT
   Muokkaa tietoja vain tässä.

   Tyhjäksi jätettyjä tietoja ei näytetä.
   Instagramiin lisätään koko https://-osoite.
===================================================== */

const yhteystiedot = {
  nimi: "Sankofa ry",
  sahkoposti: "Info.sankofary@gmail.com",
  puhelin: "",
  yhteyshenkilo: "",
  osoite: "",
  instagram: ""
};

/* =====================================================
   KAIKKIEN SIVUJEN YHTEINEN YLÄVALIKKO
===================================================== */

const header = document.querySelector("#site-header");

if (header) {
  header.innerHTML = `
    <div class="header-inner">
      <button
        class="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="main-navigation"
      >
        <span class="menu-symbol" aria-hidden="true">☰</span>
        <span data-en="Menu">Valikko</span>
      </button>

      <nav
        id="main-navigation"
        class="main-navigation"
        aria-label="Päävalikko"
      >
        <a
          href="index.html"
          data-page-link="etusivu"
          data-en="Home"
        >
          Etusivu
        </a>

        <a
          href="meistä.html"
          data-page-link="meista"
          data-en="About us"
        >
          Meistä
        </a>

        <a
          href="tanssiteokset.html"
          data-page-link="tanssiteokset"
          data-en="Performances"
        >
          Tanssiteokset
        </a>

        <a
          href="projektit.html"
          data-page-link="projektit"
          data-en="Projects"
        >
          Projektit
        </a>

        <a
          href="yhteydenotto.html"
          data-page-link="yhteydenotto"
          data-en="Contact"
        >
          Yhteydenotto
        </a>
      </nav>

<div class="language-picker language-flags">
  <button
    class="language-flag"
    type="button"
    data-language="fi"
    aria-label="Suomi"
    aria-pressed="true"
    title="Suomi"
  >
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      aria-hidden="true"
    >
      <rect width="36" height="24" fill="#ffffff"></rect>
      <rect x="10" width="6" height="24" fill="#003580"></rect>
      <rect y="9" width="36" height="6" fill="#003580"></rect>
    </svg>
  </button>

<button class="language-flag" type="button"
  data-language="en"
  aria-label="English"
  aria-pressed="false"
  title="English">
  <svg width="36" height="24" viewBox="0 0 36 24" aria-hidden="true">
    <rect width="36" height="24" fill="#012169"></rect>
    <path d="M0 0 L36 24 M36 0 L0 24"
      stroke="#ffffff" stroke-width="5"></path>
    <path d="M0 0 L36 24 M36 0 L0 24"
      stroke="#C8102E" stroke-width="2.5"></path>
    <path d="M18 0 V24 M0 12 H36"
      stroke="#ffffff" stroke-width="8"></path>
    <path d="M18 0 V24 M0 12 H36"
      stroke="#C8102E" stroke-width="4.5"></path>
  </svg>
</button>
</div>
  `;
}

/* =====================================================
   KAIKKIEN SIVUJEN YHTEINEN ALATUNNISTE
===================================================== */

const footer = document.querySelector("#site-footer");

if (footer) {
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <p class="footer-name" data-contact="name">Sankofa ry</p>
        <a class="footer-email" data-contact="email"></a>
      </div>

      <p
        class="footer-credit"
        data-en="Website design and development: Mette Holmström"
      >
        Sivuston suunnittelu ja toteutus: Mette Holmström
      </p>
    </div>
  `;
}

/* =====================================================
   AKTIIVINEN SIVU
===================================================== */

const currentPage = document.body.dataset.page || "etusivu";

document.querySelectorAll("[data-page-link]").forEach((link) => {
  if (link.dataset.pageLink === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

/* =====================================================
   YHTEYSTIETOJEN NÄYTTÄMINEN
===================================================== */

function updateContactDetails() {
  document.querySelectorAll('[data-contact="name"]').forEach((element) => {
    element.textContent = yhteystiedot.nimi;
  });

  const email = yhteystiedot.sahkoposti.trim();

  document.querySelectorAll('[data-contact="email"]').forEach((element) => {
    element.textContent = email;
    element.hidden = !email;

    if (email) {
      element.href = `mailto:${email}`;
    } else {
      element.removeAttribute("href");
    }
  });

  const emailRow = document.querySelector('[data-contact-row="email"]');

  if (emailRow) {
    emailRow.hidden = !email;
  }

  document
    .querySelectorAll('[data-contact="email-button"]')
    .forEach((element) => {
      element.hidden = !email;

      if (email) {
        element.href = `mailto:${email}`;
      } else {
        element.removeAttribute("href");
      }
    });

  setContactRow("person", yhteystiedot.yhteyshenkilo);
  setContactRow("address", yhteystiedot.osoite);

  const phone = yhteystiedot.puhelin.trim();

  setContactRow(
    "phone",
    phone,
    phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : ""
  );

  const instagramRow = document.querySelector(
    '[data-contact-row="instagram"]'
  );

  const instagramLink = document.querySelector(
    '[data-contact="instagram"]'
  );

  let instagramUrl = "";

  if (yhteystiedot.instagram.trim()) {
    try {
      const url = new URL(yhteystiedot.instagram);

      if (url.protocol === "https:" || url.protocol === "http:") {
        instagramUrl = url.href;
      }
    } catch {
      // Virheellistä osoitetta ei näytetä.
    }
  }

  if (instagramRow && instagramLink) {
    instagramRow.hidden = !instagramUrl;

    if (instagramUrl) {
      instagramLink.href = instagramUrl;
    } else {
      instagramLink.removeAttribute("href");
    }
  }
}

function setContactRow(type, value, href = "") {
  const row = document.querySelector(
    `[data-contact-row="${type}"]`
  );

  const element = document.querySelector(
    `[data-contact="${type}"]`
  );

  if (!row || !element) {
    return;
  }

  const text = value.trim();

  row.hidden = !text;
  element.textContent = text;

  if (element.tagName === "A") {
    if (href) {
      element.href = href;
    } else {
      element.removeAttribute("href");
    }
  }
}

updateContactDetails();

/* =====================================================
   MOBIILIVALIKKO
===================================================== */

const navigation = document.querySelector("#main-navigation");
const menuToggle = document.querySelector(".menu-toggle");

function closeMenu() {
  if (!navigation || !menuToggle) {
    return;
  }

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");

  const symbol = menuToggle.querySelector(".menu-symbol");

  if (symbol) {
    symbol.textContent = "☰";
  }
}

if (navigation && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);

    const symbol = menuToggle.querySelector(".menu-symbol");

    if (symbol) {
      symbol.textContent = isOpen ? "☰" : "×";
    }
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isOpen) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window
    .matchMedia("(min-width: 761px)")
    .addEventListener("change", closeMenu);
}

/* =====================================================
   KIELIVALINTA
   Suomenkielinen teksti on HTML-elementin sisällä.
   Englanninkielinen teksti on data-en-attribuutissa.
===================================================== */

const languageSelect = document.querySelector("#language");

const translatedElements = [
  ...document.querySelectorAll("[data-en]")
];

const finnishTexts = new Map(
  translatedElements.map((element) => [
    element,
    element.textContent.trim()
  ])
);

const translatedImages = [
  ...document.querySelectorAll("[data-alt-en]")
];

const finnishAltTexts = new Map(
  translatedImages.map((image) => [image, image.alt])
);

const pageTitles = {
  fi: {
    etusivu: "Etusivu",
    meista: "Meistä",
    tanssiteokset: "Tanssiteokset",
    projektit: "Projektit",
    yhteydenotto: "Yhteydenotto"
  },

  en: {
    etusivu: "Home",
    meista: "About us",
    tanssiteokset: "Performances",
    projektit: "Projects",
    yhteydenotto: "Contact"
  }
};

let currentLanguage = "fi";

function changeLanguage(language) {
  currentLanguage = language === "en" ? "en" : "fi";

  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-language]").forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    String(button.dataset.language === currentLanguage)
  );
});

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }

  translatedElements.forEach((element) => {
    element.textContent =
      currentLanguage === "en"
        ? element.dataset.en
        : finnishTexts.get(element);
  });

  translatedImages.forEach((image) => {
    image.alt =
      currentLanguage === "en"
        ? image.dataset.altEn
        : finnishAltTexts.get(image);
  });

  navigation?.setAttribute(
    "aria-label",
    currentLanguage === "en" ? "Main navigation" : "Päävalikko"
  );

  const title = pageTitles[currentLanguage][currentPage];

  document.title = title
    ? `${title} | Sankofa ry`
    : "Sankofa ry";

  /*
   * Kielivalinta kulkee myös linkkien mukana.
   * Näin se toimii paikallisissa HTML-tiedostoissa,
   * vaikka selaimen localStorage olisi estetty.
   */
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !/\.html(?:[?#]|$)/i.test(href)) {
      return;
    }

    const url = new URL(href, window.location.href);
    url.searchParams.set("lang", currentLanguage);

    link.setAttribute(
      "href",
      url.pathname.split("/").pop() + url.search + url.hash
    );
  });

  try {
    localStorage.setItem("sankofa-language", currentLanguage);
  } catch {
    // Kielivalinta toimii silti linkkien kautta.
  }
}

languageSelect?.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
});

let initialLanguage = "fi";

try {
  initialLanguage =
    localStorage.getItem("sankofa-language") || "fi";
} catch {
  initialLanguage = "fi";
}

const languageInAddress = new URLSearchParams(
  window.location.search
).get("lang");

if (languageInAddress === "fi" || languageInAddress === "en") {
  initialLanguage = languageInAddress;
}

changeLanguage(initialLanguage);

/* =====================================================
   KUVAPAIKAT
   Jos kuvaa ei löydy, näytetään sen tilalla teksti.
===================================================== */

document.querySelectorAll(".photo-frame img").forEach((image) => {
  const placeholder = image.parentElement.querySelector(
    ".photo-placeholder"
  );

  function showPlaceholder() {
    image.hidden = true;

    if (placeholder) {
      placeholder.hidden = false;
    }
  }

  function showImage() {
    image.hidden = false;

    if (placeholder) {
      placeholder.hidden = true;
    }
  }

  image.addEventListener("error", showPlaceholder);
  image.addEventListener("load", showImage);

  if (image.complete) {
    if (image.naturalWidth > 0) {
      showImage();
    } else {
      showPlaceholder();
    }
  }
});
document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    changeLanguage(button.dataset.language);
  });
});