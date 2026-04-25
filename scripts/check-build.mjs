import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "_site/blog/index.html",
    includes: "The Mess About EP",
    message: "Blog listing should include the published post."
  },
  {
    file: "_site/projects/index.html",
    includes: "CustomBotJS",
    message: "Projects listing should include project entries."
  },
  {
    file: "_site/feed.xml",
    includes: "<item>",
    message: "RSS feed should include at least one item."
  },
  {
    file: "_site/the-mess-about-ep/index.html",
    includes: "Now... what next?",
    message: "Published blog post page should be generated."
  }
];

const failures = [];

for (const check of checks) {
  if (!existsSync(check.file)) {
    failures.push(`${check.file} is missing. ${check.message}`);
    continue;
  }

  const content = readFileSync(check.file, "utf8");
  if (!content.includes(check.includes)) {
    failures.push(`${check.file} did not contain ${JSON.stringify(check.includes)}. ${check.message}`);
  }
}

if (existsSync("_site/posts")) {
  failures.push("_site/posts exists, which means source post files were copied instead of rendered.");
}

if (failures.length) {
  console.error("Build output checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Build output checks passed.");
