<h1 align="center" style="margin-top:0;"> 
<div>🔗</div>
<div>path-link</div> </h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/readme-md-generator.svg" />
  <img src="https://img.shields.io/bundlephobia/minzip/alpinejs" />
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" target="_blank" />
  </a>
</p>

<div align="center">a utility for constructing type-safe URLs</div>

<br/>

## **Install**

`npm i path-link`

<br/>

## **What does it do?**

it maps a template `string` literal, like this one:

```typescript
const post = `/posts/:post_id` as const;
```

to a `function` that returns the template `string` with the provided params:

```typescript
declare const link(params: { post_id: string }):string
```

## **Usage**

#### **`link`**: creates a link from a `string`

```typescript
import { link } from "path-link";

const posts = "/posts" as const;
const post = `${posts}/:post_id` as const;

// Create type-safe links
link(posts);
link(post, { post_id: "1" });
```

#### **`path`**: wraps a `string` with a `link` function

```typescript
import { path } from "path-link";
const posts = path("/posts" as const);
const post = path(`${posts.path}/:post_id` as const;

// Create type-safe links
posts.link();
post.link({ post_id: "1" });
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/orouz/path-link/blob/master/.github/CONTRIBUTING.MD)

## Credits

- [@danvk](https://github.com/danvk) for the [type](https://twitter.com/danvdk/status/1301707026507198464?lang=en) [wizardy](https://stackoverflow.com/questions/51488717/declaring-dependent-argument-types-for-optional-arguments-with-conditional-types/64796265#64796265)

## License

MIT
