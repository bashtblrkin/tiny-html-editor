export interface ListItems {
    [key: string]: string | ListItems
}

export type DocStatus = 'notDoc' | 'loading' | 'treatment' | 'exist' |'ok'

export interface RequirementItem {
    id: string
    name: string
}