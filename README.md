# Buck - A Hexo Theme

Buck is a hexo theme designed under Material Design 1 Guidelines.

## Getting started

You need to build the theme resource before using this theme in hexo. Navgative to this theme root:
1. `pnpm i` Install all dependencies.
2. `pnpm build` Build the resource.

## Note about tables

Tables in buck is responsive with special treatment: they need an additional element with `table-responsive` css class wraps them. Like:

```html
<div class="table-responsive">
  <table>...</table>
</div>
```

This preprocessing already comes with buck if you use those renderers:

- `hexo-renderer-marked`: modify the table rendering in a `marked:renderer` hook.

If the files are not preprocessed with certain steps. The script comes with buck will try it again on the user agent.

### Confirm if the tables are preprocessed

Open any article with any table, find the table element in your user agent's "Developer tools".

Check if it has a parent with css class `table-responsive`:

- No: the file is not preprocessed, and the script is failed to modify it on the user agent.
- Yes: Contine

Check if the parent have attribute `data-buck-backed="true"`:

- No: the file is not preprocessed
- Yes: the file is preprocessed

```html
<div class="table-responsive" data-buck-baked="true">
  <table>...</table>
</div>
```

## Development

ESBuild manages the resource of this theme. In the root:

- The `config.ts` is the esbuild config.
- `build.ts` is the build script, `watch.ts` is the incremental build script.

Use `pnpm dev` to start incremental building. For deployment, please remove `source` before build the resource.

## Roadmap

- Tags for articles
- Fullscreen pictures & Gallery layout
- Categories
- Video player
