<h1 align="center" style="margin-top:0;"> 
<div>🔗</div>
<div>route-link</div> </h1>
<p align="center">
  <a href="https://www.npmjs.com/package/route-link">
    <img src="https://badge.fury.io/js/route-link.svg" alt="npm version" height="18">
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/route-link" />
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" target="_blank" />
  </a>
</p>

<div align="center">utilities for constructing type-safe URLs</div>

<br/>

## **Install**

`npm i route-link`

<br/>

## **Example Usage**

```typescript
import { route, extend } from "route-link";

const posts = route("/posts");
const post = extend(posts, '/:post_id')

// generate type safe links
posts.link() // /posts
post.link({ post_id: "1" }); // /posts/1

// match URLs to path
post.match(post.link({ post_id: "1" })) // { post_id: "1" };
post.match("/foo")) // false

// use route path
<Route path={post.path}/>

```

as a convivnce, `link` and `match` are also exported separately

## Credits

- [@danvk](https://github.com/danvk) for the [type](https://twitter.com/danvdk/status/1301707026507198464?lang=en) [wizardy](https://stackoverflow.com/questions/51488717/declaring-dependent-argument-types-for-optional-arguments-with-conditional-types/64796265#64796265)
