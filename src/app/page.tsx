"use client"
import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/checkoutForm"
import { loadStripe } from "@stripe/stripe-js"

export default function Payment() {
    const [key, setkey] = useState("")
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        fetch("/api/config").then(async (r) => {
            const { publishableKey } = await r.json()

            setkey(publishableKey)
        })
    }, [])

    useEffect(() => {
        fetch("/api/payment", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (r) => {
            const { clientSecret } = await r.json()

            setClientSecret(clientSecret)
        })
    }, [])
    const stripePromise = loadStripe(key)
    return (
        <>
            <h1>hello world</h1>
            {stripePromise !== null && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    )
}
