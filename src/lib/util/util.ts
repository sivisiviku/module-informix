export default class Utility {
    public async generateId(): Promise<string> {
        let uuid = "";
        for(let i = 0; i < 5 ; i++) {
            let result = "";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const charactersLength = characters.length;
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            uuid = uuid + ((Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)*16)%16).toString() + result;
            console.log("uuid ", uuid);
        }
        return uuid;
    }
}
