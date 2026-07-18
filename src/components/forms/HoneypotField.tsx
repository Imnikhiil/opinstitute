import type { FieldValues, UseFormRegister } from "react-hook-form";
import { HONEYPOT_FIELD } from "@/lib/spam-guard";

/**
 * Invisible to humans; bots that auto-fill every input will trip it.
 * Do not use display:none — some bots skip those fields.
 */
export function HoneypotField({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <div
      className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor={HONEYPOT_FIELD}>Website</label>
      <input
        id={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register(HONEYPOT_FIELD)}
      />
    </div>
  );
}
