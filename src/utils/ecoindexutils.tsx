export function getEcodindexUrlToPostNewTask() {
    return 'https://ecoindex.p.rapidapi.com/v1/tasks/ecoindexes/';
}

export function BuildBody(urlToAnalyse: string) : BodyInit {
    return JSON.stringify(
        {
        height: 50,
        url: urlToAnalyse,
        width: 100
        }
    );
}

export function buildHeader(isPostRequest : boolean) : HeadersInit{
if(isPostRequest){
    return {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '0d21212e4amsh55a939548fce52fp1814fajsneaa91393bd37',
    'X-RapidAPI-Host': 'ecoindex.p.rapidapi.com' }
}

    return{
        'X-RapidAPI-Key': '0d21212e4amsh55a939548fce52fp1814fajsneaa91393bd37',
        'X-RapidAPI-Host': 'ecoindex.p.rapidapi.com' 
    }

}

export function PostToEcoindexApi(url: string,  urlToAnalyse: string) {
    return fetch(url,{
        method: "POST",
        headers: buildHeader(true),
        body: BuildBody(urlToAnalyse)
        });
}

export function GetFromEcoindexApi(url: string, header?: any) {
    return fetch(url,{
        method: "Get",
        headers: buildHeader(false)});
    }