import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = () => {
    const overlayRef = useRef(null);
    const location = useLocation();

    useLayoutEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.set(overlay, {
                yPercent: 100,
                autoAlpha: 1,
            })
                .to(overlay, {
                    yPercent: 0,
                    duration: 0.45,
                    ease: "power4.inOut",
                })
                .to(overlay, {
                    yPercent: -100,
                    duration: 0.6,
                    ease: "power4.inOut",
                    delay: 0.1,
                })
                .set(overlay, {
                    autoAlpha: 0,
                });
        });

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-orange-500 pointer-events-none invisible"
            aria-hidden="true"
        />
    );
};

export default PageTransition;