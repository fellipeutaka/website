import { Input as InputPrimitive } from "react-aria-components";
import { cva } from "~/lib/cva";

export const InputStyles = cva({
  base: [
    "w-full min-w-0 select-none bg-transparent px-2.5 py-2 text-fg placeholder-muted-fg outline-hidden",
    "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden",
  ],
});

export function Input({
  className,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  return <InputPrimitive {...props} className={InputStyles({ className })} />;
}
