declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "@/depth-gallery/Experience/Engine" {
  export class Engine {
    scroll: {
      setActive: (isActive: boolean) => void;
    };
    constructor(canvas: HTMLCanvasElement, container: HTMLElement);
    init(): Promise<void>;
    dispose(): void;
  }
}
