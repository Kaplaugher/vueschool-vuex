import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
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
    }
  }
});
