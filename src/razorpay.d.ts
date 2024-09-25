// razorpay.d.ts
interface Window {
    Razorpay: any;
}

declare module 'razorpay' {
    interface RazorpayOptions {
        key: string;
        amount: string;
        currency: string;
        name: string;
        description: string;
        image: string;
        order_id: string;
        handler: (response: any) => void;
        prefill: {
            name: string;
            email: string;
            contact: string;
        };
        notes: {
            address: string;
        };
        theme: {
            color: string;
        };
    }

    interface Razorpay {
        new (options: RazorpayOptions): Razorpay;
        open(): void;
    }
}
