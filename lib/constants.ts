export const ROUTES={

    // public accessible to everyone

    PUBLIC:["/"],

    // Routes only for non -logged in users
    AUTH:["/login","/register","/auth/callback"],
 
    // Routes that require login (any role)
    PROCTECTED:["/events","/profile"],

    // Routes specific to roles
    ADMIN:["/admin"],
    COORDINATOR:["/coordinator"],


}as const;