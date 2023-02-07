/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}": types.CartBaseFragmentDoc,
    "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}": types.CartItemFragmentDoc,
    "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}": types.ImageBaseFragmentDoc,
    "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  sessionToken\n}": types.CustomerBaseFragmentDoc,
    "fragment OrderProductBase on Order {\n  id\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}": types.OrderProductBaseFragmentDoc,
    "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}": types.PageCommonBaseFragmentDoc,
    "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}": types.ProductAttributeBaseFragmentDoc,
    "fragment ProductBase on Product {\n  ...ProductMinBase\n  dateOnSaleFrom\n  dateOnSaleTo\n  onSale\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}": types.ProductBaseFragmentDoc,
    "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}": types.ProductCategoryBaseFragmentDoc,
    "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}": types.ProductMinBaseFragmentDoc,
    "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}": types.ProductPriceBaseFragmentDoc,
    "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}": types.ProductVariationBaseFragmentDoc,
    "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n  }\n}": types.SimpleProductFragmentFragmentDoc,
    "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}": types.VariableProductFragmentFragmentDoc,
    "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}": types.VariationAttributeBaseFragmentDoc,
    "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}": types.UserAuthBaseFragmentDoc,
    "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}": types.UserFragmentDoc,
    "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}": types.LoginUserDocument,
    "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}": types.LogoutUserDocument,
    "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}": types.RefreshAuthTokenDocument,
    "mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}": types.RegisterCustomerDocument,
    "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}": types.ResetUserPasswordDocument,
    "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n    success\n  }\n}": types.SendPasswordResetEmailDocument,
    "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}": types.AddToCartDocument,
    "mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}": types.CheckoutDocument,
    "mutation ClearCart {\n  emptyCart(input: {clearPersistentCart: true}) {\n    cart {\n      ...CartBase\n    }\n  }\n}": types.ClearCartDocument,
    "mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}": types.RemoveCartItemDocument,
    "mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}": types.UpdateCartItemQuantityDocument,
    "query GetBackgroundVideo {\n  page(id: \"home\", idType: URI) {\n    bgVideo {\n      placeholderimage {\n        ...ImageBase\n      }\n      video {\n        ...ImageBase\n        mediaItemUrl\n      }\n    }\n  }\n}": types.GetBackgroundVideoDocument,
    "query GetCart {\n  cart {\n    ...CartBase\n  }\n}": types.GetCartDocument,
    "query GetCartForStripe {\n  cart {\n    total(format: RAW)\n  }\n}": types.GetCartForStripeDocument,
    "query GetCategoryBySlug($id: ID!) {\n  productCategory(id: $id, idType: SLUG) {\n    ...ProductCategoryBase\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}": types.GetCategoryBySlugDocument,
    "query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}": types.GetCategorySlugsDocument,
    "query GetCollectionBySlug($slug: ID!) {\n  collection(id: $slug, idType: SLUG) {\n    id\n    title\n    slug\n    content\n    gallery {\n      media {\n        video {\n          ...ImageBase\n          mediaItemUrl\n        }\n        images {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}": types.GetCollectionBySlugDocument,
    "query GetCollectionsData {\n  collections(first: 100) {\n    nodes {\n      id\n      title\n      slug\n      gallery {\n        media {\n          coverimage {\n            ...ImageBase\n          }\n        }\n      }\n    }\n  }\n}": types.GetCollectionsDataDocument,
    "query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}": types.GetCustomerDataDocument,
    "query GetCustomerDataWithOrders {\n  customer {\n    ...CustomerBase\n    orders {\n      nodes {\n        id\n        date\n        orderNumber\n        total\n        status\n        lineItems {\n          nodes {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n}": types.GetCustomerDataWithOrdersDocument,
    "query GetMenuData {\n  mainMenu: menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      nodes {\n        id\n        url\n        label\n        childItems {\n          nodes {\n            id\n            url\n            label\n          }\n        }\n      }\n    }\n    siteSettings {\n      colors {\n        accent\n        black\n        blue\n        green\n        highlight\n        indigo\n        orange\n        red\n        violet\n        white\n        yellow\n      }\n      footer {\n        socialmedia {\n          icon {\n            name\n            style\n          }\n          link\n          name\n        }\n      }\n    }\n  }\n}": types.GetMenuDataDocument,
    "query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    id\n    date\n    orderNumber\n    total\n    status\n    lineItems {\n      nodes {\n        quantity\n        total\n        product {\n          node {\n            ... on SimpleProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n            }\n            ...VariableProductFragment\n            ... on VariableProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n              variations {\n                nodes {\n                  ...ProductVariationBase\n                }\n              }\n              attributes {\n                nodes {\n                  ...ProductAttributeBase\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetOrderDataByIdDocument,
    "query GetOrdersData {\n  orders {\n    nodes {\n      id\n      date\n      orderNumber\n      total\n      status\n      lineItems {\n        nodes {\n          databaseId\n        }\n      }\n    }\n  }\n}": types.GetOrdersDataDocument,
    "query GetPageDataBySlug($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    ...PageCommonBase\n    content\n  }\n}": types.GetPageDataBySlugDocument,
    "query GetPressData {\n  press(first: 100) {\n    nodes {\n      id\n      title\n      content\n      featuredImage {\n        node {\n          ...ImageBase\n        }\n      }\n      slug\n    }\n  }\n}": types.GetPressDataDocument,
    "query GetProductCategories {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetProductCategoriesDocument,
    "query GetProductDataBySlug($id: ID!) {\n  product(id: $id, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n  }\n}": types.GetProductDataBySlugDocument,
    "query GetProductsByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.GetProductsByCategoryDocument,
    "query GetProductsData {\n  products(first: 200) {\n    nodes {\n      id\n      databaseId\n      name\n      slug\n      type\n      onSale\n      shortDescription\n      galleryImages {\n        nodes {\n          id\n          databaseId\n          altText\n          sourceUrl\n          mediaDetails {\n            height\n            width\n          }\n        }\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n      }\n    }\n  }\n}": types.GetProductsDataDocument,
    "query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      ...ProductBase\n      ...SimpleProductFragment\n      ...VariableProductFragment\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetProductsWithCategoriesDocument,
    "query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}": types.QuickSearchDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"): (typeof documents)["fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"): (typeof documents)["fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  sessionToken\n}"): (typeof documents)["fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  sessionToken\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment OrderProductBase on Order {\n  id\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment OrderProductBase on Order {\n  id\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}"): (typeof documents)["fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"): (typeof documents)["fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductBase on Product {\n  ...ProductMinBase\n  dateOnSaleFrom\n  dateOnSaleTo\n  onSale\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}"): (typeof documents)["fragment ProductBase on Product {\n  ...ProductMinBase\n  dateOnSaleFrom\n  dateOnSaleTo\n  onSale\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"): (typeof documents)["fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"): (typeof documents)["fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"): (typeof documents)["fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"): (typeof documents)["fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n  }\n}"): (typeof documents)["fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"): (typeof documents)["fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    regularPrice\n    salePrice\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"): (typeof documents)["fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}"): (typeof documents)["fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"): (typeof documents)["fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"): (typeof documents)["mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"): (typeof documents)["mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"): (typeof documents)["mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n    success\n  }\n}"): (typeof documents)["mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"): (typeof documents)["mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}"): (typeof documents)["mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ClearCart {\n  emptyCart(input: {clearPersistentCart: true}) {\n    cart {\n      ...CartBase\n    }\n  }\n}"): (typeof documents)["mutation ClearCart {\n  emptyCart(input: {clearPersistentCart: true}) {\n    cart {\n      ...CartBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"): (typeof documents)["mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"): (typeof documents)["mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBackgroundVideo {\n  page(id: \"home\", idType: URI) {\n    bgVideo {\n      placeholderimage {\n        ...ImageBase\n      }\n      video {\n        ...ImageBase\n        mediaItemUrl\n      }\n    }\n  }\n}"): (typeof documents)["query GetBackgroundVideo {\n  page(id: \"home\", idType: URI) {\n    bgVideo {\n      placeholderimage {\n        ...ImageBase\n      }\n      video {\n        ...ImageBase\n        mediaItemUrl\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCart {\n  cart {\n    ...CartBase\n  }\n}"): (typeof documents)["query GetCart {\n  cart {\n    ...CartBase\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCartForStripe {\n  cart {\n    total(format: RAW)\n  }\n}"): (typeof documents)["query GetCartForStripe {\n  cart {\n    total(format: RAW)\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategoryBySlug($id: ID!) {\n  productCategory(id: $id, idType: SLUG) {\n    ...ProductCategoryBase\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}"): (typeof documents)["query GetCategoryBySlug($id: ID!) {\n  productCategory(id: $id, idType: SLUG) {\n    ...ProductCategoryBase\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}"): (typeof documents)["query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCollectionBySlug($slug: ID!) {\n  collection(id: $slug, idType: SLUG) {\n    id\n    title\n    slug\n    content\n    gallery {\n      media {\n        video {\n          ...ImageBase\n          mediaItemUrl\n        }\n        images {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCollectionBySlug($slug: ID!) {\n  collection(id: $slug, idType: SLUG) {\n    id\n    title\n    slug\n    content\n    gallery {\n      media {\n        video {\n          ...ImageBase\n          mediaItemUrl\n        }\n        images {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCollectionsData {\n  collections(first: 100) {\n    nodes {\n      id\n      title\n      slug\n      gallery {\n        media {\n          coverimage {\n            ...ImageBase\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCollectionsData {\n  collections(first: 100) {\n    nodes {\n      id\n      title\n      slug\n      gallery {\n        media {\n          coverimage {\n            ...ImageBase\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}"): (typeof documents)["query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomerDataWithOrders {\n  customer {\n    ...CustomerBase\n    orders {\n      nodes {\n        id\n        date\n        orderNumber\n        total\n        status\n        lineItems {\n          nodes {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCustomerDataWithOrders {\n  customer {\n    ...CustomerBase\n    orders {\n      nodes {\n        id\n        date\n        orderNumber\n        total\n        status\n        lineItems {\n          nodes {\n            databaseId\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMenuData {\n  mainMenu: menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      nodes {\n        id\n        url\n        label\n        childItems {\n          nodes {\n            id\n            url\n            label\n          }\n        }\n      }\n    }\n    siteSettings {\n      colors {\n        accent\n        black\n        blue\n        green\n        highlight\n        indigo\n        orange\n        red\n        violet\n        white\n        yellow\n      }\n      footer {\n        socialmedia {\n          icon {\n            name\n            style\n          }\n          link\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetMenuData {\n  mainMenu: menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      nodes {\n        id\n        url\n        label\n        childItems {\n          nodes {\n            id\n            url\n            label\n          }\n        }\n      }\n    }\n    siteSettings {\n      colors {\n        accent\n        black\n        blue\n        green\n        highlight\n        indigo\n        orange\n        red\n        violet\n        white\n        yellow\n      }\n      footer {\n        socialmedia {\n          icon {\n            name\n            style\n          }\n          link\n          name\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    id\n    date\n    orderNumber\n    total\n    status\n    lineItems {\n      nodes {\n        quantity\n        total\n        product {\n          node {\n            ... on SimpleProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n            }\n            ...VariableProductFragment\n            ... on VariableProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n              variations {\n                nodes {\n                  ...ProductVariationBase\n                }\n              }\n              attributes {\n                nodes {\n                  ...ProductAttributeBase\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    id\n    date\n    orderNumber\n    total\n    status\n    lineItems {\n      nodes {\n        quantity\n        total\n        product {\n          node {\n            ... on SimpleProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n            }\n            ...VariableProductFragment\n            ... on VariableProduct {\n              ...ProductMinBase\n              image {\n                ...ImageBase\n              }\n              galleryImages {\n                nodes {\n                  ...ImageBase\n                }\n              }\n              price\n              salePrice\n              variations {\n                nodes {\n                  ...ProductVariationBase\n                }\n              }\n              attributes {\n                nodes {\n                  ...ProductAttributeBase\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetOrdersData {\n  orders {\n    nodes {\n      id\n      date\n      orderNumber\n      total\n      status\n      lineItems {\n        nodes {\n          databaseId\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetOrdersData {\n  orders {\n    nodes {\n      id\n      date\n      orderNumber\n      total\n      status\n      lineItems {\n        nodes {\n          databaseId\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPageDataBySlug($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    ...PageCommonBase\n    content\n  }\n}"): (typeof documents)["query GetPageDataBySlug($slug: ID!) {\n  page(id: $slug, idType: URI) {\n    ...PageCommonBase\n    content\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPressData {\n  press(first: 100) {\n    nodes {\n      id\n      title\n      content\n      featuredImage {\n        node {\n          ...ImageBase\n        }\n      }\n      slug\n    }\n  }\n}"): (typeof documents)["query GetPressData {\n  press(first: 100) {\n    nodes {\n      id\n      title\n      content\n      featuredImage {\n        node {\n          ...ImageBase\n        }\n      }\n      slug\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductCategories {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductCategories {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductDataBySlug($id: ID!) {\n  product(id: $id, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n  }\n}"): (typeof documents)["query GetProductDataBySlug($id: ID!) {\n  product(id: $id, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query GetProductsByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsData {\n  products(first: 200) {\n    nodes {\n      id\n      databaseId\n      name\n      slug\n      type\n      onSale\n      shortDescription\n      galleryImages {\n        nodes {\n          id\n          databaseId\n          altText\n          sourceUrl\n          mediaDetails {\n            height\n            width\n          }\n        }\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductsData {\n  products(first: 200) {\n    nodes {\n      id\n      databaseId\n      name\n      slug\n      type\n      onSale\n      shortDescription\n      galleryImages {\n        nodes {\n          id\n          databaseId\n          altText\n          sourceUrl\n          mediaDetails {\n            height\n            width\n          }\n        }\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      ...ProductBase\n      ...SimpleProductFragment\n      ...VariableProductFragment\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      ...ProductBase\n      ...SimpleProductFragment\n      ...VariableProductFragment\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;