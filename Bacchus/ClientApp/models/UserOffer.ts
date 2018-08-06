module App { 
    export class UserOffer { 
    public Id: number;
	public userId: string;
	public productId: string;
    public offer: number;
    public endTime: Date | null;
}
}