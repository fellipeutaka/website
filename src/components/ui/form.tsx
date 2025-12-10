"use client";

import {
  composeRenderProps,
  FieldError,
  type FieldErrorProps,
  Form as FormPrimitive,
  Group,
  type GroupProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cva } from "~/lib/cva";

export const FormStyles = {
  Field: cva({
    base: [
      "group flex h-10 items-center overflow-hidden rounded-lg border border-input bg-bg text-base transition",
      "lg:text-sm",
      "focus-within:border-ring/85 focus-within:ring-4 focus-within:ring-ring/20",
      "group-invalid:border-danger group-invalid:focus-within:border-danger group-invalid:focus-within:ring-4 group-invalid:focus-within:ring-danger/20",
      "disabled:bg-secondary disabled:opacity-50",

      "*:data-[slot=icon]:shrink-0",
      "*:data-[slot=prefix]:ml-2.5 *:data-[slot=prefix]:text-muted-fg [&>[data-slot=prefix]>button]:ml-[-7px] [&>[role=progressbar]]:mr-2.5",
      "*:data-[slot=suffix]:mr-2.5 *:data-[slot=suffix]:text-muted-fg [&>[data-slot=suffix]>button]:mr-[-7px]",
    ],
  }),
  Description: cva({
    base: ["text-pretty text-muted-fg text-sm sm:text-xs"],
  }),
  Error: cva({
    base: ["text-danger text-sm sm:text-xs forced-colors:text-[Mark]"],
  }),
};

export const FormRoot = FormPrimitive;

export function FormField({ className, ...props }: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className) =>
        FormStyles.Field({ className })
      )}
    />
  );
}

interface FormDescriptionProps extends Omit<TextProps, "slot"> {
  isWarning?: boolean;
}

export function FormDescription({
  className,
  isWarning,
  ...props
}: FormDescriptionProps) {
  return (
    <Text
      {...props}
      className={FormStyles.Description({
        className: isWarning ? "text-warning" : className,
      })}
      slot="description"
    />
  );
}

export function FormError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldError
      {...props}
      className={(values) =>
        FormStyles.Error({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
    />
  );
}

export const Form = {
  Root: FormRoot,
  Field: FormField,
  Description: FormDescription,
  Error: FormError,
};
