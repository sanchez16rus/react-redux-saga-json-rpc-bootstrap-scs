/*Local storage api for session ID */
const LocalStorageApi = {
    
    key: 'spn24ru_sessionId',

    updateStorage(value)
    {
        localStorage.setItem(this.key, JSON.stringify(value));
    },
    
    getStorage()
    {
        let storageValue = localStorage.getItem(this.key);
        if(storageValue)
        {
            return JSON.parse(storageValue);    
        }
        
        return '';
    }
  }
  
  export default LocalStorageApi