export type ImageProps = {
    id: number
    title: string
    filename: string
}

export type NewsProps = {
    id: number
    title: string
    teaser: string
    image: { 
        filename: string
    }
}

export type RoomProps = {
    room_id: number
    title: string
    description: string
    num_persons: number
    area: string
    day_price_normal: number
    day_price_flex: number
    room_facilities: any[] 
    images: {
      filename: string
    }[]
}

export type CountriesProps = {
    id: number
    slug: string
    name: string
    description: string
    CountryImage: {
        country_image_filename: string
        country_image_title: string
    }
}

export type CountryProps = {
    country_id: number
    slug: string
    name: string
    description: string
    CountryImage: {
      country_image_filename: string
      country_image_title: string
    },
    cities: {
        city_id: number
        slug: string
        name: string
        image_id: number
        CityImage: {
          city_image_filename: string
          city_image_title: string
        }
      }[]
}

export type CityProps = {
    country_id: number
    slug: string
    name: string
    description: string
    CountryImage: {
      country_image_filename: string
      country_image_title: string
    },
    cities: {
        city_id: number
        slug: string
        name: string
        description: string
        CityImage: {
          city_image_filename: string
          city_image_title: string
        },
        hotels: {
            hotel_id: number
            slug: string
            title: string
            HotelImage: {
              hotel_image_filename: string
              hotel_image_title: string
            }
        }[]
    }[]
}

export type HotelProps = {
    country_id: number
    slug: string
    name: string
    description: string
    CountryImage: {
      country_image_filename: string
      country_image_title: string
    },
    cities: {
        city_id: number
        slug: string
        name: string
        description: string
        CityImage: {
          city_image_filename: string
          city_image_title: string
        },
        hotels: HotelProp[]
    }[]
}

export type HotelProp = {
  hotel_id: number
  slug: string
  title: string
  description: string
  address: string
  phone: string
  HotelImage: {
    hotel_image_filename: string
    hotel_image_title: string
  }
  hotel_facilities: {
      title: string,
      hotel_facility_rel: {
        id: number,
        hotel_id: number,
        hotel_facility_id:number,
        hotelId: number,
        hotelFacilityId:number
      }
  }[],
  rooms: {
      room_id: number,
      title: string,
      description: string
      num_persons: number,
      area: string,
      day_price_normal: number,
      day_price_flex: number,
      hotel_room_rel: {
        id: number,
        hotel_id: number,
        room_id: number,
        num_rooms: number,
        hotelId: number,
        roomId: number
      }
      images: {
        filename: string
        title: string
        room_image_rel: {
          id: number
          room_id: number
          image_id: number
          order_num: number
          roomId: number
          imageId: number
      }
    }[]
  }[]
}

export type UserProps = {
  "firstname": string
  "userId": string
  "lastname": string
  "email": string
}
