/**
 * Footer Component
 * Dark footer with menu sections and subscription
 */

'use client';

import React, {useState} from 'react';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        // Handle subscription
        console.log('Subscribe:', email);
    };

    return (
        <footer className="food-footer">
            <div className="food-footer-content">
                <div className="food-footer-divider"></div>

                <div className="food-footer-main">
                    {/* Menu Sections */}
                    <div className="food-footer-menu">
                        <div className="food-footer-column">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#about">About us</a></li>
                                <li><a href="#team">Team</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#blog">Blog</a></li>
                            </ul>
                        </div>

                        <div className="food-footer-column">
                            <h3>Contact</h3>
                            <ul>
                                <li><a href="#help">Help & Support</a></li>
                                <li><a href="#partner">Partner with us</a></li>
                                <li><a href="#ride">Ride with us</a></li>
                            </ul>
                        </div>

                        <div className="food-footer-column">
                            <h3>Legal</h3>
                            <ul>
                                <li><a href="#terms">Terms & Conditions</a></li>
                                <li><a href="#refund">Refund & Cancellation</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#cookie">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="food-footer-subscribe">
                        <div className="food-footer-social">
                            <h4>FOLLOW US</h4>
                            <div className="food-footer-icons">
                                <a href="#instagram" aria-label="Instagram">📷</a>
                                <a href="#facebook" aria-label="Facebook">📘</a>
                                <a href="#twitter" aria-label="Twitter">🐦</a>
                            </div>
                        </div>

                        <div className="food-footer-newsletter">
                            <p>Receive exclusive offers in your mailbox</p>
                            <div className="food-footer-input-group">
                                <div className="food-footer-input">
                                    <span className="food-icon">✉️</span>
                                    <input
                                        type="email"
                                        placeholder="Enter Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                                    />
                                </div>
                                <button
                                    className="food-button food-button--primary food-button--subscribe"
                                    onClick={handleSubscribe}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="food-footer-bottom">
                    <div className="food-footer-divider"></div>
                    <div className="food-footer-copyright">
                        <div className="food-footer-left">
                            <span>All rights Reserved</span>
                            <span className="food-icon">©</span>
                            <strong>Your Company, {new Date().getFullYear()}</strong></div>
                        <div className="food-footer-right">
                            <span>Made with</span>
                            <span className="food-icon">💛</span>
                            <span>by</span>
                            <strong>Aziz0220</strong>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
