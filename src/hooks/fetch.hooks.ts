import {useEffect, useState} from "react";

export const useGetDoc = (uri: string) => {

    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uri) return
        fetch(uri)
            .then(data => data.text())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [uri])

    return {
        loading,
        data,
        error
    }
}