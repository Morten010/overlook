import axios, { AxiosError } from 'axios'
import React, { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from 'react-query'
import { useUser } from '../../store/useUser'
import Container from '../../components/Container'

type Inputs = {
    username: string,
    password: string
}

export type ResponseType = {
    access_token: string
    user: { 
        id: string 
        firstname: string 
        lastname: string
        email: string
    },
    created: string
}

interface LoginProps {
  
}

const Login: FC<LoginProps> = ({}) => {
    const {setUser, user} = useUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const {mutate: Login, isLoading} = useMutation({
        mutationFn: async (user: {
            username: string
            password: string
        }) => {
            const { data } = await axios.post("http://localhost:4000/login", user)
            
            return {
                ...data,
                user: {
                    ...data.user,
                    email: user.username,
                }
            }
        },
        onError: (err: AxiosError) => {
            console.log(err);
        },
        onSuccess: (data: ResponseType) => {
            console.log(data);
            setUser({
                email: data.user.email,
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                userId: data.user.id,
            }, data.access_token)
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data); 
        Login(data)
    }

      
  return (
    <Container>
        <h1
        className='text-2xl font-bold mb-4'
        >
            Login
        </h1>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3'
        >
            <input 
            className={`px-3 py-2 ${errors.username ? "border-red-600 border box-border focus:outline-red-600" : ""}`}
            placeholder='Brugernavn'
            {...register("username", {
                required: {
                    message: "Brugernavn mangler",
                    value: true
                }
            })}
            />
            {errors.username && (
                <p
                className='text-red-600'
                >
                    {errors.username.message}
                </p>
            )}

            <input 
            className={`px-3 py-2 ${errors.password ? "border-red-600 border box-border focus:outline-red-600" : ""}`}
            type='password'
            placeholder='Kodeord'
            {...register("password", {
                required: {
                    message: "Kodeord Mangler",
                    value: true
                }
            })}
            />
            {errors.password && (
                <p
                className='text-red-600'
                >
                    {errors.password.message}
                </p>
            )}
            
            <div
            className='flex gap-4'
            >
                <button
                className={`px-4 py-2 bg-red-500 text-white ${isLoading ? "bg-red-700/50" : ""}`}
                disabled={isLoading}
                type='submit'
                >
                    Login
                </button>
                <button
                className={`px-4 py-2 bg-red-500 text-white ${isLoading ? "bg-red-700/50" : ""}`}
                disabled={isLoading}
                >
                    Annuller
                </button>
            </div>
            
        </form>
    </Container>
  )
}

export default Login