declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classnames: IClassNames;
    export = classnames;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module "*.png";
