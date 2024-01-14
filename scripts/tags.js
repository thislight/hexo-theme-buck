hexo.extend.helper.register("tags_of_year", function (year) {
  const yearNumber = Number(year)
  const tags = this.site.posts
    .filter((post) => post.date.year() === yearNumber)
    .map((x) => x.tags)
    .reduce((p, c) => {
      for (const t of c.toArray()) {
        p.add(t)
      }
      return p
    }, new Set())
    return Array.from(tags);
})
