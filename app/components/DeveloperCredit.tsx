"use client";

import { useEffect, useRef } from 'react';

const DeveloperCredit = () => {
    const loggedRef = useRef(false);

    useEffect(() => {
        if (loggedRef.current) return;

        console.log(
            "%c Developed by %c https://harshsutariya.dev ",
            "background: #000; color: #fff; padding: 5px; border-radius: 4px 0 0 4px; font-weight: bold;",
            "background: #000; color: #fff; padding: 5px; border-radius: 0 4px 4px 0; font-weight: bold;"
        );

        loggedRef.current = true;
    }, []);

    return null; // This component renders nothing
};

export default DeveloperCredit;
