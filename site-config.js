/* =====================================================================
   HARVEST MOON RV PARK - SITE SETTINGS
   This is the only file you need to edit. Type your information
   between the quote marks. Keep the quote marks and the commas.
   Leave something as "" (two quotes, nothing inside) if you do not
   know it yet: the website will show a yellow [PLACEHOLDER] so you
   can spot it. Save, then "Commit changes" on GitHub. The website
   updates itself in about a minute.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------------- HOW PEOPLE REACH YOU ---------------- */

  // Your phone number, digits only, with area code. Example: "9405550123"
  // Leave "" and every Call button hides itself until you fill it in.
  phone: "",

  // The email address inquiries should go to. Example: "harvestmoon@example.com"
  // The contact form does not work until this is filled in.
  email: "",

  // The name to sign the "About" section with. Example: "Mary Smith"
  ownerName: "",

  /* ---------------- THE PARK'S ADDRESS ---------------- */

  address: {
    street: "",   // Example: "1234 County Road 100"
    city: "",     // Example: "Muenster"
    state: "",    // Two letters. Example: "TX"
    zip: ""       // Example: "76252"
  },

  /* ---------------- RENT AND FEES ---------------- */

  // Monthly rent as a number only. No dollar sign, no quotes, no comma.
  rentPerMonth: 650,

  // How electric is charged. Example: "Metered, billed monthly at cost"
  electricNote: "",

  // Deposit. Example: "$500, refundable"
  deposit: "",

  // Pet fee for small dogs. Example: "$25 a month" or "None"
  petFee: "",

  // Hookups at the sites. Example: "30 and 50 amp, water, sewer"
  hookups: "",

  // Longest RV that fits. Example: "40 ft"
  maxRigLength: "",

  // OPTIONAL. Anything else about dogs. Example: "One dog per site, under 25 lb."
  // Leave "" and nothing extra is shown.
  petNote: "",

  // OPTIONAL. Anything else about mail. Example: "USPS delivers to the sites daily."
  // Leave "" and nothing extra is shown.
  mailNote: "",

  /* ---------------- THE FOUR SITES ---------------- */

  // The date you last checked the list below. Example: "September 28, 2026"
  availabilityUpdated: "",

  // For each site, status is ONE of these words, in quotes:
  //   "available"    - open right now
  //   "occupied"     - someone lives there
  //   "coming-soon"  - opening up; put the date in "date", e.g. "November 1"
  // Leave status as "" until you know, and the site shows "Ask us".
  // "note" is optional. Example: "50 amp, pull-through"
  sites: [
    { name: "Site 1", status: "", date: "", note: "" },
    { name: "Site 2", status: "", date: "", note: "" },
    { name: "Site 3", status: "", date: "", note: "" },
    { name: "Site 4", status: "", date: "", note: "" }
  ],

  /* ---------------- HOUSE RULES ---------------- */

  // OPTIONAL. Extra rules, one per line, each in quotes with a comma after it.
  // The three main rules (long-term only, adults only, small dogs) are
  // already on the page. Example:
  //   "No smoking inside the bathhouse.",
  //   "Quiet after 10 pm.",
  rules: [
  ],

  /* ---------------- HOW FAR THINGS ARE ---------------- */

  // Minutes or miles, your choice. Example: "10 minutes" or "6 miles"
  // Leave "" and the page just says "nearby".
  distances: {
    shopping: "",
    casino: "",
    muenster: "",
    i35: ""
  },

  /* ---------------- ABOUT ---------------- */

  // OPTIONAL. One extra sentence for the "A family-run park" section.
  // Example: "Grandma wrote the first listing for this park, and we kept her words."
  aboutNote: "",

  /* ---------------- PHOTOS (optional) ---------------- */

  // A photo for the very top of the page. Put the file in the photos folder first.
  // Example: { src: "photos/park-at-dusk.jpg", alt: "The four sites at dusk" }
  heroPhoto: { src: "", alt: "" },

  // Photos for the "A look around" section. Each needs a short description (alt)
  // for people who cannot see the picture. Example:
  //   { src: "photos/site-1.jpg", alt: "Site 1 with the big oak tree" },
  photos: [
  ],

  /* ---------------- THE CONTACT FORM ---------------- */

  form: {
    // "mailto"    - the form opens the visitor's email app (works with no setup)
    // "formspree" - messages are delivered by Formspree (see README, "Turning on the form")
    mode: "mailto",

    // Only for formspree. The letters after https://formspree.io/f/  Example: "abcdwxyz"
    formspreeId: ""
  }
};
