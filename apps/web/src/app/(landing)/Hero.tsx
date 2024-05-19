'use client';

import { ComponentProps, useCallback, useState } from 'react';
import { createSubscription } from './createSubscription';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { Button } from '@bitspace/ui/button';
import { cn } from '@bitspace/ui/cn';

const isEmail = (email: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const Hero = () => {
    const [email, setEmail] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleSignUp = useCallback(async () => {
        if (isEmail(email)) {
            await createSubscription(email)
                .then(() => setSuccess(true))
                .catch(() => setError('An error occured. Please try again.'));
        }
    }, [setSuccess, setError, email]);

    const handleKeyDown = useCallback(
        async (e: React.KeyboardEvent<HTMLInputElement>) => {
            e.stopPropagation();

            if (e.key === 'Enter') {
                handleSignUp();
            }
        },
        [handleSignUp]
    );

    return (
        <div className="flex flex-col items-center max-w-4xl w-full gap-y-16">
            <h1 className="text-5xl md:text-7xl text-center md:text-balance leading-normal md:leading-snug tracking-tight">
                A creative environment for the 21st century
            </h1>
            {showInput ? (
                success || error ? (
                    <span className="text-center">
                        {error ? error : 'Thank you for joining the waitlist!'}
                    </span>
                ) : (
                    <div className="flex flex-row relative gap-x-4">
                        <Input
                            className="shadow-2xl w-64"
                            placeholder="Email"
                            autoFocus
                            onKeyDown={handleKeyDown}
                            onChange={e => setEmail(e.currentTarget.value)}
                            value={email}
                        />
                        <Button
                            className="h-12 w-12"
                            onClick={handleSignUp}
                            disabled={!isEmail(email)}
                        >
                            <ArrowForwardOutlined fontSize="inherit" />
                        </Button>
                    </div>
                )
            ) : (
                <Button onClick={() => setShowInput(true)}>
                    Join the Waitlist
                </Button>
            )}
        </div>
    );
};

const Input = ({ className, ...props }: ComponentProps<'input'>) => {
    return (
        <input
            className={cn(
                'bg-white rounded-full px-6 pr-12 py-3 focus-visible:outline-none',
                className
            )}
            onKeyDown={e => {
                e.stopPropagation();
            }}
            {...props}
        />
    );
};