import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      res.status(400).json({
        message: firstError.message,
        errors: result.error.issues,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

export default validate;
