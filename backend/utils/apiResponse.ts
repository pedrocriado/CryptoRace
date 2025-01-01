const createApiResponse = (success:boolean, 
                           type:string | null = null, 
                           msg:string | null = null, 
                           data:any = null) => {
    
    let message = null; 
    if (msg) {
        const message = { type, msg };
    } 

    const response = { success, data, message };
    
    
    return response;
        
};
    
export default createApiResponse;