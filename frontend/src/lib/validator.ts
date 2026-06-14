import { ZodType, ZodError } from 'zod';
import { toast } from 'react-hot-toast';

export function zodValidator<T>(
  schema: ZodType<T>,
  data: unknown,
): { valid: boolean; errors?: Record<string, string> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const zodError = result.error as ZodError<T>;
    const errors: Record<string, string> = {};

    zodError.issues.forEach((err) => {
      const path = err.path.join('.');
      errors[path] = err.message;
    });

    const formatted = Object.values(errors)
      .map((msg, i) => `${i + 1}. ${msg}`)
      .join('\n');
    toast.error(formatted, { id: 'zod-error' });

    return { valid: false, errors };
  }

  return { valid: true };
}
