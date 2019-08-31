import React, { useCallback, useRef } from 'react';
import './CircularRevealPanel.css';

export type EventType = 'CURTAIN_OPENING' | 'CURTAIN_OPENED' | 'CURTAIN_CLOSING' | 'CURTAIN_CLOSED';

export type RevealSpeed = 'very slow' | 'slow' | 'normal' | 'fast';

export class CurtainEvent {
    constructor(public type: EventType,
                public curtainElemRef: HTMLDivElement,
                public revealContentElemRef: HTMLDivElement) {
    }
}

export type CalculateCurtainSize = (currentCurtainSize: number, opening: boolean) => number;

interface Props {
    reveal?: boolean,
    contentMinWidth?: number,
    children?: React.ReactNode,
    revealContent?: React.ReactNode,
    revealCurtainContent?: React.ReactNode,
    speed?: RevealSpeed | CalculateCurtainSize,
    onChange?: (e: CurtainEvent) => void
}

export const CircularRevealPanel: React.FC<Props> = (
    {
        reveal,
        children,
        contentMinWidth,
        revealContent,
        revealCurtainContent,
        speed,
        onChange
    }) => {
    const mousePositionRef = useRef({x: 0, y: 0});
    const forward = useRef(false);
    const animating = useRef(reveal);
    const opened = useRef(reveal);
    const revealCurtainRef = useRef<HTMLDivElement>(null);
    const revealOverlayRef = useRef<HTMLDivElement>(null);
    const revealContentRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
        if (revealOverlayRef.current && !animating.current) {
            mousePositionRef.current.x = e.clientX - revealOverlayRef.current.getBoundingClientRect().left;
            mousePositionRef.current.y = e.clientY - revealOverlayRef.current.getBoundingClientRect().top;
        }
    }, [animating]);

    const globalID = useRef(-1);
    const sizeRef = useRef(1);

    let resizeCurtainFunction: CalculateCurtainSize;
    if (typeof speed === 'function') {
        resizeCurtainFunction = speed;

    } else {
        switch (speed) {
            case 'very slow':
                resizeCurtainFunction = (size, opening) => {
                    return opening ? size + Math.max(size/15, 1) : size - Math.max(size/15, 1);
                };
                break;

            case 'slow':
                resizeCurtainFunction = (size, opening) => {
                    return opening ? size + Math.max(size/6, 2) : size - Math.max(size/6, 2);
                };
                break;

            case 'normal':
                resizeCurtainFunction = (size, opening) => {
                    return opening ? size + Math.max(size/3, 5) : size - Math.max(size/3, 5);
                };
                break;

            case 'fast':
                resizeCurtainFunction = (size, opening) => {
                    return opening ? size + Math.max(size/3, 20) : size - Math.max(size/3, 20);
                };
                break;

            default:
                throw new Error('react-circular-reveal: Invalid speed value.');
        }
    }

    const animateCurtain = () => {
        if (revealCurtainRef.current && revealOverlayRef.current && revealContentRef.current) {
            const size = sizeRef.current;
            const mousePos = mousePositionRef.current;
            const curtainStyle = revealCurtainRef.current.style;
            const revealCurtainStyle = revealContentRef.current.style;
            const overlayRect = revealOverlayRef.current.getBoundingClientRect();
            const overlayWidth = overlayRect.width;
            const maxCircularSize = Math.max(overlayRect.height, overlayRect.width) * 2.5;

            curtainStyle.width = size + 'px';
            curtainStyle.height = size + 'px';
            curtainStyle.left = mousePos.x - size / 2 + 'px';
            curtainStyle.top = mousePos.y - size / 2 + 'px';

            revealCurtainStyle.minWidth = Math.min(overlayWidth, contentMinWidth as number) + 'px';
            revealCurtainStyle.width = overlayWidth + 'px';
            revealCurtainStyle.top = size / 2 - mousePos.y + 'px';
            revealCurtainStyle.left = size / 2 - mousePos.x  + 'px';

            if ((forward.current && size < maxCircularSize) || (!forward.current && size > 0)) {
                sizeRef.current = resizeCurtainFunction(size, forward.current);
                globalID.current = requestAnimationFrame(animateCurtain);

            } else {
                animating.current = false;

                // at the end of closing, we make sure the curtain has 0 dimensions so that it does not interfere with
                // anything else until reopened.
                if (!forward.current) {
                    curtainStyle.width = '0px';
                    curtainStyle.height = '0px';
                }

                if (onChange) {
                    onChange(new CurtainEvent(forward.current ? 'CURTAIN_OPENED' : 'CURTAIN_CLOSED',
                        revealCurtainRef.current, revealContentRef.current));
                }
            }
        }
    }

    const doReveal = () => {
        animating.current = true;
        opened.current = !opened.current;
        if (onChange) {
            onChange(new CurtainEvent(
                !forward.current ? 'CURTAIN_OPENING' : 'CURTAIN_CLOSING',
                revealCurtainRef.current as HTMLDivElement,
                revealContentRef.current as HTMLDivElement
            ));
        }
        if (globalID.current !== -1) {
            cancelAnimationFrame(globalID.current);
            globalID.current = -1;
        }
        forward.current = !forward.current;
        animateCurtain();
    }

    if (reveal !== opened.current && !animating.current) {
        doReveal();
    }

    return <div ref={revealOverlayRef}
                className='circular-reveal__overlay'
                onMouseMove={onMouseMove}>
        {children}
        <div ref={revealCurtainRef}
             className='circular-reveal__revealCurtain'>
            <div ref={revealContentRef}
                 className='circular-reveal__revealContent'>
                {revealContent}
            </div>
            {revealCurtainContent}
        </div>
    </div>;
};

CircularRevealPanel.defaultProps = {
    contentMinWidth: 500,
    reveal: false,
    speed: 'normal'
};
