let developing = false;
if (process.env.NODE_ENV === "development") {
    developing = true;
}
const isLocal = window.location.href.includes("localhost");
const serviceBaseUrl = developing || isLocal ? "https://anisoft.us/mailapp/api/" : "https://anisoft.us/mailapp/api/";
export interface ISettings {
    baseUrl: string;
    domain: string;
    applicationName: string;
    userToken: string;
}
export const settings: ISettings = {
    baseUrl: serviceBaseUrl,
    domain: "aniworks.live",
    applicationName: "",
    userToken: "userToken"
};