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
}

export type CountryProps = {
    id: number
    slug: string
    name: string
    description: string
    CountryImage: {
        country_image_filename: string
        country_image_title: string
    }
}