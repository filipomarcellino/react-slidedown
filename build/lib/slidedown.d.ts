import React from 'react';
interface SlideDownProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    closed?: boolean;
    transitionOnAppear?: boolean;
}
export declare const SlideDown: React.ForwardRefExoticComponent<SlideDownProps & React.RefAttributes<HTMLDivElement>>;
export default SlideDown;
