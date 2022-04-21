export interface ListItems {
    [key: string]: string | ListItems
}

export type DocStatus = 'NotDoc' | 'Loading' | 'Treatment' | 'Exist' | 'Busy' | 'SuccessFetch'

export interface RequirementItem {
    id: string
    name: string
    state: DocStatus
    checked?: boolean
}

//Для форм
export type ReqFormInputs = {
    nameRequirement: string
}