import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = {
  name: "Dan Bennett",
  bio: "TBC - Discussing current role",
  description: "Dan Bennett",
  url: "https://www.danbennett.me",
  picture: "/assets/images/dan.jpg",
  email: "dan@danbennett.me",
  year: new Date().getFullYear(),
  social: [
    ["Facebook", "https://facebook.com/danbennett89", "facebook"],
    ["Twitter", "https://twitter.com/danbennett", "twitter"],
    ["LinkedIn", "https://linkedin.com/in/danbennettuk", "linkedin"],
    ["Instagram", "https://www.instagram.com/danbennettuk", "instagram"],
    ["Spotify", "https://open.spotify.com/user/ravenatic", "spotify"],
    ["GitHub", "https://github.com/danbennettuk", "github"],
    ["Reddit", "https://www.reddit.com/user/danbennett", "reddit"],
    ["Email", "mailto:dan@danbennett.me", "mail"]
  ]
};

const iconPaths = {
  facebook: "M18.77 7.46h-3.08c-.24 0-.52.31-.52.73v2.22h3.6l-.54 3.74h-3.06V24h-4V14.15H8.28v-3.74h2.89V8.55c0-2.79 1.88-4.55 4.65-4.55h2.95v3.46Z",
  twitter: "M23.95 7.31c-.88.39-1.83.65-2.82.77a4.9 4.9 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.12 1.19 4.92 4.92 0 0 0-8.51 3.36c0 .39.04.77.13 1.13A13.96 13.96 0 0 1 1.64 5.9a4.92 4.92 0 0 0 1.52 6.56 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.9 4.9 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 22.26a13.92 13.92 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01l-.02-.64a10 10 0 0 0 2.46-2.55l-.05.04Z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 10h4v14H3V10Zm7 0h3.84v1.91h.05c.54-1.02 1.84-2.09 3.79-2.09 4.05 0 4.8 2.66 4.8 6.12V24h-4v-7.15c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.74 1.86-2.74 3.78V24H10V10Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.2-2.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z",
  spotify: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.42a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 0 1-.33-1.46c4.57-1.04 8.5-.59 11.65 1.34.35.21.47.67.25 1.03Zm1.23-2.75a.94.94 0 0 1-1.29.31c-3.22-1.98-8.13-2.55-11.94-1.4a.94.94 0 1 1-.55-1.8c4.35-1.32 9.76-.68 13.47 1.6.44.27.58.85.31 1.29Zm.1-2.86C14.06 8.52 7.7 8.3 4.01 9.42a1.13 1.13 0 1 1-.66-2.16c4.24-1.29 11.27-1.03 15.72 1.61a1.13 1.13 0 0 1-1.15 1.94Z",
  github: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 5.82c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  reddit: "M22 12.14a2.3 2.3 0 0 0-3.89-1.66c-1.48-1.02-3.5-1.68-5.75-1.76l.98-4.63 3.2.68a1.7 1.7 0 1 0 .15-.72l-3.56-.76a.38.38 0 0 0-.45.29l-1.09 5.14c-2.27.07-4.32.73-5.81 1.76A2.3 2.3 0 1 0 3.25 14c-.02.17-.03.34-.03.52 0 3.21 3.93 5.82 8.78 5.82s8.78-2.61 8.78-5.82c0-.18-.01-.35-.03-.52A2.3 2.3 0 0 0 22 12.14ZM7.5 13.8a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm7.45 3.56c-.85.85-2.48.91-2.95.91s-2.1-.06-2.95-.91a.42.42 0 0 1 .59-.59c.54.54 1.71.67 2.36.67s1.82-.13 2.36-.67a.42.42 0 0 1 .59.59Zm-.2-2.31a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z",
  mail: "M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.14-.65 7.86 6.5 7.86-6.5H4.14Zm16.36 2.02-5.46 4.52 5.46 4.74V7.87Zm-1.37 10.28-5.3-4.6-1.35 1.12a.75.75 0 0 1-.96 0l-1.35-1.12-5.3 4.6h14.26ZM3.5 17.13l5.46-4.74L3.5 7.87v9.26Z",
  rss: "M4.26 17.49a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM2 9.62c6.82 0 12.36 5.54 12.36 12.36h-3.2A9.17 9.17 0 0 0 2 12.82v-3.2ZM2 2c11.03 0 20 8.97 20 20h-3.2C18.8 12.74 11.26 5.2 2 5.2V2Z"
};

const emoji = {
  ":headphones:": "🎧",
  ":desktop_computer:": "🖥️"
};

const cv = {
  title: "Volunteer Community Manager, Social Media Nut & Customer Support Guru",
  intro: [
    "Hi! I'm Dan.",
    "I am a highly motivated volunteer community manager and full-time customer support guru, looking to move from the typical IT office to a more community and social focused role in the gaming community.",
    "I spend the majority of my free time volunteering as a community manager for online gaming communities, running fun events and tournaments and striving to assist every gamer I come across in giving them answers to their problems and giving them a bigger voice to let their feedback, good and bad, be heard - predominantly on Reddit, Twitter and Discord.",
    "So if you think there's a space for me and don't mind the odd awful joke, I'd love to hear from you."
  ],
  experience: [
    {
      organisation: "PUBG Reddit (r/PUBATTLEGROUNDS)",
      url: "https://www.reddit.com/r/pubattlegrounds",
      role: "Volunteer Community Manager & Community Games Host",
      dates: "2018 - Present",
      quote: "The largest community for PLAYERUNKNOWN'S BATTLEGROUNDS on PC, Xbox One and PlayStation 4.",
      paragraphs: [
        "At PUBG Reddit, after being a member of the community I was invited to be part of the moderation team. This mostly involves ensuring rules are abided to by our 100k+ members and assisting with any issues and conflicts between members.",
        "Working closely with the rest of the team, I help plan ways to assist the community in getting its voice across to the game's developers. This includes coming up with topics of discussion on Reddit and Twitter and providing ways for feedback to be shared with PUBG Corp directly, whilst ensuring the conversation is kept constructive.",
        "I am also in charge of hosting our Community Custom Games where we run a leaderboard and fun tournaments with fun and specific modes made up by ourselves and the players. All games are streamed live on Twitch and I, along with others, cast these games as they are being played out.",
        "I also work closely with PUBG Corp staff on community events and giveaways, and provide feedback and bugs for PUBG Corp to investigate and improve on."
      ],
      bullets: [
        "Discord Community Management",
        "Subreddit Community Management",
        "Social Media Manager",
        "PUBG Games Host & Observer",
        "PUBG Twitch Caster",
        "Self-taught Discord bot development in Python"
      ]
    },
    {
      organisation: "APT Solutions",
      role: "Service Desk Agent",
      dates: "November 2019 - present",
      quote: "A specialist supplier of membership software and services for trade unions, professional institutions, sporting bodies and charities.",
      paragraphs: [
        "At APT Solutions I am one of three Service Desk Agents supporting customers with their membership software, from small taxi firms to huge unions.",
        "My role also includes utilising investigation skills to determine if something went wrong, what happened, how it happened and what could be done to stop it happening, including writing customer-facing incident reports that are honest and open."
      ]
    },
    {
      organisation: "EGX & epicLAN",
      url: "https://www.egx.net/egx/2019/watch-and-learn",
      role: "Watch & Learn PLAYERUNKNOWN'S BATTLEGROUNDS (PUBG) Professional",
      dates: "17th October - 20th October 2019",
      quote: "UK's premier video games show.",
      paragraphs: [
        "During the four days at EGX 2019, I was enlisted by epicLAN to teach in their Watch & Learn area. I taught new players about PUBG, explaining and showing how they can improve and giving console players a taste of the PC side."
      ],
      bullets: [
        "Assisted in setting up and packing down multiple EGX stages managed by epicLAN",
        "Managed my dedicated Watch & Learn station",
        "Grew new skills in teaching",
        "Advertised the sessions on personal social media"
      ]
    },
    {
      organisation: "Chicken4Charity - SpecialEffect",
      role: "PUBG Observer",
      dates: "26th July 2019",
      quote: "SpecialEffect's charity PUBG tournament.",
      paragraphs: [
        "SpecialEffect's Chicken4Charity 2019 event saw 20 teams from the UK games industry battle it out in PLAYERUNKNOWN'S BATTLEGROUNDS to raise money for SpecialEffect. The event raised over £14,000 for the charity.",
        "I volunteered my time to set up and observe each game, using the game's built-in camera controls to capture the action as it unfolded for viewers on Steam, Twitch and Facebook."
      ]
    },
    {
      organisation: "PriorsVLE",
      url: "https://priorsvle.com",
      role: "Director & VLE Technical Consultant",
      dates: "2017 - 2019",
      quote: "PriorsVLE Ltd was formed by VLE professionals with over 15 years combined experience in supporting, managing and hosting VLEs.",
      paragraphs: [
        "At PriorsVLE we provided technical support and hosting services around Moodle, including development services for bespoke plugins and managing upgrades and migrations for Moodle sites owned by customers or third parties."
      ],
      bullets: [
        "Liaised with clients to capture requirements and ensure targets were met",
        "Created and managed internal systems to streamline processes",
        "Provided first-line customer support to clients' users",
        "Managed invoicing to ensure accurate and timely payments",
        "Used social media to advertise the business while educating around Moodle news and tips"
      ]
    },
    {
      organisation: "HowToMoodle",
      url: "https://howtomoodle.com",
      role: "Support Technician",
      dates: "2012 - 2018",
      quote: "End-to-end learning solutions for organisations creating engaging learning experiences.",
      paragraphs: [
        "At HowToMoodle my role was to ensure new and existing clients had the best customer service experience possible. I managed migrations and upgrades of customer sites and worked hard to build and maintain good relationships with customers.",
        "I supported clients through their Moodle and Totara journey, wrote documentation, debugged application issues in PHP and MySQL, managed hosting servers and performed QA testing for developed plugins."
      ],
      bullets: [
        "Set up, upgraded and migrated clients moving to Moodle and Totara",
        "Designed automation for manual site setup tasks",
        "Answered support calls via Helpspot",
        "Provided on-call hosting support",
        "Managed CentOS, Apache, PHP, MySQL/MariaDB and DirectAdmin hosting environments",
        "Managed external client servers across Linux and Windows Server",
        "Monitored customer sites and servers using Icinga",
        "Managed local Git repositories for Moodle, Totara, custom plugins and themes"
      ]
    },
    {
      organisation: "NovaFM",
      role: "Volunteer Presenter / Producer",
      dates: "2012 - 2014",
      quote: "Newport's local community radio.",
      paragraphs: [
        "At NovaFM I hosted two local radio shows: one specialising in new, upcoming and rarely heard artists and bands, and another specialising in Dance, Trance and UK Hardcore music. I produced both shows every week, wrote and produced weekend news-reading, and assisted with outside broadcasts."
      ]
    },
    {
      organisation: "Capita ITS (ex-i2Q Education Limited)",
      role: "Junior Technical Support",
      dates: "2008 - 2012",
      paragraphs: [
        "I started at i2Q, which later became Capita ITS. My main role involved supporting school and college clients with their Moodle platform and any issues or queries that arose during term.",
        "I performed yearly school rollovers in time for term start within their custom Moodle environment and worked with developers on QA testing for Capita's OpenHive learning platform."
      ]
    }
  ]
};

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return [{}, source];
  const data = {};
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    const key = pair[1];
    let value = pair[2].trim();
    if (value === "") value = "";
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true;
    if (value === "false") value = false;
    data[key] = value;
  }
  return [data, match[2].trim()];
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function emojify(value = "") {
  return Object.entries(emoji).reduce((text, [code, glyph]) => text.replaceAll(code, glyph), value);
}

function inlineMarkdown(value = "") {
  const codeTokens = [];
  let html = escapeHtml(emojify(value)).replace(/`([^`]+)`/g, (_, code) => {
    codeTokens.push(`<code>${code}</code>`);
    return `\u0000${codeTokens.length - 1}\u0000`;
  });

  html = html
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return html.replace(/\u0000(\d+)\u0000/g, (_, index) => codeTokens[Number(index)]);
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      blocks.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`);
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quotes = [];
      while (lines[index]?.startsWith("> ")) {
        quotes.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(`<blockquote>${markdownToHtml(quotes.join("\n"))}</blockquote>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (/^\d+\.\s+/.test(lines[index] || "")) {
        items.push(`<li>${inlineMarkdown(lines[index].replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (/^[-*]\s+/.test(lines[index] || "")) {
        items.push(`<li>${inlineMarkdown(lines[index].replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push("<hr>");
      index += 1;
      continue;
    }

    const paragraph = [];
    while (lines[index]?.trim() && !/^(#{1,4})\s+/.test(lines[index]) && !lines[index].startsWith("> ") && !/^\d+\.\s+/.test(lines[index]) && !/^[-*]\s+/.test(lines[index]) && !/^---+$/.test(lines[index].trim())) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

function slugFromPost(file) {
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(markdown|md)$/i, "");
}

function postDate(value) {
  return new Date(String(value).replace(" ", "T"));
}

function machineDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function displayDate(date) {
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
}

function longDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
}

function readTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function icon(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${iconPaths[name]}"></path></svg>`;
}

function socialLinks() {
  return `<div class="social-links">${site.social.map(([label, href, name]) => `<a class="social-links__link" href="${href}" aria-label="${label}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${icon(name)}</a>`).join("")}</div>`;
}

function nav(current) {
  const links = [
    ["Home", "/"],
    ["Blog", "/blog/"],
    ["Projects", "/projects/"],
    ["CV", "/cv/"],
    ["About", "/about/"]
  ].filter(([label]) => label !== current);
  const className = current === "Home" ? "nav-home" : "nav";
  return `<nav class="${className}" aria-label="Primary"><ul class="nav__list">${links.map(([label, href]) => `<li class="nav__item"><a class="nav__link" href="${href}">${label}</a></li>`).join("")}</ul></nav>`;
}

function header() {
  return `<header class="site-header animated">
  <a class="site-header__link" href="/about/"><img class="site-header__photo" src="${site.picture}" alt="${site.name}"></a>
  <h1 class="site-header__title">${site.name}</h1>
  <h2 class="site-header__description">${site.bio}</h2>
  ${socialLinks()}
</header>`;
}

function pageShell({ title, current = title, body, showHeader = false, className = "page", canonicalPath = "/" }) {
  const description = escapeHtml(site.description);
  const pageTitle = title === "Home" ? site.name : `${title} | ${site.name}`;
  const canonical = `${site.url}${canonicalPath}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="${site.name}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${site.name}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" type="application/rss+xml" title="${site.name}" href="/feed.xml">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
  <link rel="manifest" href="/favicons/site.webmanifest">
  <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#555555">
  <link rel="shortcut icon" href="/favicons/favicon.ico">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="/src/styles/site.css">
</head>
<body>
  <div class="wrapper">
    <main class="${className}">
      ${showHeader ? header() : ""}
      ${nav(current)}
      ${body}
    </main>
    <footer class="footer">${site.name} &copy; ${site.year} <a href="/feed.xml" aria-label="RSS feed">${icon("rss")}</a></footer>
  </div>
</body>
</html>
`;
}

function listItem(item) {
  return `<article class="list__item">
  <a class="list__link" href="${item.href}">
    <aside class="list__date"><time datetime="${machineDate(item.date)}">${displayDate(item.date)}</time></aside>
    <h3 class="list__title">${inlineMarkdown(item.title)}${item.description ? ` ${escapeHtml(item.description)}` : ""}</h3>
  </a>
</article>`;
}

function readPosts() {
  return fs.readdirSync(path.join(root, "_posts"))
    .filter((file) => /\.(markdown|md)$/i.test(file))
    .map((file) => {
      const [data, content] = parseFrontMatter(read(path.join("_posts", file)));
      const slug = slugFromPost(file);
      const date = postDate(data.date || file.slice(0, 10));
      return {
        ...data,
        content,
        slug,
        date,
        href: data.externalLink || `/${slug}/`,
        permalink: `/${slug}/`,
        title: data.title || slug
      };
    })
    .sort((a, b) => b.date - a.date);
}

function buildContentPage(sourceFile, outputPath, title, className) {
  const [, content] = parseFrontMatter(read(sourceFile));
  const prepared = content
    .replace(/^\[(Twitter|E-Mail)\]: .+$/gm, "")
    .replaceAll("{{ site.url }}/{{ site.picture }}", site.picture)
    .replaceAll("[Twitter]", "[Twitter](https://twitter.com/danbennett)")
    .replaceAll("[E-Mail]", "[E-Mail](mailto:dan@danbennett.me)");
  const html = markdownToHtml(prepared);
  write(outputPath, pageShell({
    title,
    current: title,
    className: `page ${className}`,
    canonicalPath: `/${outputPath.replace(/index\.html$/, "")}`,
    body: `<h1>${title}</h1>\n${html}`
  }));
}

function cvExperienceItem(item) {
  return `<article class="cv-item">
  <div class="cv-item__details">
    <h3>${escapeHtml(item.organisation)}</h3>
    ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${escapeHtml(item.url.replace(/^https?:\/\//, ""))}</a>` : ""}
    <p><strong>${escapeHtml(item.role)}</strong></p>
    <p>${escapeHtml(item.dates)}</p>
  </div>
  <div class="cv-item__body">
    ${item.quote ? `<p class="cv-item__quote">${escapeHtml(item.quote)}</p>` : ""}
    ${item.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    ${item.bullets ? `<ul>${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}
  </div>
</article>`;
}

function buildCvPage() {
  const body = `<header class="cv-hero">
  <img src="${site.picture}" alt="${site.name}">
  <div>
    <h1>CV</h1>
    <p>${escapeHtml(cv.title)}</p>
    <div class="cv-contact">
      <a href="mailto:${site.email}">${site.email}</a>
      <a href="${site.url}">${site.url.replace("https://", "")}</a>
      <a href="https://www.linkedin.com/in/danbennettuk" target="_blank" rel="noopener">linkedin.com/in/danbennettuk</a>
    </div>
  </div>
</header>
<section class="cv-section">
  <h2>About Me</h2>
  ${cv.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
</section>
<section class="cv-section cv-section--timeline">
  <h2>My work so far...</h2>
  <div class="cv-timeline">${cv.experience.map(cvExperienceItem).join("")}</div>
</section>`;

  write("cv/index.html", pageShell({
    title: "CV",
    current: "CV",
    className: "page cv",
    canonicalPath: "/cv/",
    body
  }));
}

const posts = readPosts();
const blogPosts = posts.filter((post) => post.category === "blog" && post.hidden !== true);
const projectPosts = posts.filter((post) => post.projects === true || post.projects === "true");

write("index.html", pageShell({
  title: "Home",
  current: "Home",
  showHeader: true,
  className: "home",
  canonicalPath: "/",
  body: ""
}));

write("blog/index.html", pageShell({
  title: "Blog",
  current: "Blog",
  showHeader: true,
  className: "blog",
  canonicalPath: "/blog/",
  body: `<section class="list">${blogPosts.length ? blogPosts.map((post) => listItem({ ...post, href: post.permalink })).join("\n") : '<p class="text-center">Nothing published yet!</p>'}</section>`
}));

write("projects/index.html", pageShell({
  title: "Projects",
  current: "Projects",
  showHeader: true,
  className: "projects",
  canonicalPath: "/projects/",
  body: `<section class="list">${projectPosts.map(listItem).join("\n")}</section>`
}));

buildContentPage("about.md", "about/index.html", "About", "about");
buildCvPage();

for (const post of blogPosts) {
  const content = markdownToHtml(post.content);
  write(`${post.slug}/index.html`, pageShell({
    title: post.title,
    current: "",
    className: "page post",
    canonicalPath: post.permalink,
    body: `<article>
  <h1 class="post__title">${inlineMarkdown(post.title)}</h1>
  <span class="post__meta"><time datetime="${machineDate(post.date)}">${longDate(post.date)}</time> - ${readTime(post.content)}</span>
  ${post.tag ? `<div class="post__tags"><a class="post__tag" href="/tags/#${post.tag}">${escapeHtml(post.tag)}</a></div>` : ""}
  ${content}
</article>`
  }));
}

const tags = [...new Set(posts.map((post) => post.tag).filter(Boolean))].sort();
write("tags/index.html", pageShell({
  title: "Tags",
  current: "Tags",
  showHeader: true,
  className: "tags",
  canonicalPath: "/tags/",
  body: `<section class="list">${tags.map((tag) => `<article class="list__item" id="${escapeHtml(tag)}"><h3 class="list__title">${escapeHtml(tag)}</h3>${posts.filter((post) => post.tag === tag).map((post) => `<p><a href="${post.category === "blog" ? post.permalink : post.href}">${inlineMarkdown(post.title)}</a></p>`).join("")}</article>`).join("")}</section>`
}));

const feedItems = blogPosts.map((post) => `<item>
  <title>${escapeHtml(post.title)}</title>
  <link>${site.url}${post.permalink}</link>
  <guid>${site.url}${post.permalink}</guid>
  <pubDate>${post.date.toUTCString()}</pubDate>
  <description>${escapeHtml(post.content.replace(/!\[[^\]]*\]\([^)]+\)/g, "").slice(0, 280))}</description>
</item>`).join("\n");

write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${site.name}</title>
  <link>${site.url}/</link>
  <description>${site.description}</description>
  ${feedItems}
</channel>
</rss>
`);

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", "/blog/", "/projects/", "/cv/", "/about/", "/tags/", ...blogPosts.map((post) => post.permalink)].map((url) => `  <url><loc>${site.url}${url}</loc></url>`).join("\n")}
</urlset>
`);

console.log(`Built ${blogPosts.length} blog post and ${projectPosts.length} projects.`);
