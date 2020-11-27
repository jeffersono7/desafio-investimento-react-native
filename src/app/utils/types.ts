export type Consumer<Param> = (p: P) => void;
export type BiConsumer<Param1, Param2> = (p1: Param1, p2: Param2) => void;
export type Runnable = () => void;
export type Function<Param, Return> = (p: Param) => Return;

// Impl
export const RunnableImpl: Runnable = () => { };
