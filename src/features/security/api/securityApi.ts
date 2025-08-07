import { baseApi } from "@/app/baseApi"

// 1. Сначала объявляем API без реализации
let _securityApi: any;

// 2. Создаем функцию для доступа к API
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

// 3. Экспортируем хуки
export const { useGetCaptchaUrlQuery } = getSecurityApi();





// import { baseApi } from "@/app/baseApi"


// export const securityApi = baseApi.injectEndpoints({
//     endpoints: build => ({
//         getCaptchaUrl: build.query< { url: string } , void>({
//             query: () => 'security/get-captcha-url',
//         }),
//     }),
// })

// export const { useGetCaptchaUrlQuery } = securityApi