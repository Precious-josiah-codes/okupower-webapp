const { getCookie } = require("@/app/serverActions/cookieActions");

// handle authorization token
export async function handleRouteAuthorization() {
  const getTokenCookie = await getCookie("token");
  const { access, accounts } = JSON.parse(getTokenCookie.cookie.value);
  const headers = {
    Authorization: `Bearer ${access}`,
  };
  console.log(access, accounts);
  return { headers, accounts };
}
