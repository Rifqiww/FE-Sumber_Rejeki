import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { toast } from "sonner";
import type { Product } from "../data/products";

export interface CartItemType extends Product {
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  toggleSelectItem: (id: number) => void;
  toggleSelectAll: () => void;
  clearCart: () => void;
  totalPrice: number;
  selectedItemsCount: number;
  isAllSelected: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const cartItemsRef = useRef(cartItems);
  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const currentItems = cartItemsRef.current;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Check stock limit for existing item
      if (existingItem.quantity + quantity > product.stock) {
        toast.warning(`Stok tidak mencukupi. Maksimal ${product.stock} item.`);
        // Cap at max stock
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === product.id ? { ...item, quantity: product.stock } : item
          )
        );
      } else {
        toast.success("Berhasil menambahkan ke keranjang");
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      }
    } else {
      if (quantity > product.stock) {
        toast.warning(`Stok tidak mencukupi. Maksimal ${product.stock} item.`);
        setCartItems((prev) => [
          ...prev,
          { ...product, quantity: product.stock, selected: true },
        ]);
      } else {
        toast.success("Berhasil menambahkan ke keranjang");
        setCartItems((prev) => [
          ...prev,
          { ...product, quantity, selected: true },
        ]);
      }
    }
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item dihapus dari keranjang");
  }, []);

  const updateQuantity = useCallback((id: number, delta: number) => {
    const currentItems = cartItemsRef.current;
    const item = currentItems.find((i) => i.id === id);

    if (!item) return;

    const newQuantity = item.quantity + delta;

    // Check lower bound
    if (newQuantity < 1) return;

    // Check upper bound (stock)
    if (newQuantity > item.stock) {
      toast.warning(`Stok maksimal ${item.stock} item`);
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: item.stock } : i))
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );
  }, []);

  const toggleSelectItem = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    setCartItems((prev) => {
      const allSelected = prev.every((item) => item.selected);
      return prev.map((item) => ({ ...item, selected: !allSelected }));
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const selectedItemsCount = useMemo(() => {
    return cartItems.filter((item) => item.selected).length;
  }, [cartItems]);

  const isAllSelected = useMemo(() => {
    return cartItems.length > 0 && cartItems.every((item) => item.selected);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelectItem,
      toggleSelectAll,
      clearCart,
      totalPrice,
      selectedItemsCount,
      isAllSelected,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelectItem,
      toggleSelectAll,
      clearCart,
      totalPrice,
      selectedItemsCount,
      isAllSelected,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
