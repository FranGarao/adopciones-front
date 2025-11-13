'use client';

import React from 'react';
import { CASI_NEGRO } from '../../Constants/colors';

export default function Watermark() {
    return (
        <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
            <div className="pointer-events-auto">
                <p className="text-xs opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <span style={{ color: CASI_NEGRO + '80' }}>Made with </span>
                    <span className="text-red-500">♥</span>
                    <span style={{ color: CASI_NEGRO + '80' }}> by </span>
                    <a
                        href="https://frangarao.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline transition-all duration-200"
                        style={{
                            color: CASI_NEGRO,
                            textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = CASI_NEGRO;
                        }}
                    >
                        Jagg3rSec
                    </a>
                </p>
            </div>
        </div>
    );
}
