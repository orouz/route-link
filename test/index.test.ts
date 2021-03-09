import { path, link } from "../src/index";

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

    const product = path(productPath);
    const products = path(productsPath);
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
});
