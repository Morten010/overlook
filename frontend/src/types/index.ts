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