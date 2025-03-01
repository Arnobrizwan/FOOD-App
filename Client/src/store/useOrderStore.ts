//@ts-nocheck


import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { API_END_POINT as baseURL } from "../lib/config";

// const API_END_POINT: string = "http://localhost:3000/api/v1/order";
const API_END_POINT = baseURL + "/api/v1/order";

//axios.defaults.withCredentials = false;

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.href = response.data.session.url;
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`);

            set({ loading: false, orders: response.data.orders });
        } catch (error) {
            set({ loading: false });
        }
    },
    getOrdersForDeliveryMan: async () => {
        try {
            set({ loading: true });
            const userId = JSON.parse(localStorage.getItem('user-name') || '{}').state?.user?._id;

            console.log(userId);
            if (!userId) {
                set({ loading: false });
                return;
            }
            const response = await axios.get(`${API_END_POINT}/getOrdersForDeliveryMan`, {
                params: {
                    userId: userId
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            set({ loading: false, orders: response.data.orders });
        } catch (error) {
            set({ loading: false });
        }
    }
})), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))