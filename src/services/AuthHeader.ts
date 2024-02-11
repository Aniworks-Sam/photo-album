const userTkn = localStorage.getItem("userToken")!
export let IstokenPresent: number;
export let authHeader: HeadersInit;
export let uploadCoresHeader: HeadersInit;   // for upload cores

if (userTkn !== undefined && userTkn !== null && userTkn !== "") {
    IstokenPresent = 1
    authHeader = { "X-Access-Token": userTkn }
    uploadCoresHeader = { "X-Access-Token": userTkn, 'Content-type': 'application/json; charset=UTF-8' }
} else {
    IstokenPresent = 0
    authHeader = {}
}