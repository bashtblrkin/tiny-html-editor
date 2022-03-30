import {useMemo} from "react";

export const useSearchedType = (str: string) => {

    const checkIsSearch = useMemo(() => {
        return str.startsWith('s_')
    }, [str])

    const convertTypeIfSearched = useMemo(() => {
        return str.startsWith('s_') ? str.slice(2) : str
    }, [str])

    return [checkIsSearch, convertTypeIfSearched]
}