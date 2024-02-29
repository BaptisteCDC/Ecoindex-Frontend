export function SavetoLocalStorage(IDrequest: any, date_request: string, urlAnalysed: string) {
    localStorage.setItem('IDREQUEST', IDrequest);
    localStorage.setItem('IDREQUESTTime', date_request);
    localStorage.setItem('URLAnalysed', urlAnalysed);
}

export function GetfromLocalStorage() : ecoIndexRequest {
    const id_request = localStorage.getItem('IDREQUEST');
    const date_request = localStorage.getItem('IDREQUESTTime');
    const url_analysed =localStorage.getItem('URLAnalysed');
    return {id_request, date_request, url_analysed};
}

export interface ecoIndexRequest {
        id_request: string | null;
        date_request: string | null;
        url_analysed: string | null;
}