/* Harvest Moon RV Park - main.js
   Plain ES5, no build step, no dependencies. Reads window.SITE_CONFIG
   (site-config.js) and fills the page. Nothing here uses innerHTML. */
(function () {
  "use strict";

  var doc = document;
  var cfg = window.SITE_CONFIG;

  function $(id) { return doc.getElementById(id); }
  function qsa(sel, root) { return (root || doc).querySelectorAll(sel); }
  function each(list, fn) { for (var i = 0; i < list.length; i++) { fn(list[i], i); } }
  function isArray(v) { return Object.prototype.toString.call(v) === "[object Array]"; }
  function isBlank(v) { return v == null || String(v).trim() === ""; }
  function text(v) { return isBlank(v) ? "" : String(v).trim(); }
  function el(tag, cls, txt) {
    var n = doc.createElement(tag);
    if (cls) { n.className = cls; }
    if (txt != null) { n.textContent = txt; }
    return n;
  }
  function warn(msg) { if (window.console && console.warn) { console.warn(msg); } }
  function run(name, fn) {
    try { fn(); } catch (e) { if (window.console && console.error) { console.error("main.js: " + name + " failed", e); } }
  }
  function showBanner(msg) {
    var b = $("config-warning");
    if (b) { b.textContent = msg; b.hidden = false; }
  }

  /* ---------- G: mobile nav ---------- */
  function initNav() {
    var nav = $("site-nav"), toggle = $("nav-toggle"), list = $("nav-list");
    if (!nav || !toggle || !list) { return; }
    var use = toggle.querySelector("use");
    function isOpen() { return nav.classList.contains("nav--open"); }
    function setOpen(open) {
      nav.classList[open ? "add" : "remove"]("nav--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (use) { use.setAttribute("href", open ? "#i-close" : "#i-menu"); }
    }
    toggle.addEventListener("click", function () { setOpen(!isOpen()); });
    doc.addEventListener("keydown", function (ev) {
      if (isOpen() && (ev.key === "Escape" || ev.key === "Esc" || ev.keyCode === 27)) { setOpen(false); toggle.focus(); }
    });
    list.addEventListener("click", function (ev) {
      for (var t = ev.target; t && t !== list; t = t.parentNode) { if (t.tagName === "A") { setOpen(false); return; } }
    });
    doc.addEventListener("click", function (ev) {
      if (!isOpen()) { return; }
      for (var t = ev.target; t && t !== doc; t = t.parentNode) { if (t === nav) { return; } }
      setOpen(false);
    });
  }

  /* ---------- H: aria-current on the nav ---------- */
  function initCurrent() {
    if (!("IntersectionObserver" in window)) { return; }
    var links = qsa("#nav-list a[href^='#']"), byId = {};
    each(links, function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      each(entries, function (entry) {
        if (!entry.isIntersecting || !byId[entry.target.id]) { return; }
        each(links, function (a) { a.removeAttribute("aria-current"); });
        byId[entry.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    each(["rent", "availability", "location", "contact"], function (id) { if ($(id)) { io.observe($(id)); } });
  }

  /* ---------- J: footer year ---------- */
  function initYear() {
    each(qsa("[data-year]"), function (n) { n.textContent = String(new Date().getFullYear()); });
  }

  /* ---------- K: config banner (checked first) ---------- */
  if (!cfg || typeof cfg !== "object") {
    showBanner("The settings file (site-config.js) did not load, so the phone number, address and availability are missing. If you just edited it, check for a missing quote mark or comma, or use GitHub's History to restore the last good version.");
    doc.documentElement.className = doc.documentElement.className.replace(/\bjs\b/, "no-js");
    return;
  }

  /* ---------- A: phone, email, address, rent ---------- */
  var phone = (function () {
    var raw = text(cfg.phone), d = raw.replace(/\D/g, "");
    if (d.length === 11 && d.charAt(0) === "1") { d = d.slice(1); }
    if (!d) { return null; }
    var ten = d.length === 10;
    return {
      display: ten ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6) : raw,
      href: "tel:" + (ten ? "+1" + d : d),
      schema: ten ? "+1" + d : d
    };
  })();
  var email = text(cfg.email);
  var address = (function () {
    var a = cfg.address || {}, street = text(a.street), city = text(a.city), state = text(a.state), zip = text(a.zip);
    if (!street || !city || !state) { return null; }
    return { street: street, city: city, state: state, zip: zip, line: street + ", " + city + ", " + state + (zip ? " " + zip : "") };
  })();
  var rent = Number(cfg.rentPerMonth);
  var rentOk = !isBlank(cfg.rentPerMonth) && typeof cfg.rentPerMonth !== "boolean" && isFinite(rent);
  if (!rentOk) { warn("rentPerMonth is not a number; the page keeps showing $650"); }
  function money(exact) {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: exact ? 2 : 0, maximumFractionDigits: 2 }).format(rent);
    } catch (e) { return "$" + (exact ? rent.toFixed(2) : String(rent)); }
  }

  /* ---------- B: config fill ---------- */
  function resolve(key) {
    if (key === "phone") { return phone ? phone.display : ""; }
    if (key === "email") { return email; }
    if (key === "address") { return address ? address.line : ""; }
    if (key === "rent" || key === "rentExact") { return rentOk ? money(key === "rentExact") : ""; }
    if (key.indexOf("distances.") === 0) {
      var d = text((cfg.distances || {})[key.slice(10)]);
      return d ? "about " + d : "";
    }
    return text(cfg[key]);
  }
  function initFill() {
    each(qsa("[data-fill]"), function (n) {
      var v = resolve(n.getAttribute("data-fill"));
      if (v) { n.textContent = v; n.classList.remove("is-placeholder"); }
      else if (n.hasAttribute("data-empty")) { n.textContent = n.getAttribute("data-empty"); }
    });
    each(qsa("[data-show-if]"), function (n) {
      var v = cfg[n.getAttribute("data-show-if")];
      if (isArray(v) ? v.length > 0 : !isBlank(v)) { n.hidden = false; }
    });
    var box = $("rules-extra"), list = $("rules-list"), shown = 0;
    if (box && list) {
      each(isArray(cfg.rules) ? cfg.rules : [], function (r) {
        if (!isBlank(r)) { list.appendChild(el("li", null, text(r))); shown++; }
      });
      box.hidden = shown === 0;
    }
  }

  /* ---------- C: availability ---------- */
  var STATUS = { available: "available", open: "available", occupied: "occupied", taken: "occupied", full: "occupied", "coming-soon": "coming-soon", "coming soon": "coming-soon", soon: "coming-soon" };
  var avail = { full: false };
  function initAvailability() {
    var sites = isArray(cfg.sites) ? cfg.sites : [], total = sites.length, open = 0, known = 0, info = [];
    if (!total) { return; }
    each(sites, function (s, i) {
      s = s || {};
      var st = STATUS[text(s.status).toLowerCase()] || "unknown";
      if (st === "available") { open++; }
      if (st !== "unknown") { known++; }
      info.push({ name: text(s.name) || "Site " + (i + 1), status: st, date: text(s.date), note: text(s.note) });
    });
    avail.full = known >= 1 && open === 0;
    var line = known === 0 ? "Call to ask what's open." :
      open >= 1 ? open + " of " + total + " sites open right now." :
      "All " + total + " sites are full right now. Call to get on the waiting list.";
    each([$("availability-line"), $("availability-summary")], function (n) { if (n) { n.textContent = line; } });
    var cta = $("availability-cta");
    if (cta) { cta.textContent = known === 0 ? "Call to ask what's open" : avail.full ? "Get on the waiting list" : "Ask about a site"; }

    var list = $("site-list");
    if (list) {
      while (list.firstChild) { list.removeChild(list.firstChild); }
      each(info, function (s) {
        var li = el("li", "site-card"), badge;
        li.appendChild(el("h3", null, s.name));
        if (s.status === "available") { badge = el("span", "badge badge--available", "Available now"); }
        else if (s.status === "coming-soon") { badge = el("span", "badge badge--soon", s.date ? "Opening " + s.date : "Opening soon"); }
        else if (s.status === "occupied") { badge = el("span", "badge badge--occupied", "Occupied"); }
        else { badge = el("span", "badge badge--unknown", "Ask us"); }
        li.appendChild(badge);
        if (s.note) { li.appendChild(el("p", "site-card__note", s.note)); }
        if (s.status === "available" || s.status === "coming-soon") {
          var a = el("a", "btn btn--secondary", "Ask about " + s.name);
          a.href = "#contact";
          a.setAttribute("data-prefill-site", s.name);
          li.appendChild(a);
        }
        list.appendChild(li);
      });
    }

    var sel = $("f-site");
    if (sel) {
      while (sel.firstChild) { sel.removeChild(sel.firstChild); }
      var any = el("option", null, "Any site");
      any.value = "Any site"; any.selected = true;
      sel.appendChild(any);
      each(info, function (s) {
        if (s.status === "available") { sel.appendChild(el("option", null, s.name + " (available now)")); }
        else if (s.status === "coming-soon") { sel.appendChild(el("option", null, s.name + " (opening " + (s.date || "soon") + ")")); }
      });
      sel.appendChild(el("option", null, "Next opening / waiting list"));
    }
  }

  /* ---------- D: links ---------- */
  function initLinks() {
    var header = $("header-cta"), hero = $("hero-cta-primary");
    each(qsa("[data-tel]"), function (a) {
      if (phone) { a.setAttribute("href", phone.href); } else { a.removeAttribute("href"); }
    });
    if (phone) {
      if (header) { header.setAttribute("aria-label", "Call " + phone.display); }
      if (hero) { hero.textContent = "Call " + phone.display; }
    } else if (email) {
      each([header, hero], function (a) {
        if (a) { a.textContent = "Email us"; a.setAttribute("href", "mailto:" + email); a.removeAttribute("aria-label"); }
      });
    } else {
      each([header, hero], function (a) { if (a) { a.hidden = true; } });
    }
    each(qsa("[data-mailto]"), function (a) {
      if (email) { a.setAttribute("href", "mailto:" + email); } else { a.removeAttribute("href"); }
    });
    var maps = $("maps-link");
    if (maps && address) {
      maps.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address.line);
      maps.hidden = false;
    }
  }

  /* ---------- E: JSON-LD ---------- */
  function initJsonLd() {
    var node = $("jsonld");
    if (!node) { return; }
    var data = JSON.parse(node.textContent);
    if (phone) { data.telephone = phone.schema; }
    if (email) { data.email = email; }
    if (address) {
      data.address = { "@type": "PostalAddress", streetAddress: address.street, addressLocality: address.city, addressRegion: address.state };
      if (address.zip) { data.address.postalCode = address.zip; }
      data.address.addressCountry = "US";
    }
    if (rentOk) { data.priceRange = "$" + rent + "/month plus electric"; }
    node.textContent = JSON.stringify(data);
  }

  /* ---------- F: inquiry form ---------- */
  function initForm() {
    var form = $("inquiry-form");
    if (!form) { return; }
    var submit = $("form-submit"), note = $("form-note"), status = $("form-status");
    var f = { name: $("f-name"), contact: $("f-contact"), site: $("f-site"), movein: $("f-movein"), rig: $("f-rig"), message: $("f-message"), agree: $("f-agree"), gotcha: $("f-gotcha") };
    var errs = { name: $("err-name"), contact: $("err-contact"), agree: $("err-agree") };
    var fc = cfg.form || {}, id = text(fc.formspreeId), mode = "off";
    form.setAttribute("novalidate", "");
    if (text(fc.mode) === "formspree") {
      if (id) { mode = "formspree"; } else { warn("form.mode is formspree but formspreeId is empty; using mailto"); }
    }
    if (mode !== "formspree") { mode = email ? "mailto" : "off"; }

    if (mode === "formspree") {
      form.action = "https://formspree.io/f/" + id;
      form.method = "post";
      submit.disabled = false;
      note.textContent = "Your message goes straight to us.";
    } else if (mode === "mailto") {
      submit.disabled = false;
      note.textContent = "This opens your email app with your answers filled in. If nothing happens, email us at " + email + (phone ? " or call " + phone.display : "") + ".";
    } else {
      submit.disabled = true;
      note.textContent = phone ? "The form isn't switched on yet. Please call " + phone.display + "." : "The form isn't switched on yet.";
      note.classList.add("is-placeholder");
    }

    function setError(key, msg) {
      if (msg) { errs[key].textContent = msg; errs[key].hidden = false; f[key].setAttribute("aria-invalid", "true"); }
      else { errs[key].textContent = ""; errs[key].hidden = true; f[key].removeAttribute("aria-invalid"); }
    }
    each(["name", "contact", "agree"], function (key) {
      f[key].addEventListener(key === "agree" ? "change" : "input", function () { setError(key, null); });
    });
    function looksLikeEmail(s) { return s.indexOf("@") !== -1 && s.indexOf(".") !== -1; }
    function validate() {
      var first = null, contact = text(f.contact.value);
      if (!text(f.name.value)) { setError("name", "Please tell us your name."); first = first || f.name; } else { setError("name", null); }
      if (!contact || !(looksLikeEmail(contact) || contact.replace(/\D/g, "").length >= 7)) {
        setError("contact", "Please give us a phone number or an email address so we can reply."); first = first || f.contact;
      } else { setError("contact", null); }
      if (!f.agree.checked) { setError("agree", "Please check the box so we know you've read this."); first = first || f.agree; } else { setError("agree", null); }
      if (first) { first.focus(); }
      return !first;
    }
    function subjectAndBody() {
      var name = text(f.name.value), site = f.site.value;
      var waiting = avail.full || site === "Next opening / waiting list";
      return {
        subject: (waiting ? "Waiting list: " : "Site inquiry from ") + name,
        body: ["Name: " + name, "Reach me at: " + text(f.contact.value), "Site: " + site,
          "Move-in: " + (text(f.movein.value) || "not sure yet"), "RV: " + (text(f.rig.value) || "not given"),
          "Message: " + (text(f.message.value) || "(none)")].join("\r\n")
      };
    }
    function setHidden(name, value) {
      var input = form.querySelector("input[name='" + name + "']");
      if (!value) { if (input) { form.removeChild(input); } return; }
      if (!input) { input = el("input"); input.type = "hidden"; input.name = name; form.appendChild(input); }
      input.value = value;
    }
    function failText() {
      var parts = [];
      if (phone) { parts.push("call " + phone.display); }
      if (email) { parts.push("email " + email); }
      return "That didn't go through." + (parts.length ? " Please " + parts.join(" or ") + "." : "");
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (mode === "off") { return; }
      var success = mode === "formspree" ? "Thanks, your message is on its way to us." :
        "Your email app should open now with your message filled in. If it didn't, email us at " + email + ".";
      if (text(f.gotcha.value)) { status.textContent = success; return; }
      if (!validate()) { return; }
      var msg = subjectAndBody();
      if (mode === "mailto") {
        window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(msg.subject) + "&body=" + encodeURIComponent(msg.body);
        status.textContent = success;
        return;
      }
      setHidden("_subject", msg.subject);
      var contact = text(f.contact.value);
      setHidden("_replyto", looksLikeEmail(contact) ? contact : "");
      submit.disabled = true;
      function done() { submit.disabled = false; }
      try {
        window.fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } }).then(function (res) {
          done();
          if (res.ok) { form.reset(); status.textContent = success; } else { status.textContent = failText(); }
        }, function () { done(); form.submit(); });
      } catch (e) { done(); form.submit(); }
    });

    doc.addEventListener("click", function (ev) {
      var t = ev.target;
      while (t && t !== doc && !(t.getAttribute && t.getAttribute("data-prefill-site"))) { t = t.parentNode; }
      if (!t || t === doc) { return; }
      var name = t.getAttribute("data-prefill-site");
      each(f.site.options, function (o, i) {
        if (o.text === name || o.text.indexOf(name + " ") === 0) { f.site.selectedIndex = i; }
      });
      setTimeout(function () {
        try { f.name.focus({ preventScroll: true }); } catch (e) { f.name.focus(); }
      }, 0);
    });
  }

  /* ---------- L: photos and hero photo ---------- */
  function initPhotos() {
    var section = $("photos"), grid = $("photo-grid"), n = 0;
    if (section && grid) {
      each(isArray(cfg.photos) ? cfg.photos : [], function (p) {
        p = p || {};
        if (isBlank(p.src)) { return; }
        var li = el("li"), fig = el("figure"), img = el("img");
        img.src = text(p.src);
        if (isBlank(p.alt)) { img.alt = "Photo of Harvest Moon RV Park"; warn("photos: " + text(p.src) + " has no alt text"); }
        else { img.alt = text(p.alt); }
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        fig.appendChild(img); li.appendChild(fig); grid.appendChild(li); n++;
      });
      section.hidden = n === 0;
    }
    var hp = cfg.heroPhoto || {}, hero = $("top");
    if (hero && !isBlank(hp.src)) {
      var art = hero.querySelector(".hero__art");
      hero.classList.add("hero--photo");
      hero.style.setProperty("--hero-photo", "url('" + text(hp.src).replace(/'/g, "%27") + "')");
      if (art) {
        if (isBlank(hp.alt)) { art.setAttribute("aria-hidden", "true"); art.removeAttribute("aria-label"); art.removeAttribute("role"); }
        else { art.setAttribute("aria-label", text(hp.alt)); }
      }
    }
  }

  run("fill", initFill); run("availability", initAvailability); run("links", initLinks); run("jsonld", initJsonLd);
  run("form", initForm); run("nav", initNav); run("current", initCurrent); run("year", initYear); run("photos", initPhotos);
  run("banner", function () {
    if (!phone && !email) { showBanner("Add a phone number or email address in site-config.js so visitors can reach you."); }
  });
})();
