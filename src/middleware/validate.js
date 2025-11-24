export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map(i => ({
        path: i.path.join('.'),
        message: i.message
      }));
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    // replace body with parsed data
    req.body = result.data;
    next();
  };
}
