import {memo, useEffect, useState} from "react";

export const useFetch = <T>(uri: string, callbackResponse: (resp: Response) => Promise<any>) => {

    const [data, setData] = useState<T>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uri) return
        fetch(uri)
            .then(callbackResponse)
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [callbackResponse, uri])

    return {
        loading,
        data,
        error,
        setData
    }
}