export const DataEditor = (date: string | undefined): string => {
    console.log('...editing')
    if(!date){
        return ""
    }
        return date.split('T')[0]
}