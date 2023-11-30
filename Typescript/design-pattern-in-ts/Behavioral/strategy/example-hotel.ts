interface IHotelProvide {
  provide(): void;
}

interface IHotelProvideConstructor {
  new (): IHotelProvide;
}

class Hotel {
  #provider: IHotelProvide;

  constructor(provider: IHotelProvideConstructor) {
    this.#provider = new provider();
  }

  provide() {
    return this.#provider.provide();
  }
}

class FireStarHotel implements IHotelProvide {
  provide() {
    return 'FireStar Hotel: we provide swimming pools, MICHELIN restaurant.';
  }
}

class BusinessHotel implements IHotelProvide {
  provide() {
    return 'BusinessHotel Hotel: we provide a free washing service and coffee.';
  }
}

class CheapHotel implements IHotelProvide {
  provide() {
    return 'CheapHotel Hotel: we only provide a bed for sleeping, sorry.';
  }
}

const hotelA = new Hotel(FireStarHotel);
const hotelB = new Hotel(BusinessHotel);
const hotelC = new Hotel(CheapHotel);

console.log(hotelA.provide());
console.log(hotelB.provide());
console.log(hotelC.provide());

// Output:
// FireStar Hotel: we provide swimming pools, MICHELIN restaurant.
// BusinessHotel Hotel: we provide a free washing service and coffee.
// CheapHotel Hotel: we only provide a bed for sleeping, sorry.

// Addition: We can change the provider of the hotel without changing the code of the hotel class.
// Like, you want to change the name of the Hotel
hotelA.provide = () => {
  return 'Hotel A: we provide a free washing service and coffee.';
};

console.log(hotelA.provide());
// Hotel A: we provide a free washing service and coffee.
