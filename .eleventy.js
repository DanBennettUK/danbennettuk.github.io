export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "favicons": "favicons" });
  eleventyConfig.addPassthroughCopy({ "src/styles": "src/styles" });
  eleventyConfig.addPassthroughCopy({ "google31f4df2b28a84d79.html": "google31f4df2b28a84d79.html" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });

  eleventyConfig.addFilter("htmlDate", (date) => {
    const value = new Date(date);
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
  });

  eleventyConfig.addFilter("displayDate", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  });

  eleventyConfig.addFilter("longDate", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
  });

  eleventyConfig.addFilter("rssDate", (date) => new Date(date).toUTCString());

  eleventyConfig.addFilter("emojify", (value = "") => {
    return String(value)
      .replaceAll(":headphones:", "🎧")
      .replaceAll(":desktop_computer:", "🖥️");
  });

  eleventyConfig.addFilter("stripProtocol", (value = "") => {
    return String(value).replace(/^https?:\/\//, "");
  });

  eleventyConfig.addFilter("isExternal", (value = "") => /^https?:\/\//.test(String(value)));

  eleventyConfig.addFilter("readTime", (value = "") => {
    const text = String(value).replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
  });

  eleventyConfig.addFilter("excerpt", (value = "", length = 280) => {
    return String(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, length);
  });

  eleventyConfig.addFilter("where", (items, key, value) => {
    return (items || []).filter((item) => item.data?.[key] === value);
  });

  eleventyConfig.addFilter("projects", (items) => {
    return (items || []).filter((item) => item.data?.projects);
  });

  eleventyConfig.addFilter("postTags", (items) => {
    return [...new Set((items || []).map((item) => item.data?.tag).filter(Boolean))].sort();
  });

  eleventyConfig.addFilter("sortNewest", (items) => {
    return [...(items || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/posts/*.md");
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "markdown", "njk"]
  };
}
