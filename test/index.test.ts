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

  it("creates wraps paths with a link function", function () {
    const { product: productPath, products: productsPath } = setup();

    const product = path(productPath);
    const products = path(productsPath);
    expect(products.link()).toEqual("/products");
    expect(product.link({ product_id: "1" })).toEqual("/products/1");
  });
});
