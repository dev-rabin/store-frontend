import API from "../services/api";

export const fetchCategories = async () => {
  try {
    const res = await API.get("/categories");
    return res.data.categories;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = async (search = "", category = "") => {
  try {
    console.log("API Params", {
      search,
      category,
    });
    const res = await API.get("/products", {
      params: {
        search,
        category,
      },
    });

    return res.data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchNewArrivals = async () => {
  try {
    const res = await API.get("/products/new-arrivals");
    return res.data.products;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const fetchProduct = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data.product;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (data) => {
  try {
    const res = await API.post("/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signup = async (data) => {
  try {
    const res = await API.post("/signup", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const res = await API.post("/logout");
    localStorage.removeItem("token");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

export const addToCart = async (productId) => {
  try {
    const res = await API.post("/cart/add", {
      product_id: productId,
    });

    return res.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error.response?.data || error;
  }
};

export const getCart = async () => {
  try {
    const res = await API.get("/cart");

    return res.data;
  } catch (error) {
    console.error("Get cart error:", error);
    throw error.response?.data || error;
  }
};

export const updateCart = async (id, quantity) => {
  try {
    const res = await API.put(`/cart/${id}`, {
      quantity,
    });

    return res.data;
  } catch (error) {
    console.error("Update cart error:", error);
    throw error.response?.data || error;
  }
};

export const removeCart = async (id) => {
  try {
    const res = await API.delete(`/cart/${id}`);

    return res.data;
  } catch (error) {
    console.error("Remove cart error:", error);
    throw error.response?.data || error;
  }
};

export const checkout = async (payload) => {
  try {
    const res = await API.post("/checkout", payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrders = async () => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await API.get(`/orders/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPayment = async (orderId) => {
  const response = await API.post("/payment/create", {
    order_id: orderId,
  });

  return response.data;
};

export const addAddress = async (data) => {
  try {
    const res = await API.post("/addresses", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    const res = await API.get("/addresses");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const res = await API.delete(`/addresses/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const setDefaultAddress = async (id) => {
  const res = await API.put(`/addresses/${id}/default`);
  return res.data;
};
