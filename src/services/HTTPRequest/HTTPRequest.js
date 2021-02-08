import axios from 'axios';

export default class HTTPRequest {
    protocol = 'http';
    // host = 'api.sweet.tv';
    // service = 'TvService/';
    host = 'frontend-candidate.dev.sdh.com.ua';
    service = 'v1/';
    // TvService
    format = 'json';


    constructor(props) {
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        // axios.defaults.headers.get['Content-Type'] = 'application/json';
        // axios.defaults.headers.get['Accept-Language'] = 'en';
        window.axios = axios;
    };

    _defineUrl = (method = '') => {
        return `${this?.protocol}://${this.host}/${this.service + method}`;
    };

    _stringifyData = (data) => {
        return JSON.stringify(data) || '';
    };

    parseResponse = async (res) => {
       // try {
            switch (res.status) {
                case 200:
                    if (!res.data) {
                        res.data = JSON.parse(res.response)
                    }
                    return res;
                default:
                    return;
            }
        // } catch (error) {
        //     console.error(`Error message: ${error.message}; Error name: ${error.name}; Stack: ${error.stack}`);
        // }
    };

    getData = async (method) => {
        return this.parseResponse(await axios.get(this._defineUrl(method), {
                crossDomain: true,
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        ));
    };

    deleteData = async (method) => {
        return this.parseResponse(await axios.delete(this._defineUrl(method), {
                crossDomain: true,
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        ));
    };

    putData = async (method) => {
        return this.parseResponse(await axios.put(this._defineUrl(method), {
                crossDomain: true,
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        ));
    };

    postData = async (method, data, url) => {
        return this.parseResponse(await axios.post(this._defineUrl(method), this._stringifyData(data)));
    };
};
