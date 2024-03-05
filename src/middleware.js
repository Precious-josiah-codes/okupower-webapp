import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setCookie } from "./app/serverActions/cookieActions";

// TODO: Test for the expiration of access 30 days and refresh token 6 months
export async function middleware(req) {
  let token = await req.cookies.get("token");
  let companyProfile = await req.cookies.get("companyProfile");
  let hasBankDetails = await req.cookies.get("hasBankDetails");
  let hasBranch = await req.cookies.get("hasBranch");
  let hasBand = await req.cookies.get("hasBand");

  // if user is not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // else go to route
  if (token && companyProfile && hasBankDetails && hasBranch && hasBand)
    return NextResponse.next();

  console.log(token, companyProfile, hasBankDetails, hasBranch, hasBand, "who");

  // make request to check the user profile
  // if they created a companyProfile, hasBankDetails, hasBranch, hasBand, hasDevice
  if (token && !companyProfile && !hasBankDetails && !hasBranch && !hasBand) {
    try {
      console.log("check and set the profile of the user");

      // destructuring the token object
      const { access, accounts } = JSON.parse(token.value);

      // headers
      const headers = {
        Authorization: `Bearer ${access}`,
      };

      // checking the user account for full setup data
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/me/?account=${accounts[0]["id"]}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Parse JSON response if needed
        const { setup_info } = await response.json();
        const modifiedSetupInfo = {
          company_profile: setup_info.company_profile,
          bank_account: setup_info.bank_account,
          has_branch: setup_info.has_branch,
          has_band: setup_info.has_band,
        };
        console.log(modifiedSetupInfo);

        // check if user has setup all accounf info
        const allAccountSetup = Object.values(modifiedSetupInfo).every(
          (setup) => setup === true
        );
        console.log(allAccountSetup, "this is the res");

        if (allAccountSetup) {
          // // set the cookies
          // req.cookies.set();
          // req.cookies.set("hasBankDetails", true);
          // req.cookies.set("hasBranch", true);
          // req.cookies.set("hasBand", true);
          // req.cookies.set("hasDevice", true);
          console.log("where am i");

          // redirect to home
          return NextResponse.redirect(new URL("/", req.url));
        } else {
          // setup route object path
          const route = {
            company_profile: "/create/company_profile",
            bank_account: "/create/bank_details",
            has_branch: "/create/branch",
            has_band: "/create/band",
          };

          let redirectRoute;

          // redirect to route, the user hasnt setup
          for (const i in modifiedSetupInfo) {
            console.log("hello", modifiedSetupInfo[i]);
            if (modifiedSetupInfo[i] === false) {
              redirectRoute = route[i];
              console.log(modifiedSetupInfo[i], i, "man");
              break;
            }
          }
          console.log(redirectRoute, "the route");
          return NextResponse.redirect(new URL(redirectRoute, req.url));
        }
      }
    } catch (error) {
      console.error("Error => ", error);
      // TODO: try redirecting the user back to the dashboard on the dashboard page
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/", "/create_band"],
};
