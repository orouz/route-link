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
<!-- <div align="center">parameterized URLs utility</div> -->

<div style="text-align: center; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc">
</div>
<br/>

## **Install**

`npm i path-link`

<sub>requires `typescript@^4.1`</sub>

<br/>

## **What does it do?**

assuming `Path` is a `string` with its segments separated by `/` and parametrized by `/:`

it maps

```typescript
Record<Key, Path>
```

to

```typescript
Record<
  Key,
  {
    path: Path,
    link(params: Params<Path>): string
  }
>
```

<br/>

## **Example**

```typescript
import { define } from "path-link";

const products = "/products" as const;
const product = `${products}/:product_id` as const;
const links = define({ products, product });

// Create type-safe links
links.product.link({ product_id });
links.products.link();

// Use path
links.products.path;
```
