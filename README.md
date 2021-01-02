<h1 align="center" style="margin-top:0;"> 
<div>☔</div>
<div>path-link</div> </h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/readme-md-generator.svg" />
  <img src="https://img.shields.io/bundlephobia/minzip/alpinejs" />
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" target="_blank" />
  </a>
</p>

<div align="center">a utility for constructing type-safe URLs</div>

<div style="text-align: center; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
</div>
<br/>

## **Install**

`npm i path-link`

<sub>requires `typescript@^4.1`</sub>

<br/>

## **Usage**

### link

```typescript
import { link } from "path-link";

const posts = "/posts" as const;
const post = `${posts}/:post_id` as const;

// Create type-safe links
link(post, { post_id: "1" });
link(posts);
```

### path: wrap paths with a link function

```typescript
const posts = path("/posts" as const);
const post = path(`${posts}/:post_id` as const);

// Create type-safe links
post.link({ post_id: "1" }); // based on post.path
posts.link(); // based on posts.path
```
