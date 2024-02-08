import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserProps } from '../types';

interface UserState {
    user: UserProps | undefined
    jwt: string | undefined
    setUser: (user: UserProps, jwt: string) => void
    removeUser: () => void,
}

export const useUser = create(
    persist<UserState>((set, get) => ({
        program: [],
        user: undefined,
        jwt: undefined,
        setUser: (user, jwt) => {
            set((state) => ({
                ...state,
                user: user,
                jwt
            }))
        },
        removeUser: () => {
            set((state) => ({
                ...state,
                user: undefined,
                jwt: undefined
            }))
        },
    }), {
        name: "user",
        storage: createJSONStorage(() => localStorage)
    })
)