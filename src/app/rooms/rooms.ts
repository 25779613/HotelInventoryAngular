export interface Room {
    totalRooms?: number;
    availableRooms: number;
    bookedRooms?: number;

}

export interface roomsList {
    roomNumber: string;
    roomType: string;
    amenities: string;
    price: number;
    image: string;
    checkinTime: Date;
    checkoutTime: Date;
    rating: number;
}