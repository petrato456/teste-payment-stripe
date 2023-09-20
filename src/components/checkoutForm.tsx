import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { FormEvent, useState } from "react"

export default function CheckoutForm() {
    const [isProcessing, setIsProcessing] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/opan`,
            },
        })

        if (error) {
            console.log("erro")
        }
        setIsProcessing(false)
    }
    return (
        <form
            id="payment-form"
            onSubmit={handleSubmit}
            style={{ width: "400px" }}
        >
            <PaymentElement />
            <button id="submit">
                {isProcessing ? "Processando" : "pay now"}
            </button>
        </form>
    )
}
