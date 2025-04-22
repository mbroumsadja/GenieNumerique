export const set_cookie = (res,data,nom)=>{

   res.cookie(`${nom}`, data, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
}