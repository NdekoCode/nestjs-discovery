export const getOnlyNoUndefinedObjectValue =<T> (data:T):Partial<T> =>{
    if(!data || JSON.stringify(data)==='{}'){
return null;
    }
    const dataValue = Object.values(data);
    const dataKeys =  Object.keys(data);
    let ourData:Partial<T>;
    dataKeys.forEach(k=>{
        if(dataValue[k]){
            ourData[k]= dataValue[k];
        }
    })
    return ourData
}