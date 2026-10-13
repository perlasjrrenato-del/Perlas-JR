(function () {
  const HUES = {
    plata: [210, 40, 200],
    violeta: [276, 248, 300],
    roja: [2, 350, 18],
    dorada: [42, 28, 55],
    rosa: [340, 8, 355],
    blanca: [36, 200, 330],
    verde: [150, 96, 168],
    oro: [40, 32, 18],
    azul: [205, 232, 262],
    naranja: [28, 18, 42],
    cobre: [18, 22, 8],
    manzana: [118, 86, 140],
    cereza: [348, 0, 12],
    amarilla: [52, 46, 28],
    grafito: [220, 210, 200],
    lava: [8, 16, 2],
  };

  const PHOTOS = {
    Plata: "img/plata.jpeg",
    Violeta: "img/violeta.jpeg",
    Roja: "img/roja.jpeg",
    Dorada: "img/dorada.jpeg",
    Rosa: "img/rosa.jpeg",
    Blanca: "img/blanca.jpeg",
    Verde: "img/verde.jpeg",
    Oro: "img/oro.jpeg",
    Azul: "img/azul.jpeg",
    Naranja: "img/naranja.jpeg",
    Cobre: "img/cobre.jpeg",
  };

  const LINES = [
    {
      title: "Perla en polvo · Xilaricas",
      note: "100 g · $500",
      size: "100 g",
      price: 500,
      colors: ["Plata", "Violeta", "Roja", "Dorada", "Rosa", "Blanca", "Verde", "Oro", "Azul"],
    },
    {
      title: "Medianas",
      note: "250 g · $250",
      size: "250 g",
      price: 250,
      colors: ["Violeta", { name: "Blanca", photo: "img/blanca-mediana.jpeg" }, "Oro", "Roja", "Dorada", "Verde", "Azul", "Naranja", "Cobre", "Rosa"],
    },
    {
      title: "Mediana fina",
      note: "250 g · $250",
      size: "250 g",
      price: 250,
      colors: ["Roja", "Azul", { name: "Blanca", photo: "img/blanca-fina.jpeg" }, "Dorada"],
    },
    {
      title: "Rojo super",
      note: "Piezas sueltas",
      colors: [
        { name: "Rojo super", size: "100 g", price: 600, hue: "roja" },
        { name: "Rojo súper limpia", size: "100 g", price: 600, hue: "roja" },
        { name: "Roja lava", size: "100 g", price: 1400, hue: "lava" },
      ],
    },
    {
      title: "Candy",
      note: "Piezas sueltas",
      colors: [
        { name: "Candy manzana", size: "100 g", price: 420, hue: "manzana", photo: "img/candy-manzana.jpeg" },
        { name: "Candy cereza", size: "100 g", price: 420, hue: "cereza", photo: "img/candy-cereza.jpeg" },
        { name: "Candy azul", size: "100 g", price: 420, hue: "azul", photo: "img/azul.jpeg" },
      ],
    },
    {
      title: "Fluorescentes",
      note: "Piezas sueltas",
      colors: [
        { name: "Fluorescente amarilla", size: "", price: 350, hue: "amarilla" },
        { name: "Fluorescente naranja", size: "", price: 350, hue: "naranja" },
      ],
    },
    {
      title: "Especiales",
      note: "Piezas sueltas",
      colors: [
        { name: "Escarabajo", size: "100 g", price: 750, hue: "violeta", photo: "img/escarabajo.jpeg" },
        { name: "Grafito", size: "", price: 300, hue: "grafito" },
        { name: "Blanca extremo", size: "100 g", price: 850, hue: "blanca", photo: "img/blanca-extremo.jpeg" },
        { name: "Palio naranja", size: "100 g", price: 400, hue: "naranja", photo: "img/naranja.jpeg" },
      ],
    },
  ];

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const stage = document.getElementById("stage");
  const caption = document.getElementById("caption");
  const heroPowder = document.getElementById("heroPowder");
  const live = document.getElementById("live");
  const setup = document.getElementById("setup");
  const canvas = document.getElementById("dust");
  if (!canvas) {
    paintSocials();
    paintLinks();
    return;
  }
  const ctx = canvas.getContext("2d", { alpha: true });
  const lux = document.getElementById("lux");

  let active = "blanco";
  const goal = { h1: 36, h2: 200, h3: 330 };
  const hue = { h1: 36, h2: 200, h3: 330 };
  const pointer = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.42 };
  const light = { x: pointer.x, y: pointer.y };

  function sellerNumber() {
    const raw = window.CHROMA_CONFIG && window.CHROMA_CONFIG.whatsapp;
    const digits = String(raw || "").replace(/\D/g, "");
    if (digits.length < 11 || digits.length > 15) return "";
    return digits;
  }

  function message(label) {
    if (!label) return "Hola, vi la página de JR Perlas Automotrices. Quiero información de la pintura en polvo.";
    return "Hola, vi JR Perlas Automotrices. Me interesa " + label + ".";
  }

  function waHref(toneName) {
    const number = sellerNumber();
    if (!number) return "";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message(toneName));
  }

  function bindLink(anchor, toneName) {
    const href = waHref(toneName);
    if (!href) {
      anchor.href = "#linea";
      anchor.removeAttribute("target");
      return;
    }
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  function paintSocials() {
    const cfg = window.CHROMA_CONFIG || {};
    document.querySelectorAll("[data-social]").forEach(function (anchor) {
      const kind = anchor.dataset.social;
      let href = "";
      if (kind === "whatsapp") {
        const number = sellerNumber();
        href = number ? "https://wa.me/" + number : "";
      } else if (kind === "facebook") {
        href = cfg.facebook || "";
      } else if (kind === "instagram") {
        href = cfg.instagram || "";
      }
      if (!href) {
        anchor.href = "#";
        anchor.removeAttribute("target");
        return;
      }
      anchor.href = href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    });
  }

  function paintLinks() {
    if (setup && sellerNumber()) setup.hidden = true;
    document.querySelectorAll("a.wa").forEach(function (anchor) {
      bindLink(anchor, anchor.dataset.waText || "");
    });
  }

  function hueOf(name) {
    const key = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (key.indexOf("plata") >= 0) return HUES.plata;
    if (key.indexOf("violeta") >= 0) return HUES.violeta;
    if (key.indexOf("lava") >= 0) return HUES.lava;
    if (key.indexOf("roj") >= 0) return HUES.roja;
    if (key.indexOf("dorad") >= 0) return HUES.dorada;
    if (key.indexOf("rosa") >= 0) return HUES.rosa;
    if (key.indexOf("blanc") >= 0) return HUES.blanca;
    if (key.indexOf("verde") >= 0) return HUES.verde;
    if (key.indexOf("oro") >= 0 || key.indexOf("cobre") >= 0) return key.indexOf("cobre") >= 0 ? HUES.cobre : HUES.oro;
    if (key.indexOf("azul") >= 0) return HUES.azul;
    if (key.indexOf("naranja") >= 0) return HUES.naranja;
    if (key.indexOf("manzana") >= 0) return HUES.manzana;
    if (key.indexOf("cereza") >= 0) return HUES.cereza;
    if (key.indexOf("amarill") >= 0) return HUES.amarilla;
    if (key.indexOf("grafito") >= 0) return HUES.grafito;
    return HUES.blanca;
  }

  function framePhoto(img, frame) {
    frame.classList.add("photo-frame");
    frame.style.setProperty("--photo", 'url("' + img.src + '")');
  }

  function renderCatalog() {
    const rootCatalog = document.getElementById("catalog");
    if (!rootCatalog) return;
    const money = function (value) {
      return "$" + value;
    };
    LINES.forEach(function (line) {
      const family = document.createElement("section");
      family.className = "family";
      const title = document.createElement("h3");
      title.className = "family__title";
      title.textContent = line.title;
      const note = document.createElement("p");
      note.className = "family__note";
      note.textContent = line.note;
      const grid = document.createElement("div");
      grid.className = "catalog";
      line.colors.forEach(function (item) {
        const color = typeof item === "string"
          ? { name: item, size: line.size, price: line.price, hue: item, photo: PHOTOS[item] }
          : Object.assign({ size: line.size, price: line.price, photo: PHOTOS[item.name] }, item);
        const hues = color.hue && HUES[color.hue] ? HUES[color.hue] : hueOf(color.name);
        const card = document.createElement("article");
        card.className = "card";
        const visual = document.createElement("div");
        visual.className = "card__visual";
        if (color.photo) {
          const photo = document.createElement("img");
          photo.src = color.photo;
          photo.alt = color.name + (color.size ? ", " + color.size : "");
          photo.loading = "lazy";
          framePhoto(photo, visual);
          visual.appendChild(photo);
        } else {
          const vial = document.createElement("div");
          vial.className = "vial";
          vial.innerHTML = '<div class="vial__cap"></div>';
          const powder = document.createElement("div");
          powder.className = "powder";
          powder.style.setProperty("--c1", String(hues[0]));
          powder.style.setProperty("--c2", String(hues[1]));
          powder.style.setProperty("--c3", String(hues[2]));
          vial.appendChild(powder);
          visual.appendChild(vial);
        }
        const heading = document.createElement("h3");
        heading.textContent = color.name;
        const meta = document.createElement("p");
        meta.className = "card__meta";
        meta.textContent = color.size || "Pintura automotriz";
        const price = document.createElement("p");
        price.className = "card__price";
        const strong = document.createElement("strong");
        strong.textContent = money(color.price);
        price.appendChild(strong);
        const order = document.createElement("a");
        order.className = "wa";
        order.href = "#linea";
        const detail = color.name + (color.size ? ", " + color.size : "") + " (" + money(color.price) + ")";
        order.dataset.waText = detail;
        order.innerHTML = '<svg><use href="#wa-icon" /></svg> Pedir por WhatsApp';
        card.appendChild(visual);
        card.appendChild(heading);
        card.appendChild(meta);
        card.appendChild(price);
        card.appendChild(order);
        grid.appendChild(card);
      });
      family.appendChild(title);
      family.appendChild(note);
      family.appendChild(grid);
      rootCatalog.appendChild(family);
    });
  }

  const SHOWS = [
    { name: "Oro", size: "100 g", price: 500, photo: "img/oro.jpeg", alt: "Frasco de perla Oro frente a un auto dorado" },
    { name: "Violeta", size: "100 g", price: 500, photo: "img/violeta.jpeg", alt: "Frasco de perla Violeta frente a un BMW violeta" },
    { name: "Candy manzana", size: "100 g", price: 420, photo: "img/candy-manzana.jpeg", alt: "Frasco de Candy Manzana frente a un auto rojo" },
    { name: "Roja", size: "100 g", price: 500, photo: "img/roja.jpeg", alt: "Frasco de perla Roja frente a una Hilux roja" },
    { name: "Cobre", size: "250 g", price: 250, photo: "img/cobre.jpeg", alt: "Frasco de perla Cobre frente a un auto cobrizo" },
    { name: "Plata", size: "100 g", price: 500, photo: "img/plata.jpeg", alt: "Frasco de perla Plata frente a un BMW plateado" },
    { name: "Escarabajo", size: "100 g", price: 750, photo: "img/escarabajo.jpeg", alt: "Frasco de Escarabajo frente a un auto tornasol" },
    { name: "Blanca extremo", size: "100 g", price: 850, photo: "img/blanca-extremo.jpeg", alt: "Frasco de Blanca Extremo frente a un BMW blanco" },
  ];

  let openProductPreview;
  let carouselClickSuppressed = false;

  function showCard(item) {
    const card = document.createElement("article");
    card.className = "show";
    const photo = document.createElement("img");
    photo.src = item.photo;
    photo.alt = item.alt;
    const frame = document.createElement("div");
    frame.className = "show__photo";
    framePhoto(photo, frame);
    frame.appendChild(photo);
    const copy = document.createElement("div");
    copy.className = "show__copy";
    const heading = document.createElement("h3");
    heading.textContent = item.name;
    const price = document.createElement("p");
    price.className = "card__price";
    const strong = document.createElement("strong");
    strong.textContent = "$" + item.price;
    price.appendChild(strong);
    const note = document.createElement("p");
    note.className = "card__meta";
    note.textContent = "MXN" + (item.size ? " · " + item.size : "");
    const order = document.createElement("a");
    order.className = "wa";
    order.href = "#linea";
    order.dataset.waText = item.name + (item.size ? ", " + item.size : "") + " ($" + item.price + ")";
    order.innerHTML = '<svg><use href="#wa-icon" /></svg> Pedir por WhatsApp';
    copy.appendChild(heading);
    copy.appendChild(price);
    copy.appendChild(note);
    copy.appendChild(order);
    card.appendChild(frame);
    card.appendChild(copy);
    return card;
  }

  function renderShows() {
    const rootShows = document.getElementById("shows");
    if (!rootShows) return;
    const track = document.createElement("div");
    track.className = "reel__track";
    function addSet(hidden) {
      const set = document.createElement("div");
      set.className = "reel__set";
      if (hidden) set.setAttribute("aria-hidden", "true");
      SHOWS.forEach(function (item) {
        set.appendChild(showCard(item));
      });
      track.appendChild(set);
    }
    addSet(false);
    addSet(true);
    rootShows.appendChild(track);

    ["prev", "next"].forEach(function (dir) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "reel__nav reel__nav--" + dir;
      button.setAttribute("aria-label", dir === "prev" ? "Anterior" : "Siguiente");
      button.textContent = dir === "prev" ? "‹" : "›";
      rootShows.appendChild(button);
    });

    const sets = track.children;
    let x = 0;
    let half = 0;
    let paused = false;
    let dragging = false;
    const speed = reduce ? 0 : 2;

    function place() {
      if (half > 0) {
        while (x < 0) x += half;
        while (x >= half) x -= half;
      }
      track.style.transform = "translate3d(" + (-x) + "px,0,0)";
    }

    function measure() {
      half = sets[0] ? sets[0].getBoundingClientRect().width : 0;
      place();
    }

    function step(direction) {
      const card = track.querySelector(".show");
      const gap = 18;
      const width = card ? card.getBoundingClientRect().width + gap : 360;
      x += direction * width;
      place();
    }

    rootShows.querySelector(".reel__nav--prev").addEventListener("click", function () {
      step(-1);
    });
    rootShows.querySelector(".reel__nav--next").addEventListener("click", function () {
      step(1);
    });

    rootShows.addEventListener("mouseenter", function () { paused = true; });
    rootShows.addEventListener("mouseleave", function () {
      if (!dragging) paused = false;
    });

    let pointer = null;
    rootShows.addEventListener("pointerdown", function (event) {
      if (event.target.closest("a, button")) return;
      dragging = true;
      paused = true;
      pointer = {
        x: event.clientX,
        y: event.clientY,
        origin: x,
        product: event.target.closest(".show"),
      };
      rootShows.classList.add("is-drag");
      rootShows.setPointerCapture(event.pointerId);
    });
    rootShows.addEventListener("pointermove", function (event) {
      if (!pointer) return;
      x = pointer.origin - (event.clientX - pointer.x);
      place();
    });
    function endDrag(event, allowPreview) {
      const activePointer = pointer;
      pointer = null;
      dragging = false;
      paused = false;
      rootShows.classList.remove("is-drag");
      if (
        allowPreview &&
        activePointer &&
        activePointer.product &&
        Math.hypot(event.clientX - activePointer.x, event.clientY - activePointer.y) < 8 &&
        openProductPreview
      ) {
        openProductPreview(activePointer.product);
        carouselClickSuppressed = true;
        window.setTimeout(function () { carouselClickSuppressed = false; }, 0);
      }
    }
    rootShows.addEventListener("pointerup", function (event) { endDrag(event, true); });
    rootShows.addEventListener("pointercancel", function (event) { endDrag(event, false); });

    window.addEventListener("resize", measure);
    rootShows.querySelectorAll("img").forEach(function (img) {
      if (img.complete) measure();
      else img.addEventListener("load", measure);
    });
    measure();

    if (!reduce) {
      function tick() {
        if (!paused && half) {
          x += speed;
          place();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  renderCatalog();
  renderShows();

  function installProductPreview() {
    const modal = document.createElement("dialog");
    modal.className = "product-modal";
    modal.setAttribute("aria-labelledby", "product-preview-title");
    const header = document.createElement("div");
    header.className = "product-modal__header";
    const title = document.createElement("h2");
    title.id = "product-preview-title";
    const close = document.createElement("button");
    close.className = "product-modal__close";
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar imagen");
    close.textContent = "×";
    const preview = document.createElement("div");
    preview.className = "product-modal__preview";

    header.appendChild(title);
    header.appendChild(close);
    modal.appendChild(header);
    modal.appendChild(preview);
    document.body.appendChild(modal);

    function openPreview(product) {
      const image = product.querySelector(".card__visual img, .show__photo img");
      const visual = product.querySelector(".card__visual, .show__photo");
      if (!visual) return;

      title.textContent = product.querySelector("h3").textContent;
      preview.replaceChildren();
      if (image) {
        const largeImage = document.createElement("img");
        largeImage.src = image.currentSrc || image.src;
        largeImage.alt = image.alt;
        preview.appendChild(largeImage);
      } else {
        const enlargedVisual = visual.cloneNode(true);
        enlargedVisual.classList.add("product-modal__visual");
        preview.appendChild(enlargedVisual);
      }
      modal.showModal();
    }

    document.addEventListener("click", function (event) {
      const product = event.target.closest(".card, .show");
      if (!product || event.target.closest("a, button")) return;
      if (product.closest("#shows") && carouselClickSuppressed) {
        carouselClickSuppressed = false;
        return;
      }
      openPreview(product);
    });

    close.addEventListener("click", function () {
      modal.close();
    });
    modal.addEventListener("click", function (event) {
      if (event.target === modal) modal.close();
    });
    return openPreview;
  }

  openProductPreview = installProductPreview();

  document.addEventListener("click", function (event) {
    const anchor = event.target.closest("a.wa");
    if (!anchor || sellerNumber()) return;
    event.preventDefault();
    setup.hidden = false;
  });

  function fillPowder(el, count) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const pearl = document.createElement("i");
      const size = 8 + Math.random() * (el.classList.contains("powder--hero") ? 36 : 24);
      pearl.style.width = size + "px";
      pearl.style.height = size + "px";
      pearl.style.left = 6 + Math.random() * 76 + "%";
      pearl.style.top = 8 + Math.random() * 74 + "%";
      pearl.style.setProperty("--off", (Math.random() * 50 - 18).toFixed(1));
      pearl.style.animationDuration = 5 + Math.random() * 7 + "s";
      pearl.style.animationDelay = -Math.random() * 8 + "s";
      fragment.appendChild(pearl);
    }
    el.appendChild(fragment);
  }

  document.querySelectorAll(".powder").forEach(function (el) {
    fillPowder(el, el.classList.contains("powder--hero") ? 34 : 22);
  });

  function rand(seed) {
    let value = seed;
    return function () {
      value |= 0;
      value = (value + 0x6d2b79f5) | 0;
      let t = Math.imul(value ^ (value >>> 15), 1 | value);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const random = rand(20261002);
  const count = window.innerWidth < 760 ? 42 : 78;
  const pearls = [];
  for (let i = 0; i < count; i += 1) {
    pearls.push({
      homeX: random(),
      homeY: random(),
      depth: 0.55 + random() * 0.5,
      phase: random() * Math.PI * 2,
      speed: 0.25 + random() * 0.55,
      radius: 12 + random() * 36,
      shift: random() * 80 - 20,
    });
  }

  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize);
  resize();

  function drawPearl(x, y, radius, pearlHue, alpha) {
    const dx = x - light.x;
    const dy = y - light.y;
    const dist = Math.hypot(dx, dy) || 1;
    const hx = x - (dx / dist) * radius * 0.36;
    const hy = y - (dy / dist) * radius * 0.42;
    const gradient = ctx.createRadialGradient(hx, hy, radius * 0.04, x, y, radius);
    const rim = (pearlHue + 210) % 360;
    gradient.addColorStop(0, "hsla(40, 30%, 100%, " + alpha + ")");
    gradient.addColorStop(0.2, "hsla(" + pearlHue + ", 48%, 90%, " + alpha * 0.95 + ")");
    gradient.addColorStop(0.58, "hsla(" + ((pearlHue + 36) % 360) + ", 52%, 62%, " + alpha * 0.55 + ")");
    gradient.addColorStop(1, "hsla(" + rim + ", 40%, 28%, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const started = performance.now();
  let running = false;
  let raf = 0;

  function tickHues() {
    hue.h1 += (goal.h1 - hue.h1) * (reduce ? 1 : 0.06);
    hue.h2 += (goal.h2 - hue.h2) * (reduce ? 1 : 0.06);
    hue.h3 += (goal.h3 - hue.h3) * (reduce ? 1 : 0.06);
    root.style.setProperty("--h1", hue.h1.toFixed(2));
    root.style.setProperty("--h2", hue.h2.toFixed(2));
    root.style.setProperty("--h3", hue.h3.toFixed(2));
  }

  function frame(now) {
    const t = (now - started) / 1000;
    const intro = reduce ? 1 : Math.min(1, t / 2.1);
    const ease = 1 - Math.pow(1 - intro, 3);

    light.x += (pointer.x - light.x) * 0.08;
    light.y += (pointer.y - light.y) * 0.08;
    lux.style.transform = "translate(" + light.x.toFixed(1) + "px, " + light.y.toFixed(1) + "px)";
    tickHues();

    ctx.clearRect(0, 0, width, height);
    [
      { x: width * (0.18 + 0.08 * Math.sin(t * 0.16)), y: height * (0.22 + 0.06 * Math.cos(t * 0.12)), c: "196, 150, 70", r: 320 },
      { x: width * (0.82 + 0.06 * Math.cos(t * 0.11)), y: height * (0.16 + 0.07 * Math.sin(t * 0.14)), c: "30, 170, 95", r: 280 },
      { x: width * (0.68 + 0.1 * Math.sin(t * 0.09)), y: height * (0.78 + 0.05 * Math.cos(t * 0.1)), c: "70, 120, 190", r: 340 },
      { x: width * (0.16 + 0.05 * Math.cos(t * 0.13)), y: height * (0.8 + 0.04 * Math.sin(t * 0.15)), c: "170, 70, 120", r: 260 },
    ].forEach(function (orb) {
      const wash = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      wash.addColorStop(0, "rgba(" + orb.c + ", 0.34)");
      wash.addColorStop(1, "rgba(" + orb.c + ", 0)");
      ctx.fillStyle = wash;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });
    const glow = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 320);
    glow.addColorStop(0, "hsla(" + hue.h2.toFixed(0) + ", 80%, 72%, 0.14)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const drawList = pearls
      .map(function (pearl) {
        const wanderX = Math.sin(t * pearl.speed + pearl.phase) * 0.018;
        const wanderY = Math.cos(t * pearl.speed * 0.8 + pearl.phase) * 0.022;
        let x = (pearl.homeX + wanderX) * width;
        let y = (pearl.homeY + wanderY) * height;
        x = width * 0.72 + (x - width * 0.72) * ease;
        y = height * 0.42 + (y - height * 0.42) * ease;
        const dx = x - light.x;
        const dy = y - light.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 190 && dist > 0) {
          const force = (1 - dist / 190) * 34 * pearl.depth;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }
        return { pearl: pearl, x: x, y: y };
      })
      .sort(function (a, b) {
        return a.pearl.depth - b.pearl.depth;
      });

    drawList.forEach(function (item) {
      const radius = item.pearl.radius * item.pearl.depth * (0.25 + 0.75 * ease);
      const flip = Math.sin(t * 0.7 + item.pearl.phase);
      const pearlHue = (hue.h1 * (1 - flip) + hue.h2 * flip + item.pearl.shift + 360) % 360;
      const alpha = (0.5 + item.pearl.depth * 0.4) * (0.55 + 0.45 * ease);
      drawPearl(item.x, item.y, radius, pearlHue, alpha);
    });

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  window.addEventListener("pointermove", function (event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    root.style.setProperty("--p", progress.toFixed(4));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!reduce) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "rotateX(" + (-y * 7).toFixed(2) + "deg) rotateY(" + (x * 8).toFixed(2) + "deg)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  const veil = document.getElementById("veil");
  if (reduce) veil.remove();
  else setTimeout(function () { veil.remove(); }, 2300);

  requestAnimationFrame(function () {
    document.body.classList.add("is-ready");
  });

  const theme = new Audio("audio/tokyo.mp3");
  theme.loop = true;
  theme.volume = 0.45;
  const sound = document.getElementById("sound");
  let userStopped = false;

  function setSound(on) {
    if (!sound) return;
    sound.classList.toggle("is-on", on);
    sound.classList.toggle("is-off", !on);
    sound.setAttribute("aria-pressed", on ? "true" : "false");
    sound.setAttribute("aria-label", on ? "Apagar la música" : "Encender la música");
  }

  function startTheme() {
    if (userStopped) return;
    theme.play().then(function () { setSound(true); }).catch(function () { setSound(false); });
  }

  if (sound) {
    sound.addEventListener("click", function () {
      if (!theme.paused) {
        userStopped = true;
        theme.pause();
        setSound(false);
        return;
      }
      userStopped = false;
      theme.play().then(function () { setSound(true); }).catch(function () { setSound(false); });
    });
  }

  startTheme();
  document.addEventListener("pointerdown", function (event) {
    if (!theme.paused || userStopped || event.target.closest("#sound")) return;
    startTheme();
  });

  paintSocials();
  paintLinks();
  if (reduce) {
    frame(performance.now());
  } else {
    start();
  }
})();
