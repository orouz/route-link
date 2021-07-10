import { match, route, link, extend } from "../src/index";

const setup = () => {
  const products = "/products" as const;
  const product = `${products}/:product_id` as const;

  return {
    products,
    product,
  };
};

describe("creates correct links", function () {
  it("creates correct static links", function () {
    const { products } = setup();
    expect(link(products)).toEqual(products);
  });
  it("creates correct param links", function () {
    const { product } = setup();
    expect(link(product, { product_id: "1" })).toEqual(`/products/1`);
  });

  it("wraps paths with a link function", function () {
    const { product: productPath, products: productsPath } = setup();

    const product = route(productPath);
    const products = route(productsPath);
    expect(products.link()).toEqual("/products");
    expect(product.link({ product_id: "1" })).toEqual("/products/1");
  });

  it("link has correct arguments length", function () {
    const { product, products } = setup();

    // @ts-expect-error: Expected 2 arguments, but got 1.
    link(product); // product has missing params

    // @ts-expect-error: Expected 1 arguments, but got 2
    link(products, {}); // products has extra params
  });

  it("route can be extended", function () {
    const r1 = route("/posts");
    const r2 = extend(r1, "/:post_id");
    const r3 = extend(r2, "/foo");

    expect(r1.link()).toEqual("/posts");
    expect(r2.link({ post_id: "1" })).toEqual("/posts/1");
    expect(r3.link({ post_id: "1" })).toEqual("/posts/1/foo");
  });

  it("matches routes", function () {
    const r1 = route("/posts");
    const r2 = extend(r1, "/:post_id");
    const r3 = extend(r2, "/foo");
    const r4 = extend(r3, "/:foo_id");

    expect(match(r1.path, "/posts")).toEqual({});
    expect(match(r2.path, "/posts/zoo")).toEqual({ post_id: "zoo" });
    expect(match(r3.path, "/posts/goo/foo")).toEqual({ post_id: "goo" });
    expect(r4.match("/posts/pid/foo/fid")).toEqual({
      post_id: "pid",
      foo_id: "fid",
    });
  });
});
