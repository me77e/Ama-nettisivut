"use strict";

/* =====================================================
   YHTEYSTIEDOT
   Muokkaa tietoja vain tässä.

   Tyhjäksi jätettyjä tietoja ei näytetä.
   Instagramiin lisätään koko https://-osoite.
===================================================== */

const yhteystiedot = {
  nimi: "Sankofa ry",
  email: "Ama.keshia@gmail.com",
  yhteyshenkilo: "",
  osoite: "",
  puhelin: "",
  instagram: "https://www.instagram.com/sankofary/"
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

  const email = yhteystiedot.email.trim();

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
  const finnish = finnishTexts.get(element);
  const english = element.dataset.en;

  element.textContent =
    currentLanguage === "en"
      ? (english || finnish || "")
      : (finnish || "");
});

document.querySelectorAll("#new-performances [data-en]").forEach((element) => {
  const finnish = element.dataset.fi;
  const english = element.dataset.en;

  element.textContent =
    currentLanguage === "en"
      ? (english || finnish || "")
      : (finnish || "");
});

document.querySelectorAll("#new-performances img[data-alt-en]").forEach((image) => {
  image.alt = currentLanguage === "en"
    ? image.dataset.altEn
    : image.dataset.altFi;
});

document.querySelectorAll("#new-projects [data-en]").forEach((element) => {
  const finnish = element.dataset.fi;
  const english = element.dataset.en;

  element.textContent =
    currentLanguage === "en"
      ? (english || finnish || "")
      : (finnish || "");
});

document.querySelectorAll("#new-projects img[data-alt-en]").forEach((image) => {
  image.alt =
    currentLanguage === "en"
      ? image.dataset.altEn
      : image.dataset.altFi;
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


/* =========================================
   ETUSIVUN SISÄLLÖN LATAAMINEN
========================================= */

async function loadHomeContent() {
  if (currentPage !== "etusivu") return;

  try {
    const response = await fetch("content/etusivu.json");

    if (!response.ok) {
      throw new Error("Sisältötiedostoa ei löytynyt");
    }

    const content = await response.json();

    // Päivitetään etusivun pääkuva JSON-tiedostosta
    const homeImage = document.querySelector(
      '[data-content-image="kuva"]'
    );

    if (homeImage && typeof content.kuva === "string" && content.kuva) {
      homeImage.src = content.kuva;
    }
    
  // Päivitetään toinen kuva JSON-tiedostosta
  const secondImage = document.querySelector('[data-content-image="kuva2"]');

  if (secondImage && typeof content.kuva2 === "string" && content.kuva2) {
    secondImage.src = content.kuva2;
  }
  
    // Päivitetään kolmas kuva JSON-tiedostosta
    const thirdImage = document.querySelector('[data-content-image="kuva3"]');

    if (thirdImage && typeof content.kuva3 === "string" && content.kuva3) {
      thirdImage.src = content.kuva3;
    }

    // Päivitetään kolmannen kuvan vaihtoehtoiset tekstit
    if (thirdImage) {
      if (typeof content.kuva3_alt_fi === "string") {
        finnishAltTexts.set(thirdImage, content.kuva3_alt_fi);
      }

      if (typeof content.kuva3_alt_en === "string") {
        thirdImage.dataset.altEn = content.kuva3_alt_en;
      }

      thirdImage.alt =
        currentLanguage === "en"
          ? (thirdImage.dataset.altEn || "")
          : (finnishAltTexts.get(thirdImage) || "");
    }


    // Päivitetään pääkuvan vaihtoehtoiset tekstit
    if (homeImage) {
      if (typeof content.kuva_alt_fi === "string") {
        finnishAltTexts.set(homeImage, content.kuva_alt_fi);
      }

      if (typeof content.kuva_alt_en === "string") {
        homeImage.dataset.altEn = content.kuva_alt_en;
      }

      homeImage.alt =
        currentLanguage === "en"
          ? (homeImage.dataset.altEn || "")
          : (finnishAltTexts.get(homeImage) || "");
    }
    
    // Päivitetään toisen kuvan vaihtoehtoiset tekstit
    if (secondImage) {
      if (typeof content.kuva2_alt_fi === "string") {
        finnishAltTexts.set(secondImage, content.kuva2_alt_fi);
      }

      if (typeof content.kuva2_alt_en === "string") {
        secondImage.dataset.altEn = content.kuva2_alt_en;
      }

      secondImage.alt =
        currentLanguage === "en"
          ? (secondImage.dataset.altEn || "")
          : (finnishAltTexts.get(secondImage) || "");
    }


    // Päivitetään kuvateksti ja kuvaajan tiedot
      ["kuvateksti", "kuvaaja", "kuva2_teksti", "kuva2_kuvaaja", "kuva3_teksti", "kuva3_kuvaaja"].forEach((field) => {
      const element = document.querySelector(
        `[data-content="${field}"]`
      );

      if (!element) return;

      const finnish = content[`${field}_fi`];
      const english = content[`${field}_en`];

      if (typeof finnish === "string") {
        finnishTexts.set(element, finnish);
      }

      if (typeof english === "string") {
        element.dataset.en = english;
      }

      element.textContent =
        currentLanguage === "en"
          ? (element.dataset.en || finnishTexts.get(element) || "")
          : (finnishTexts.get(element) || "");
    });


    for (let i = 1; i <= 3; i++) {
      const element = document.querySelector(
        `[data-content="esittely${i}"]`
      );

      if (!element) continue;

      const finnish = content[`esittely${i}_fi`];
      const english = content[`esittely${i}_en`];

      if (typeof finnish !== "string" ||
          typeof english !== "string") continue;

      finnishTexts.set(element, finnish);
      element.dataset.en = english;

      element.textContent =
        currentLanguage === "en" ? english : finnish;
    }
  } catch (error) {
    console.error("Etusivun sisältöä ei voitu ladata:", error);
  }
}

loadHomeContent();

async function loadAboutContent() {
  if (currentPage !== "meista") return;

  try {
    const response = await fetch("content/meista.json");

    if (!response.ok) {
      throw new Error("Meistä-sivun sisältöä ei voitu ladata");
    }

    const content = await response.json();

    // Päivitetään kaikki Meistä-sivun tekstit
    document.querySelectorAll("[data-content]").forEach((element) => {
      const field = element.dataset.content;
      const finnish = content[`${field}_fi`];
      const english = content[`${field}_en`];

      if (typeof finnish === "string") {
        finnishTexts.set(element, finnish);
      }

      if (typeof english === "string") {
        element.dataset.en = english;
      }

      // Ama Kyein nimi on sama molemmilla kielillä
      if (field === "ama_otsikko" && typeof content.ama_otsikko === "string") {
        finnishTexts.set(element, content.ama_otsikko);
        element.dataset.en = content.ama_otsikko;
      }

      element.textContent =
        currentLanguage === "en"
          ? (element.dataset.en || finnishTexts.get(element) || "")
          : (finnishTexts.get(element) || "");
    });

    // Päivitetään Ama Kyein kuva
    const amaImage = document.querySelector('[data-content-image="ama_kuva"]');

    if (amaImage && typeof content.ama_kuva === "string" && content.ama_kuva) {
      amaImage.src = content.ama_kuva;
    }

  } catch (error) {
    console.error("Meistä-sivun sisällön lataus epäonnistui:", error);
  }
}

loadAboutContent();


async function loadPerformances() {
  if (currentPage !== "tanssiteokset") return;

  try {
    const response = await fetch("content/luettelot/tanssiteokset.json");

    if (!response.ok) {
      throw new Error("Tanssiteosten luetteloa ei voitu ladata");
    }


const files = await response.json();

const performances = await Promise.all(
  files.map(async (filename) => {
    const response = await fetch(
  `content/uudet-tanssiteokset/${filename}`
);

    if (!response.ok) {
      throw new Error(`Tanssiteosta ei voitu ladata: ${filename}`);
    }

    return response.json();
  })
);

performances.sort(
  (a, b) => Number(a.jarjestys) - Number(b.jarjestys)
);

console.log("Ladatut tanssiteokset:", performances);

const container = document.getElementById("new-performances");

if (!container) return;

container.replaceChildren();

performances.forEach((performance) => {
  const card = document.createElement("article");
  card.className = "performance-card";
  
  // Lisätään kuva, jos sellainen on annettu
  if (performance.kuva) {
    const figure = document.createElement("figure");

    figure.className =
      "photo-frame performance-photo " +
      (performance.kuvan_asettelu === "vertical"
        ? "vertical-photo"
        : "landscape-photo");

    const image = document.createElement("img");
    image.src = performance.kuva;
    image.alt =
      currentLanguage === "en"
        ? performance.kuva_alt_en || ""
        : performance.kuva_alt_fi || "";
        image.dataset.altFi = performance.kuva_alt_fi || "";
        image.dataset.altEn = performance.kuva_alt_en || "";
        image.loading = "lazy";

    figure.appendChild(image);

    if (performance.kuvaaja_fi || performance.kuvaaja_en) {
      const credit = document.createElement("figcaption");
      credit.className = "photo-credit";
      credit.textContent =
        currentLanguage === "en"
          ? performance.kuvaaja_en || ""
          : performance.kuvaaja_fi || "";
          credit.dataset.fi = performance.kuvaaja_fi || "";
          credit.dataset.en = performance.kuvaaja_en || "";

      figure.appendChild(credit);
    }

    card.appendChild(figure);
  }


  const textContainer = document.createElement("div");
  textContainer.className = "performance-text";

  const heading = document.createElement("h2");
  heading.textContent =
    currentLanguage === "en"
      ? performance.nimi_en
      : performance.nimi_fi;
      heading.dataset.en = performance.nimi_en;
      heading.dataset.fi = performance.nimi_fi;

  textContainer.appendChild(heading);
  
  // Lisätään tanssiteoksen esittelytekstit
  performance.tekstit?.forEach((text) => {
    const paragraph = document.createElement("p");

    paragraph.textContent =
      currentLanguage === "en"
        ? text.en
        : text.fi;
        paragraph.dataset.en = text.en;
        paragraph.dataset.fi = text.fi;

    textContainer.appendChild(paragraph);
  });

  card.appendChild(textContainer);
  
  // Lisätään YouTube-traileri, jos sellainen on annettu
  if (performance.traileri) {
    try {
      const url = new URL(performance.traileri);

      let videoId = "";

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1);
      } else if (
        url.hostname === "youtube.com" ||
        url.hostname === "www.youtube.com"
      ) {
        videoId = url.searchParams.get("v") || "";

        if (url.pathname.startsWith("/embed/")) {
          videoId = url.pathname.split("/")[2];
        }
      } else if (url.hostname === "www.youtube-nocookie.com") {
        videoId = url.pathname.split("/")[2];
      }

      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        const videoContainer = document.createElement("div");
        videoContainer.className = "trailer-video";

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
        iframe.title = "Tanssiteoksen traileri";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        videoContainer.appendChild(iframe);
        textContainer.appendChild(videoContainer);
      }
    } catch (error) {
      console.warn("Trailerin linkki ei kelpaa:", error);
    }
  }

  
  // Lisätään tanssiteoksen tekijätiedot
  if (performance.tekijat?.length > 0) {
    const credits = document.createElement("dl");
    credits.className = "credits";

    performance.tekijat.forEach((person) => {
      const row = document.createElement("div");

      const role = document.createElement("dt");
      role.textContent =
        currentLanguage === "en"
          ? person.rooli_en
          : person.rooli_fi;
          role.dataset.fi = person.rooli_fi || "";
          role.dataset.en = person.rooli_en || "";

      const name = document.createElement("dd");
      name.textContent =
        currentLanguage === "en"
          ? person.nimi_en
          : person.nimi_fi;
          name.dataset.fi = person.nimi_fi || "";
          name.dataset.en = person.nimi_en || "";

      row.appendChild(role);
      row.appendChild(name);
      credits.appendChild(row);
    });

    textContainer.appendChild(credits);
  }


  container.appendChild(card);
});

  } catch (error) {
    console.error("Tanssiteosten lataus epäonnistui:", error);
  }
}

loadPerformances();


async function loadProjects() {
  if (currentPage !== "projektit") return;

  try {
    const response = await fetch("content/luettelot/projektit.json");

    if (!response.ok) {
      throw new Error("Projektien luetteloa ei voitu ladata");
    }

    const files = await response.json();

    console.log("Uusien projektien tiedostot:", files);
    
const projects = await Promise.all(
  files.map(async (filename) => {
    const response = await fetch(`content/uudet-projektit/${filename}`);

    if (!response.ok) {
      throw new Error(`Projektia ei voitu ladata: ${filename}`);
    }

    return response.json();
  })
);

console.log("Ladatut projektit:", projects);

const container = document.getElementById("new-projects");

if (!container) return;

container.replaceChildren();

projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "tour-project";

  const heading = document.createElement("h2");
  heading.textContent =
    currentLanguage === "en"
      ? project.nimi_en
      : project.nimi_fi;

  heading.dataset.fi = project.nimi_fi || "";
  heading.dataset.en = project.nimi_en || "";

  card.appendChild(heading);
  
if (project.kuva) {
  const figure = document.createElement("figure");
  figure.className = "photo-frame landscape-photo";

  const image = document.createElement("img");
  image.src = project.kuva;
  image.alt =
    currentLanguage === "en"
      ? project.kuva_alt_en || ""
      : project.kuva_alt_fi || "";

  image.dataset.altFi = project.kuva_alt_fi || "";
  image.dataset.altEn = project.kuva_alt_en || "";
  image.loading = "lazy";

  figure.appendChild(image);

  if (project.kuvaaja_fi || project.kuvaaja_en) {
    const credit = document.createElement("figcaption");
    credit.className = "photo-credit";

    credit.textContent =
      currentLanguage === "en"
        ? project.kuvaaja_en || ""
        : project.kuvaaja_fi || "";

    credit.dataset.fi = project.kuvaaja_fi || "";
    credit.dataset.en = project.kuvaaja_en || "";

    figure.appendChild(credit);
  }

  card.appendChild(figure);
}

  
project.tekstit?.forEach((text) => {
  const paragraph = document.createElement("p");

  paragraph.textContent =
    currentLanguage === "en"
      ? text.en
      : text.fi;

  paragraph.dataset.fi = text.fi || "";
  paragraph.dataset.en = text.en || "";

  card.appendChild(paragraph);
});

  container.appendChild(card);
});


  } catch (error) {
    console.error("Projektien lataus epäonnistui:", error);
  }
}

loadProjects();



