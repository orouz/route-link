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

## **Example**

```typescript
import { link, path } from "path-link";

const posts = "/posts" as const;
const post = `${posts}/:product_id` as const;

// Create type-safe links
link(post, { product_id: "1" });
link(posts);

// alternatively: wrap paths with a link function
const products2 = path("/posts" as const);
const product2 = path(`${posts}/:product_id` as const);

// Create type-safe links
product2.link({ product_id: "1" }); // based on product2.path
products2.link(); // based on products2.path
```
