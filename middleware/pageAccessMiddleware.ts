import { NextFunction, Request, Response } from 'express'

// Extend the Express Request interface
declare module 'express' {
  interface Request {
    user?: {
      userType?: string
    }
  }
}

// Middleware to check user roles
export function roleMiddleware(requiredRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.userType

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role found' })
    }

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' })
    }

    next()
  }
}

// Middleware to check user types
export function userTypeMiddleware(requiredUserTypes: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = req.user?.userType

    if (!userType) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user type found' })
    }

    if (!requiredUserTypes.includes(userType)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient user type' })
    }

    next()
  }
}

// Middleware to check specific user types
export function specificUserTypeMiddleware(requiredUserType: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userType = req.user?.userType

    if (!userType) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user type found' })
    }

    if (userType !== requiredUserType) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Insufficient user type' })
    }

    next()
  }
}

// Usage example:
// app.use('/admin', roleMiddleware(['admin', 'superAdmin']));
// app.use('/seller', roleMiddleware(['seller']));
// app.use('/admin', userTypeMiddleware(['admin', 'superAdmin']));
// app.use('/seller', userTypeMiddleware(['seller']));
// app.use('/admin', specificUserTypeMiddleware('admin'));
// app.use('/seller', specificUserTypeMiddleware('seller'));
