import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  mutations: {
    setProducts(state, products) {
      // update product state
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, cartItem) {
      cartItem.inventory--;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      // make the call
      // run the setProducts mutation
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        });
      });
    },
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          item => item.id === product.id
        );
        if (!cartItem) {
          // push to cart
          context.commit('pushProductToCart', product.id);
        } else {
          // increment item quantity
          context.commit('incrementItemQuantity', cartItem);
        }
        context.commit('decrementProductInventory', product);
      }
    }
  }
});
