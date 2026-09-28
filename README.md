# Harvest Moon RV Park website

## 1. What this is

This is the website for Harvest Moon RV Park. It is one page. Everything you might change lives in one file, `site-config.js`. You never need to open the other files.

## 2. Before you share the link: the checklist

Until these are filled in, the website shows them as yellow [PLACEHOLDERS] on purpose so you can see what is missing.

- [ ] Phone number (`phone`)
- [ ] Email address (`email`)
- [ ] Your name for the "About" section (`ownerName`)
- [ ] The park's address (`address`: `street`, `city`, `state`, `zip`)
- [ ] How electric is charged (`electricNote`)
- [ ] Deposit (`deposit`)
- [ ] Pet fee (`petFee`)
- [ ] Hookups (`hookups`)
- [ ] Longest RV that fits (`maxRigLength`)
- [ ] The date you last checked the sites (`availabilityUpdated`)
- [ ] Site 1 status (`sites`, first line, `status`)
- [ ] Site 2 status (`sites`, second line, `status`)
- [ ] Site 3 status (`sites`, third line, `status`)
- [ ] Site 4 status (`sites`, fourth line, `status`)

These are optional. Leave them empty and the page simply says "nearby" or shows nothing extra:

- `distances` (how far shopping, the casino, Muenster and I-35 are)
- `petNote`
- `mailNote`
- `aboutNote`
- `rules`
- `photos`
- `heroPhoto`
- `form` (see "The contact form" below)

## 3. How to change anything (phone, email, rent, and so on)

1. Go to your repository on github.com and click the file named `site-config.js`.
2. Click the pencil icon near the top right ("Edit this file").
3. Find the line you want. For example `phone: "",`. Type between the quote marks: `phone: "9405550123",`. Keep the quote marks and the comma.
4. Rent is the one line with no quotes: `rentPerMonth: 650,`. Change the number only.
5. Scroll up and click the green **Commit changes…** button, then **Commit changes** again in the box that appears.
6. Wait about a minute, then open your website and refresh the page. Everything that uses that setting updates at once: the buttons, the contact section, the footer, and the information search engines read.

| Setting | What it changes | Example value |
|---|---|---|
| `phone` | Every Call button and phone link on the page, and the 404 page's Call button. Leave it empty and the Call buttons hide themselves. | `"9405550123"` |
| `email` | The email link in the contact section and footer, and where the contact form sends messages. The form stays off until this is filled in. | `"harvestmoon@example.com"` |
| `ownerName` | The signature under "A family-run park". | `"Mary Smith"` |
| `address.street` | Street line of the park's address (location section, footer, search engines). | `"1234 County Road 100"` |
| `address.city` | City of the park's address. | `"Muenster"` |
| `address.state` | State, two letters. | `"TX"` |
| `address.zip` | ZIP code. | `"76252"` |
| `rentPerMonth` | The price at the top of the page, in the rent table, in the footer and in the information search engines read. A number, no quotes. | `650` |
| `electricNote` | The "Electric" row of the rent table. | `"Metered, billed monthly at cost"` |
| `deposit` | The "Deposit" row of the rent table. | `"$500, refundable"` |
| `petFee` | The "Pet fee" row of the rent table. | `"$25 a month"` or `"None"` |
| `hookups` | The "Hookups" row of the rent table. | `"30 and 50 amp, water, sewer"` |
| `maxRigLength` | The "Longest RV that fits" row of the rent table. | `"40 ft"` |
| `petNote` | Optional extra sentence about dogs in "Is Harvest Moon a good fit?". | `"One dog per site, under 25 lb."` |
| `mailNote` | Optional extra sentence in "You get a real physical address". | `"USPS delivers to the sites daily."` |
| `availabilityUpdated` | The "Last updated" date under "Our four sites". | `"September 28, 2026"` |
| `sites` | The four site cards, the "N of 4 sites open" line at the top, the site list in the form and the waiting-list wording. | `{ name: "Site 2", status: "available", date: "", note: "50 amp, pull-through" },` |
| `rules` | Optional list of extra house rules, shown under "A few more things we ask". | `"Quiet after 10 pm.",` |
| `distances.shopping` | The "Shopping" line in the location section ("about 10 minutes"). | `"10 minutes"` |
| `distances.casino` | The "Casino" line in the location section. | `"15 minutes"` |
| `distances.muenster` | The "Muenster, Texas" line in the location section. | `"6 miles"` |
| `distances.i35` | The "I-35" line in the location section. | `"20 minutes"` |
| `aboutNote` | Optional extra sentence in "A family-run park". | `"Grandma wrote the first listing for this park, and we kept her words."` |
| `heroPhoto` | A photo behind the top of the page (`src` is the file, `alt` is a short description). | `{ src: "photos/park-at-dusk.jpg", alt: "The four sites at dusk" }` |
| `photos` | The pictures in the "A look around" section. The section is hidden until there is at least one. | `{ src: "photos/site-1.jpg", alt: "Site 1 with the big oak tree" },` |
| `form.mode` | How the contact form sends messages: `"mailto"` (opens the visitor's email app) or `"formspree"`. | `"mailto"` |
| `form.formspreeId` | Only for Formspree: the letters after `https://formspree.io/f/`. | `"abcdwxyz"` |

## 4. Marking a site available, occupied, or coming soon

1. Same file. Find the block under `THE FOUR SITES`.
2. Each site has a line like `{ name: "Site 2", status: "", date: "", note: "" },`.
3. Change `status` to exactly one of `"available"`, `"occupied"`, or `"coming-soon"`. For coming soon, put the date in `date`, like `"November 1"`. `note` is optional, like `"50 amp, pull-through"`.
4. Change `availabilityUpdated` to today's date so visitors can see the list is current. Do this even when nothing else changed; once a month is a good habit.
5. Commit changes. The four site cards, the "N of 4 sites open" line at the top, the form's site list and the waiting-list wording all change by themselves. If all four are occupied, the page tells people to call for the waiting list.

## 5. If the page looks broken after an edit

The most likely cause is a missing quote mark or comma. A yellow bar at the top of the website says so. To undo: open `site-config.js` on GitHub and click **History** (top right of the file). Find the entry from before your edit and click its **View code at this point** button (the `< >` icon on the right). Click **Copy raw file** (the two overlapping squares near the top right of the file). Then go back to `site-config.js`, click the pencil icon, select all the text (Ctrl+A or Cmd+A), paste over it, and click **Commit changes…**, then **Commit changes** again. You can also just re-open the file and fix the line.

## 6. Putting the website on the internet (GitHub Pages)

1. Create a free account at github.com if you do not have one.
2. Click the **+** (top right) → **New repository**. Name it `harvest-moon-rv-park`, keep it **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in every file and folder from this project (`index.html`, `404.html`, `styles.css`, `main.js`, `site-config.js`, `README.md`, `robots.txt`, `.nojekyll`, the `photos` folder), and click **Commit changes**.
4. Click **Settings** → **Pages** (left menu). Under **Build and deployment**, set **Source** to **Deploy from a branch**, **Branch** to `main` and the folder to `/ (root)`. Click **Save**.
5. Wait one or two minutes and refresh. The page shows your address: `https://YOUR-USERNAME.github.io/harvest-moon-rv-park/`. That is the link to share.
6. (Optional) Your own web address, like `harvestmoonrvpark.com`: buy the name, then follow GitHub's guide "Managing a custom domain for your GitHub Pages site". It is a few steps and worth asking a family member to help with.

## 7. The contact form

Out of the box, the form opens the visitor's own email app with their answers filled in, addressed to the `email` in `site-config.js`. Nothing else to set up. Some phones and computers do not have an email app set up, which is why your phone number is on the page in four places.

**Turning on Formspree (recommended once you are live)**

1. Go to formspree.io and create a free account.
2. Click **New form**, name it "Harvest Moon inquiries", enter your email, create it.
3. Formspree shows an address like `https://formspree.io/f/abcdwxyz`. Copy the letters after `/f/`.
4. In `site-config.js`, set `formspreeId: "abcdwxyz"` and change `mode: "mailto"` to `mode: "formspree"`.
5. Commit.
6. Send yourself a test message from the website; Formspree emails it to you. The free plan is enough for a park this size (check Formspree's site for the current monthly limit).

Netlify Forms is another option only if the site is ever hosted on Netlify instead of GitHub Pages; not needed now.

## 8. Adding photos

1. Put the picture files in the `photos` folder. On GitHub: open the `photos` folder → **Add file** → **Upload files**. Keep each picture under about 500 KB (about 1600 pixels wide is plenty).
2. In `site-config.js`, list them under `photos:` with a short description in `alt`. The description is what a person who cannot see the picture should know, for example `"Site 3 in the evening"`:

   ```js
   photos: [
     { src: "photos/site-3.jpg", alt: "Site 3 in the evening" },
   ],
   ```

3. `heroPhoto` puts one photo behind the top of the page, the same way: `heroPhoto: { src: "photos/park-at-dusk.jpg", alt: "The four sites at dusk" },`.
4. The link-preview picture (the image that shows when someone shares your link on Facebook or in a text message) is optional, and it is the one place that needs an edit in `index.html`. Upload the picture as `photos/og-image.jpg` (1200 x 630 pixels). Then open `index.html` on GitHub, click the pencil icon, and find these two lines near the top:

   ```html
   <!-- Owner: when you have a photo for link previews, upload it as photos/og-image.jpg (1200 x 630 pixels) and remove the comment marks around the next line, so that it starts with <meta and ends with >. See README, "Adding photos". -->
   <!-- <meta property="og:image" content="photos/og-image.jpg"> -->
   ```

   On the second of those lines, delete the five characters `<!-- ` at the start (the four comment marks and the space after them) and the four characters ` -->` at the end (the space and the three comment marks), so the line reads exactly `<meta property="og:image" content="photos/og-image.jpg">`. Leave the first line alone. Commit changes.

## 9. Things that are not in the settings file

The wording of the page, the number four, and the three main rules (long-term only, adults only, small dogs) are written into `index.html` in several places. If one of those ever changes, ask whoever set up the site to update the wording, rather than editing `index.html` yourself.

## 10. A note on the words "adults only"

Those words come from your own listing. Age-based rules on housing can be limited by fair-housing law, and rules for RV parks vary. It is worth confirming with a local attorney or the Texas Workforce Commission's Civil Rights Division how you may describe it, and changing the wording if they advise it. This website is not legal advice. Do not add phrases like 'no children' beyond what you already use.

## 11. Good to know

- The page needs JavaScript for the settings to show. Every normal browser has it.
- The yellow bar at the top only appears when the settings file failed to load or when both phone and email are empty.
- Nothing on the site tracks visitors.
- The 404 page (shown for a mistyped link) finds its way back to the front page on its own. One known limit: if the repository were ever named `YOUR-USERNAME.github.io` and someone typed a link two folders deep, its "Back to the front page" button would point to the wrong place. The site is set up as a normal project page, where this does not happen.
