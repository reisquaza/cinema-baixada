export interface CityDTO {
    name: string;
    theaters: CityTheater[];
}

export interface City extends CityDTO {
    id: string;
}

export interface CityTheater {
    id: string;
    name: string;
}
