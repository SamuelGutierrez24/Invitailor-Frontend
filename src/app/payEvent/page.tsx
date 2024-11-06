'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useEventById } from '@/hooks/useEventById';
import { useRegisterForEvent } from '@/hooks/useRegisterForEvent';
import { Event } from '@/interfaces/event';
import './payEvent.css';

export default function PayEventPage() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [eventId, setEventId] = useState("");
    const [event, setEvent] = useState<Event | null>(null);
    const router = useRouter();
    const { fetchEvent } = useEventById();
    const { register } = useRegisterForEvent();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const eventIdParam = searchParams.get('id');
        if (eventIdParam) {
            setEventId(eventIdParam);
        }
    }, []);

    useEffect(() => { 
        if (eventId) { 
            const getEvent = async () => { 
                const fetchedEvent = await fetchEvent(eventId);
                setEvent(fetchedEvent); 
            };
            getEvent(); 
        } 
    }, [eventId, fetchEvent]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register(eventId);
        if (success) {
            console.log('Ticket registered successfully');
            alert('ticket registered Successfully!');
            router.push('/home');
        } else {
            console.log('Failed to register ticket');
            alert('Failed to register ticket');
        }

    };

    const handleLogout = () => {
        router.push('/');
    }

    return (
        <div className="pay-event-page-container">
            <aside className="sidebar">
                <div className="logo">InviTailor</div>
                <div className="menu">
                    <button className="menu-item" onClick={() => router.push('/tickets')}>
                        <span className="icon">🎟️</span> My Tickets
                    </button>
                    <button className="menu-item" onClick={() => router.push('/home')}>
                        <span className="icon">📅</span> Events / Home
                    </button>
                    <button className="logout-button" onClick={handleLogout}>
                    <span className="icon">🚪</span> Log Out
                </button>
                </div>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Payment Information</h1>
                </header>
                <div className="payment-container">
                    {event && (
                        <div className="event-info">
                            <h2>{event.name}</h2>
                            <p><strong>Price:</strong> ${event.price}</p>
                        </div>
                    )}
                    <form onSubmit={handlePayment} className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                placeholder="XXXX XXXX XXXX XXXX"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                                placeholder="CVV"
                            />
                        </div>
                        <button type="submit" className="submit-button">Pay Now</button>
                    </form>
                </div>
            </main>
        </div>
    );
}
