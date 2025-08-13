import { baseApi } from "@/app/baseApi"

// объявляем API без реализации
let _securityApi: any;

export const getSecurityApi = () => {
    if (!_securityApi) {
        _securityApi = baseApi.injectEndpoints({
            endpoints: (build) => ({
                getCaptchaUrl: build.query<{ url: string }, void>({
                    query: () => 'security/get-captcha-url',
                }),
            }),
        });
    }
    return _securityApi;
};

export const { useGetCaptchaUrlQuery } = getSecurityApi();


