import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { cartService } from "../api/cart";
import { menuService } from "../api/menu";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const normalizeId = (item) => item?._id || item?.id || item?.menu_item_id;

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!user?.user_id) {
      setItems([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.getCart(user.user_id);
      const cartRows = response.data || [];

      const enrichedItems = await Promise.all(
        cartRows.map(async (cartRow) => {
          try {
            const menuResponse = await menuService.getMenuItemById(cartRow.menu_item_id);
            const menuItem = menuResponse.data || {};

            return {
              ...cartRow,
              cart_id: cartRow._id,
              id: cartRow._id,
              menu_item_id: cartRow.menu_item_id,
              name: menuItem.name || "Menu item",
              description: menuItem.description || "",
              category: menuItem.category || "Food",
              price: Number(menuItem.price || 0),
              image: menuItem.image_url || menuItem.image || fallbackImage,
              image_url: menuItem.image_url || menuItem.image || fallbackImage,
              rating: menuItem.rating || 4.8,
            };
          } catch {
            return {
              ...cartRow,
              cart_id: cartRow._id,
              id: cartRow._id,
              name: "Menu item",
              description: "",
              category: "Food",
              price: 0,
              image: fallbackImage,
              image_url: fallbackImage,
              rating: 4.8,
            };
          }
        })
      );

      setItems(enrichedItems);
      return enrichedItems;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to load cart";
      setError(errorMsg);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user?.user_id]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      return;
    }

    setItems([]);
  }, [fetchCart, isAuthenticated]);

  const addToCart = async (menuItemId, quantity = 1) => {
    if (!user?.user_id) {
      const errorMsg = "Please login first";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      await cartService.addToCart({
        menu_item_id: menuItemId,
        quantity,
        user_id: user.user_id,
      });

      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to add item to cart";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartService.removeFromCart(cartItemId);
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to remove item";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const updateQuantity = async (cartItem, nextQuantity) => {
    const currentItem = typeof cartItem === "string"
      ? items.find((item) => normalizeId(item) === cartItem || item.cart_id === cartItem)
      : cartItem;

    if (!currentItem) {
      return { success: false, error: "Cart item not found" };
    }

    if (nextQuantity <= 0) {
      return removeFromCart(currentItem.cart_id || currentItem._id || currentItem.id);
    }

    if (nextQuantity > currentItem.quantity) {
      return addToCart(currentItem.menu_item_id, nextQuantity - currentItem.quantity);
    }

    try {
      await cartService.removeFromCart(currentItem.cart_id || currentItem._id || currentItem.id);
      await cartService.addToCart({
        menu_item_id: currentItem.menu_item_id,
        quantity: nextQuantity,
        user_id: user.user_id,
      });
      await fetchCart();
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to update quantity";
      setError(errorMsg);
      await fetchCart();
      return { success: false, error: errorMsg };
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(
        items.map((item) => cartService.removeFromCart(item.cart_id || item._id || item.id))
      );
      setItems([]);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to clear cart";
      setError(errorMsg);
      await fetchCart();
      return { success: false, error: errorMsg };
    }
  };

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );

  const value = {
    items,
    isLoading,
    error,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal: () => cartTotal,
    cartTotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
