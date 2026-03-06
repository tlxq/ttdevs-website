import { forwardRef, useId } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  /** Extra classes for the wrapper div */
  wrapperClassName?: string;
}

type InputFieldProps = BaseFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;

type TextareaFieldProps = BaseFieldProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
    as: "textarea";
    rows?: number;
  };

type InputProps = InputFieldProps | ({ as: "textarea" } & TextareaFieldProps);

/**
 * Reusable labeled form field — renders `<input>` or `<textarea>`.
 * Pass `as="textarea"` for multi-line input.
 * Shows an inline error message when `error` is provided.
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, error, wrapperClassName = "", ...rest }, ref) => {
  const id = useId();
  const errorId = `${id}-error`;
  const isTextarea = "as" in rest && rest.as === "textarea";

  const fieldProps = {
    id,
    "aria-describedby": error ? errorId : undefined,
    "aria-invalid": error ? ("true" as const) : undefined,
    className: `tt-input${error ? " border-tt-error focus:ring-tt-error" : ""}`,
  };

  return (
    <div className={wrapperClassName || undefined}>
      <label htmlFor={id} className="tt-modal-label">
        {label}
      </label>

      {isTextarea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={(rest as TextareaFieldProps).rows ?? 4}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...fieldProps}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          {...fieldProps}
        />
      )}

      {error && (
        <p id={errorId} className="tt-form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
