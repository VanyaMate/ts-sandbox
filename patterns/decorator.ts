class Product {
    constructor (
        private readonly _name: string,
        private readonly _price: number,
        private readonly _discount: number,
    ) {
    }

    get name (): string {
        return this._name;
    }

    get price (): number {
        return this._price;
    }

    get discount (): number {
        return this._discount;
    }
}

class Order {
    constructor (
        private readonly _products: Product[],
    ) {
    }

    get products (): Product[] {
        return this._products;
    }

    getPrice (): number {
        return this._products.reduce((acc, item) => acc += item.price, 0);
    }
}

class Cart extends Order {
    constructor (private readonly order: Order) {
        super(order.products);
        this.order = order;
    }

    getData () {
        return this.order.products.map((product) => {
            return {
                name             : product.name,
                price            : product.price,
                discount         : product.discount,
                priceWithDiscount: product.price - product.price * (product.discount / 100),
            };
        });
    }
}

class DiscountOrder {
    constructor (private readonly order: Order) {
    }

    get products (): Product[] {
        return this.order.products;
    }

    getPrice (): number {
        return this.order.products.reduce((acc, item) => acc += item.price - item.price * (item.discount / 100), 0);
    }
}

const order: Order                 = new Order([
    new Product('Яблоко', 10, 20),
    new Product('Вишня', 50, 10),
    new Product('Арбуз', 100, 30),
]);
const discountOrder: DiscountOrder = new DiscountOrder(order);
const cart: Cart                   = new Cart(order);

console.log(order.getPrice());
console.log(discountOrder.getPrice());
console.log(cart.getData());