import { define } from "../src/index";

const setup = () => {
  const products = "/products" as const;
  const product = `${products}/:product_id` as const;
  const things = `${product}/things` as const;
  const thing = `${things}/:thing_id` as const;

  const paths = { products, product, things, thing };
  const routes = define(paths);
  return { paths, routes };
};

describe("creates correct paths", function () {
  it("creates correct static paths", function () {
    const { routes, paths } = setup();
    expect(routes.products.path).toEqual(paths.products);
  });
  it("creates correct param paths", function () {
    const { routes, paths } = setup();
    expect(routes.product.path).toEqual(paths.product);
    expect(routes.things.path).toEqual(paths.things);
    expect(routes.thing.path).toEqual(paths.thing);
  });
});

describe("creates correct links", function () {
  it("creates correct static links", function () {
    const { routes } = setup();
    expect(routes.products.link()).toEqual("/products");
  });
  it("creates correct param links", function () {
    const { routes } = setup();
    expect(routes.product.link({ product_id: "1" })).toEqual("/products/1");
    expect(routes.things.link({ product_id: "2" })).toEqual("/products/2/things");
    expect(routes.thing.link({ product_id: "3", thing_id: "1" })).toEqual("/products/3/things/1");
  });
});

describe("returns correct object", function () {
  it("returns an object with the same keys passed", function () {
    const { routes, paths } = setup();

    const keys_passed = Object.keys(paths);
    const keys_returned = Object.keys(routes);
    expect(keys_passed.length).toEqual(keys_returned.length);

    const has_all_keys = keys_passed.every((key) => keys_returned.includes(key));
    expect(has_all_keys).toBeTruthy();
  });
});
