module App { 
export class UserOffer { 
	public id: number;
	public userId: string;
	public productId: string;
	public offer: number;
    public endTime: Date | null;
}
}