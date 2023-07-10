import Cart from './cart';
import CartItem from './cart-item';
import { CartWithDiscount, CartWithShipping } from './decorators';

const cart = new Cart();

const itemA = new CartItem({ name: 'a', price: 123 });
const itemB = new CartItem({ name: 'b', price: 874 });
const itemC = new CartItem({ name: 'c', price: 335 });
const itemD = new CartItem({ name: 'd', price: 534 });

cart.addItem([itemA, itemB]).addItem([itemC, itemD]);

console.log(cart.totalPrice);
console.log(cart.toString());

cart.removeItem(itemB);

console.log(cart.totalPrice); // 992
console.log(cart.toString());

// 装饰器 实现商品打折
const discountCart = new CartWithDiscount(cart, 0.8);

console.log(discountCart.discountTotalPrice); // 793.6
console.log(discountCart.toString());
/*
  Cart Discount(Rate: 80):
  a       ($123.00 -> $98.40)
  c       ($335.00 -> $268.00)
  d       ($534.00 -> $427.20)
*/

// 装饰器 判断运费
const shippingCart = new CartWithShipping(cart, 1000);

console.log(shippingCart.totalPrice); // 1092
console.log(shippingCart.toString());
/*
  Cart with NoFreeShipping(shippingCost: 100):
  a $123
  c $335
  d $534
*/
